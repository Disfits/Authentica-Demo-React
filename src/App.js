import "./App.css";
import getWeb3 from "./web3";
import { useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState();
  const [loadState, setLoadState] = useState("loading");
  const [web3, setWeb3] = useState();

  const conenctWallet = () => {
    getWeb3()
      .then((res) => {
        setWeb3(res);
        res.eth.getAccounts().then(setAccount);
        setLoadState("success");
      })
      .catch((err) => {
        setLoadState("error");
        console.log(err);
      });
  };
  useEffect(() => {
    conenctWallet();
  }, []);

  function handleSignIn(params) {
    //Sign In code goes here
  }
  function handleSignUp(params) {
    //Sign Up code goes here
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          <h3>NFAuth Demo</h3>
          <button className="secondary" onClick={handleSignIn}>
            Sign in using NFAuth
          </button>
          <button className="primary" onClick={handleSignUp}>
            Sign up using NFAuth
          </button>
          <div className="load-state">
            {loadState === "loading" ? (
              <div>Connecting wallet...</div>
            ) : loadState === "error" ? (
              <div>
                Wallet Not connected.{" "}
                <span
                  onClick={() => {
                    conenctWallet();
                  }}
                  className="connect-text"
                >
                  Try again
                </span>
              </div>
            ) : (
              <div>Wallet connected</div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
