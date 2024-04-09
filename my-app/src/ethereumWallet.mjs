import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import compose from "./compose.mjs";
import { useEthereum } from "./ethereumContext.js";
import { useEffect } from "react";
// Other imports remain the same

export function UseSession() {
  const { provider, userAddress, setSessionDid } = useEthereum();

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
        compose.setDID(session.did);
        setSessionDid(session.did);
      } catch (error) {
        console.error("Failed to establish session:", error);
        setSessionDid(null);
      }
    }
    establishSession();
  }, [provider, userAddress, setSessionDid]);
}