import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Home from "./routes/Home";
import LockAndMint from "./routes/LockAndMint";
import Lock from "./routes/Lock";
import Mint from "./routes/Mint";

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
      },
      {
        path: "/lock-and-mint/lock",
        element: <LockAndMint />,
        children: [
          {
            path: "/lock-and-mint/lock",
            index: true,
            element: <Lock />,
          }
        ],
      },
      {
        path: "/lock-and-mint/mint",
        element: <LockAndMint />,
        children: [
          {
            path: "/lock-and-mint/mint",
            index: true,
            element: <Mint />,
          }
        ],
      }
    ],
  },
]);

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: import.meta.env.WALLET_CONNECT_APP_NAME,
  projectId: import.meta.env.WALLET_CONNECT_PROJECT_ID,
  chains,
});

const wagmiClient = createClient({
  // autoConnect: true,
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
