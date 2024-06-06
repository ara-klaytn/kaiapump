import dotenv from "dotenv";
import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DfnsApiClient } from "@dfns/sdk";

dotenv.config();

if (!process.env.DFNS_CRED_ID) {
  throw new Error("DFNS_CRED_ID is required");
}
if (!process.env.DFNS_PRIVATE_KEY) {
  throw new Error("DFNS_PRIVATE_KEY is required");
}
if (!process.env.DFNS_API_URL) {
  throw new Error("DFNS_API_URL is required");
}
if (!process.env.DFNS_APP_ID) {
  throw new Error("DFNS_APP_ID is required");
}
if (!process.env.DFNS_AUTH_TOKEN) {
  throw new Error("DFNS_AUTH_TOKEN is required");
}

const signer = new AsymmetricKeySigner({
  credId: process.env.DFNS_CRED_ID,
  privateKey: process.env.DFNS_PRIVATE_KEY,
});

const dfnsApi = new DfnsApiClient({
  baseUrl: process.env.DFNS_API_URL, // base Url of DFNS API
  appId: process.env.DFNS_APP_ID, // ID of the Application registered with DFNS
  authToken: process.env.DFNS_AUTH_TOKEN,
  signer,
});

const wallet = await dfnsApi.wallets.createWallet({
  body: { network: "EthereumSepolia" },
});

console.log(wallet);

const list = await dfnsApi.wallets.listWallets({});

// const tranfers = await dfnsApi.wallets.transferAsset({
//   walletId: "123",
//   body: {
//     amount: "100",
//     kind: "Erc20",
//     to: "0x123",
//     contract: "0x123",
//     priority: "Fast",
//   },
// });

console.log(JSON.stringify(tranfers));

// pnpm exec tsx index.ts
