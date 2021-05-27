import "./App.css";
import getWeb3 from "./web3";
import { useEffect, useState } from "react";
import abi from "./ABI.json";
function App() {
  const [account, setAccount] = useState();
  const [loadState, setLoadState] = useState("loading");
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();
  const organisationId = 42069;

  const connectWallet = () => {
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
    //To Do
    //Define contract as web3.eth.Contract(abi,contract address)
    //Need to deploy contract to get addressa
  };

  useEffect(() => {
    if (web3 && account) {
      const newContract = new web3.eth.Contract(
        abi,
        "0xef5efcf2a2c60137270336ea1a23f55662cee766",
        {
          from: account.toString(),
        }
      );
      setContract(newContract);
    }
  }, [account]);

  useEffect(() => {
    connectWallet();
  }, []);

  function handleSignIn(params) {
    //Sign In code goes here
    //Pass Org Id and Token Id
    // contract.methods.signIn(organisationId, tokenId).call((err, result) => {
    //   console.log(result);
    // });
    //Handle error and result
  }
  function handleSignUp(params) {
    //Sign Up code goes here
    //Pass account URI and organisation ID
    contract.methods
      .signUp("test arpit", organisationId)
      .send((err, result) => {
        console.log(result);
        console.log(err);
      });
    //Handle error and result
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
                    connectWallet();
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
