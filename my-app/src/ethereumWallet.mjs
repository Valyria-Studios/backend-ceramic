import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import compose from "./compose.mjs";
import { useEthereum } from "./ethereumContext.js";
import { useEffect, useState } from "react";
// Other imports remain the same

export function useTest() {
  const { provider, userAddress, authMethod } = useEthereum();
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

        console.log("session", session)

        const sessionDid = compose.setDID(session.did);

        setSessionDid(sessionDid);
      } catch (error) {
        console.error("Failed to establish session:", error);
        setSessionDid(null);
      }
    }
    
    establishSession();
  }, [provider, userAddress]);
  
  console.log("sessionDid", sessionDid);
  return sessionDid;
}
