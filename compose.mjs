// Import ComposeDB client

import { ComposeClient } from "@composedb/client";

// Import your compiled composite

import definition from "./runtime-composite.json" assert { type: "json" };

// Create an instance of ComposeClient
// Pass the URL of your Ceramic server
// Pass reference to your compiled composite

const compose = new ComposeClient({
  ceramic: "http://localhost:7007",
  definition,
});

const response = await compose.executeQuery(`
  query{
    viewer{
      id
    }
  }
`);

console.log("response:", response)

export default compose;
