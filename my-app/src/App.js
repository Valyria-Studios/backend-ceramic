import logo from "./logo.svg";
import "./App.css";
import ConnectWalletButton from "./connectWallet";
import { EthereumProvider } from "./ethereumContext";

function App() {
  return (
    <EthereumProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <ConnectWalletButton />
          Learn React
        </header>
      </div>
    </EthereumProvider>
  );
}

export default App;
