import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import LockAndMint from "./routes/LockAndMint";
import Lock from "./routes/LockAndMint/Lock";
import Mint from "./routes/LockAndMint/Mint";
import Account from "./routes/LockAndMint/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/lock-and-mint",
        element: <LockAndMint />,
        children: [
          {
            path: "/lock-and-mint",
            index: true,
            element: <Account />,
          },
          {
            path: "/lock-and-mint/lock",
            element: <Lock />,
          },
          {
            path: "/lock-and-mint/mint",
            element: <Mint />,
          },
        ],
      },
    ],
  },
]);

const { chains, provider } = configureChains(
  [goerli, polygon, optimism, arbitrum], // change  here to add support for more chains
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: import.meta.env.WALLET_CONNECT_APP_NAME,
  projectId: import.meta.env.WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);
