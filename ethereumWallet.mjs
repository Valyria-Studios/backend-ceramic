import {ethers} from "ethers"
import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import compose from "./compose.mjs";

const ethProvider = ethers.getDefaultProvider(
  "https://mainnet.infura.io/v3/6c86fb62030b445d93ca8a5612253219"
);

const addresses = await ethProvider.request({ method: "eth_requestAccounts" });
const accountId = await getAccountId(ethProvider, addresses[0]);
const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

const session = await DIDSession.get(accountId, authMethod, {
  resources: compose.resources,
});
const sessionDid = compose.setDID(session.did);

console.log(sessionDid);
