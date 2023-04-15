import {FieldValue, Firestore, QueryDocumentSnapshot} from "@google-cloud/firestore";
import * as functions from 'firebase-functions';
import MerkleTree from 'merkletreejs';
import {contractAbi} from "./contractAbi";

const cors = require("cors")({origin: true});
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require('crypto-js');
const Web3 = require('web3');

const chains = [
    {
        url: 'https://goerli.infura.io/v3',
        contractAddress: '0xe398ffdd137d6669cf2e11f1face721a9231e220',
        gasPrice: '8',
        gasLimit: 50000,

    },
    {
        url: 'https://l2rpc.hackathon.taiko.xyz',
        contractAddress: '0x1F8D95891766A39739AA656092BaE2C8EA589Bb0',
        gasPrice: '5',
        gasLimit: 50000,

    },

    {
        url: 'https://rpc.public.zkevm-test.net',
        contractAddress: '0x1F8D95891766A39739AA656092BaE2C8EA589Bb0',
        gasPrice: '5',
        gasLimit: 50000,

    },
    {
        url: 'https://alpha-rpc.scroll.io/l2',
        contractAddress: '0x1F8D95891766A39739AA656092BaE2C8EA589Bb0',
        gasPrice: '5',
        gasLimit: 50000,

    },
];

const calculateMerkleTree = async (firestore: Firestore): Promise<MerkleTree> => {
    const querySnapshot = await firestore.collection('Users').where("lockedCoins", "!=", []).get();
    const leaves = querySnapshot.docs.map((ds: QueryDocumentSnapshot<any>) => {
        const user = ds.data();
        return user.lockedCoins.map((coinLock: any) => SHA256(coinLock))
    }).flat();
    return new MerkleTree(leaves, SHA256);
};

export const users = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const {email} = request.query;
        const firestore = new Firestore();

        const userRef = await firestore.collection('Users').doc(email!.toString()).get();
        const tree = await calculateMerkleTree(firestore);

        const user = await userRef.data();
        user!.lockedCoins = user!.lockedCoins.map((coinLock: any) => {
            const hash = SHA256(coinLock);
            const proof = tree.getHexProof(hash);
            return {...coinLock, proof, hash: hash.toString(CryptoJS.enc.Hex)};
        });
        response.set("Access-Control-Allow-Origin", "*");
        response.send(user);
    });

});

export const lockCoins = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const {currency, amount, until, publicAddress, email} = request.body;
        const firestore = new Firestore();
        const userQuery = await firestore.collection('Users').doc(email!.toString()).get();
        await userQuery.ref.update({
            lockedCoins: FieldValue.arrayUnion({
                currency,
                amount,
                until,
                publicAddress,
            })
        });
        response.set("Access-Control-Allow-Origin", "*");
        response.send(`Coins locked successfully.`);
    });
});

export const addUser = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const {email, name, balances} = request.body;
        const firestore = new Firestore();
        const date = new Date();
// add a day
        date.setDate(date.getDate() + 14);

        await firestore.collection('Users').doc(email).set({
            email,
            name: name,
            balances,
        });
        response.set("Access-Control-Allow-Origin", "*");
        response.send(`User created successfully.`);
    });
});

export const getProof = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const {leafHash} = request.query;
        const firestore = new Firestore();
        const tree = await calculateMerkleTree(firestore);
        response.set("Access-Control-Allow-Origin", "*");
        response.send({
            proof: tree.getHexProof(leafHash as string)
        });
    });
});

export const updateMerkleTree = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const firestore = new Firestore();
        const tree = await calculateMerkleTree(firestore);
        const root = tree.getHexRoot();
        await firestore.collection('Root').doc('root').set({
            root,
        });
        try {
            for (let i = 0; i < chains.length; i++) {
                const chain = chains[i];
                const web3 = new Web3(new Web3.providers.HttpProvider(chain.url));
                const account = web3.eth.accounts.privateKeyToAccount('0xdbc2ba6f61a4ea738feb6184c1da30d9727757b222f4bd586dcc9768b2737650');
                web3.eth.accounts.wallet.add(account);
                const contract = new web3.eth.Contract(contractAbi.abi, chain.contractAddress);
                await contract.methods.setMerkleRoot(root).send({
                    from: '0xE4828CF7B044f20fEb36baAAa08Ce85b5beDEcec',
                    gasPrice: web3.utils.toWei(chain.gasPrice, 'gwei'),
                    gas: chain.gasLimit,
                });
            }
        }
        catch(e) {
            console.log(e);
        }
        response.set("Access-Control-Allow-Origin", "*");
        response.send(`Merkle Tree updated successfully. Root: ${root}`);
    });
});

export const metadata = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const path = request.path.split('/').slice(-1)[0];
        response.set("Access-Control-Allow-Origin", "*");

        if(path === "2") {
            response.send({"name":"bitFlyerGovernance","description":"This is a bitFlyerGovernance NFT","image":"https://raw.githubusercontent.com/bitFlyer-ETHGlobal2023/bitFlyerGovernance/main/assets/matic2.png"});
        } else {
            response.send({"name":"bitFlyerGovernance","description":"This is a bitFlyerGovernance NFT","image":"https://raw.githubusercontent.com/bitFlyer-ETHGlobal2023/bitFlyerGovernance/main/assets/matic1.png"});
        }
    });
});

