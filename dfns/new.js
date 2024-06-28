import { parseUnits, Transaction } from "ethers";
import dotenv from "dotenv";
import { AsymmetricKeySigner } from "@dfns/sdk-keysigner";
import { DfnsApiClient } from "@dfns/sdk";
import { serializeTransaction } from "viem";

dotenv.config();

const walletId = "wa-1vt1v-oq0t1-8paoj98g86d04fp9";

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

async function main() {

  // const newenduser = await dfnsApi.auth.registerEndUser({
  //   body: {
  //     firstFactorCredential: {
  //       credentialKind: "Password",
  //       credentialInfo: { password: "pass", },

  //     },
  //     wallets: [{ network: "EthereumSepolia" }],
  //   },
  // });

  // console.log(newenduser);


  const res = await dfnsApi.wallets.transferAsset({
    walletId,
    body: {
      amount: "0.005",
      kind: "Native",
      to: "0xE19A8F89b38465744D4029165d3Df4a17b2E40F1"
    }
  })

  console.log(res);

  // const transaction = Transaction.from({
  //   to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
  //   value: "1",
  //   gasLimit: "21000",
  //   maxPriorityFeePerGas: parseUnits("5", "gwei"),
  //   maxFeePerGas: parseUnits("20", "gwei"),
  //   nonce: 3,
  //   type: 2,
  //   chainId: 11155111,
  // });

  // const res = await dfnsApi.wallets.generateSignature({
  //   walletId,
  //   body: { kind: "Transaction", transaction: transaction.unsignedSerialized },
  // });


  // const res = await dfnsApi.wallets.broadcastTransaction({
  //   walletId,
  //   body: { kind: "Transaction", transaction: transaction.unsignedSerialized },
  // });
  // console.log(res);

}

main().catch(console.error);