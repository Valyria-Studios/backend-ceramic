import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ConnectWalletButton from "./connectWallet.js";
import { getInfo } from "./compose.mjs"; // Ensure this path is correct
import compose from "./compose.mjs";
import { useTest } from "./ethereumWallet.mjs";

function App() {
  const [profiles, setProfiles] = useState([]);
  useTest();
  useEffect(() => {
    // Define an async function to fetch the data
    const fetchInfo = async () => {
      try {
        // Assuming compose is correctly configured and exported in "./compose.mjs"
        const response = await getInfo(compose); // If necessary, pass the correct argument instead of omitting it
        if (
          response &&
          response.data &&
          response.data.simpleProfileIndex.edges
        ) {
          setProfiles(
            response.data.simpleProfileIndex.edges.map((edge) => edge.node)
          );
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      }
    };

    fetchInfo(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ConnectWalletButton />
        Learn React
        {/* Render profile information */}
        <div>
          <h2>Profiles</h2>
          {profiles.map((profile) => (
            <div key={profile.id}>
              <p>
                <strong>DisplayName:</strong> {profile.displayName}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
