import dotenv from "dotenv";
import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DfnsApiClient } from "@dfns/sdk";
import { serializeTransaction } from "viem";

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

async function transferKlay() {
  const unsigned_tx = serializeTransaction({
    value: 0n,
    to: "0xe19a8f89b38465744d4029165d3df4a17b2e40f1",
    type: "eip1559",
    chainId: 11155111,
  });

  // const generateSignature_res = await dfnsApi.wallets.generateSignature({
  //   walletId: "wa-1nr2a-98dvm-9rtps21d7pmcp86a",
  //   body: {
  //     kind: "Transaction",
  //     transaction: unsigned_tx,
  //   },
  // });

  // const signed_tx = generateSignature_res.signedData;
  // if (!signed_tx) {
  //   throw new Error("DFNS did not return a signed transaction");
  // }

  // const broadcast_res = await dfnsApi.wallets.broadcastTransaction({
  //   walletId: "wa-1vt1v-oq0t1-8paoj98g86d04fp9",
  //   body: {
  //     kind: "Transaction",
  //     transaction: unsigned_tx,
  //   },
  // });

  // return broadcast_res;

  const newenduser = await dfnsApi.auth.registerEndUser({
    body: {
      firstFactorCredential: {
        credentialKind: "Password",
        credentialInfo: { password: "pass" },
      },
      wallets: [{ network: "EthereumSepolia" }],
    },
  });

  console.log(newenduser);
}

transferKlay();
