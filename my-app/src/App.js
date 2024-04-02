import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ConnectWalletButton from "./connectWallet.js";
import { createProfile, getInfo, updateProfile } from "./compose.mjs"; // Ensure this path is correct
import compose from "./compose.mjs";
import { useTest } from "./ethereumWallet.mjs";

function App() {
  const [profiles, setProfiles] = useState([]);
  const [inputData, setInputData] = useState({
    email: "",
    displayName: "",
  });
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [editProfileId, setEditProfileId] = useState(null); // Track which profile is being edited
  const [editData, setEditData] = useState({ email: "", displayName: "" }); // Track edit inputs

  // Existing functions...

  useTest();

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({ ...prevState, [name]: value }));
  };

  const startEdit = (profile) => {
    setEditProfileId(profile.id);
    setEditData({ email: profile.email, displayName: profile.displayName });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (compose) {
      try {
        await createProfile(inputData, compose);
        setFetchTrigger(!fetchTrigger);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Ceramic instance not initialized");
    }
  };

  const saveEdit = async (id) => {
    if (compose) {
      try {

        await updateProfile(id, editData, compose);
        setEditProfileId(null); // Exit edit mode
        setFetchTrigger(!fetchTrigger);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Ceramic instance not initialized");
    }
  };

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
  }, [fetchTrigger]); // Empty dependency array means this effect runs once on mount

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
              {editProfileId === profile.id ? (
                <>
                  <input
                    name="displayName"
                    value={editData.displayName}
                    onChange={handleEditChange}
                    placeholder="Display Name"
                  />
                  <input
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    placeholder="Email"
                  />
                  <button onClick={() => saveEdit(profile.id)}>Save</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>DisplayName:</strong> {profile.displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Controller ID:</strong> {profile.controller.id}
                  </p>
                  <button onClick={() => startEdit(profile)}>Edit</button>
                </>
              )}
            </div>
          ))}
          <form onSubmit={handleSubmit}>
            <input
              name="email"
              value={inputData.email}
              onChange={handleInputChange}
              placeholder="email"
            />
            <input
              name="displayName"
              value={inputData.displayName}
              onChange={handleInputChange}
              placeholder="Display Name"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
