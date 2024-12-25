//// import { configureChains, createConfig } from "wagmi";
//// import { connectorsForWallets } from "@rainbow-me/rainbowkit";
//// import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
//// import { publicProvider } from "wagmi/providers/public";
//// const bscMainnet = {
////   id: 56,
////   name: "Binance Smart Chain",
////   network: "bsc",
////   nativeCurrency: {
////     name: "Binance Coin",
////     symbol: "BNB",
////     decimals: 18,
////   },
////   rpcUrls: {
////     default: { http: ["https://bsc-dataseed.binance.org/"] },
////   },
////   blockExplorers: {
////     default: { name: "BscScan", url: "https://bscscan.com" },
////   },
//// };
//
//// const { chains, publicClient, webSocketPublicClient } = configureChains(
////   [bscMainnet],
////   [publicProvider()]
//// );
//
//// const connectors = connectorsForWallets([
////   {
////     groupName: "Recommended",
////     wallets: [metaMaskWallet({ chains }), injectedWallet({ chains })],
////   },
//// ]);
//
//// const wagmiClient = createConfig({
////   autoConnect: true,
////   connectors,
////   publicClient,
////   webSocketPublicClient,
//// });
//
//// export { wagmiClient, chains };
//
//
//import { configureChains, createConfig, Chain } from "wagmi";
//import { connectorsForWallets } from "@rainbow-me/rainbowkit";
//import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
//import { publicProvider } from "wagmi/providers/public";
//
//// Define the Binance Smart Chain Mainnet configuration
//const bscMainnet: Chain = {
//  id: 56,
//  name: "Binance Smart Chain",
//  network: "bsc",
//  nativeCurrency: {
//    name: "Binance Coin",
//    symbol: "BNB",
//    decimals: 18,
//  },
//  rpcUrls: {
//    default: { http: ["https://bsc-dataseed.binance.org/"] },
//  },
//  blockExplorers: {
//    default: { name: "BscScan", url: "https://bscscan.com" },
//  },
//};
//
//// Configure chains and providers
//const { chains, publicClient, webSocketPublicClient } = configureChains(
//  [bscMainnet],
//  [publicProvider()]
//);
//
//// Configure wallet connectors
//const connectors = connectorsForWallets([
//  {
//    groupName: "Recommended",
//    wallets: [metaMaskWallet({ chains }), injectedWallet({ chains })],
//  },
//]);
//
//// Create the WAGMI client configuration
//const wagmiClient = createConfig({
//  autoConnect: true,
//  connectors,
//  publicClient,
//  webSocketPublicClient,
//});
//
//export { wagmiClient, chains };
