import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import compose from "./compose.mjs";
import { useEthereum } from "./ethereumContext.js";
import { useEffect, useState } from "react";
// Other imports remain the same

export function useTest() {
  const { provider, userAddress } = useEthereum();
  const [sessionDid, setSessionDid] = useState("");

  useEffect(() => {
    async function establishSession() {
      if (!provider || !userAddress) return;

      try {
        const accountId = await getAccountId(provider, userAddress);
        const authMethod = await EthereumWebAuth.getAuthMethod(
          provider,
          accountId
        );

        const session = await DIDSession.get(userAddress, authMethod, {
          resources: compose.resources,
        });

        console.log("session", session);
        console.log("sessiondid", session.did);
        console.log("sessionAuthorizations", session.authorizations);

        const composeDid = compose.setDID(session.did);
        setSessionDid(session.did.id);
      } catch (error) {
        console.error("Failed to establish session:", error);
        setSessionDid(null);
      }
    }

    establishSession();
  }, [provider, userAddress]);
  console.log(sessionDid);
  return sessionDid;
}
