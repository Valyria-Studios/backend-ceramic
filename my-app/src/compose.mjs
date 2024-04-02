// Import ComposeDB client
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ComposeClient } from "@composedb/client";

// Import your compiled composite

import definition from "./runtime-composite.json";

// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite
const ceramicInstance = new CeramicClient("http://localhost:7007");

const compose = new ComposeClient({
  ceramic: ceramicInstance,
  definition,
});

export async function getInfo(compose) {
  try {
    const response = await compose.executeQuery(`
      query {
        simpleProfileIndex(last: 2) {
          edges {
            node {
              id
              controller {
                id
              }
              displayName
              email
            }
          }
        }
      }
    `);
    return response;
  } catch (error) {
    console.error("Query execution error:", error);
  }
}

export default compose;
