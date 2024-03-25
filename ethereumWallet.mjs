import {ethers} from "ethers"
import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import compose from "./compose.mjs";

const ethProvider = '';

const addresses = await ethProvider.request({ method: "eth_requestAccounts" });
const accountId = await getAccountId(ethProvider, addresses[0]);
const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId);

const session = await DIDSession.get(accountId, authMethod, {
  resources: compose.resources,
});
const sessionDid = compose.setDID(session.did);

console.log(sessionDid);
