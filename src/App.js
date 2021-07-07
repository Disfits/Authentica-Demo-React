import "./App.css";
import getWeb3 from "./web3";
import { useEffect, useState } from "react";
import abi from "./ABI.json";
import ipfs from "./ipfs";
import JSONObject from "./IPFS_interface.json";
import Github from "./github.png";

function App() {
  const [account, setAccount] = useState();
  const [loadState, setLoadState] = useState("loading");
  const [web3, setWeb3] = useState();
  const [contract, setContract] = useState();
  const [signedIn, setSignedIn] = useState(false);
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
        "0xFa24bAf1A4c513b3b55A128aB63c4868af12fAe2",
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

  function storeJSON(params) {
    //Pass metadata JSON
    const metaData = JSON.stringify(JSONObject);
    ipfs.add(metaData).then((res) => {
      console.log("IPFS cid:", res);
    });
  }

  function handleSignIn(params) {
    // Sign In code goes here
    // Pass Org Id and Token Id
    contract.methods.signIn(organisationId).call((err, result) => {
      console.log(result);
      setSignedIn(true);
    });
    // Handle error and result
  }
  function handleSignUp(params) {
    // Sign Up code goes here
    // Pass account URI and organisation ID
    contract.methods
      .signUp("test arpit", organisationId)
      .send((err, result) => {
        console.log(result);
        console.log(err);
      });

    storeJSON();
    //Handle error and result
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="card">
          <h3>NFAuth Demo</h3>
          {signedIn ? (
            <div>You're signed in</div>
          ) : (
            <div>
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
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            whiteSpace: "nowrap",
            display: "flex",
          }}
        >
          <div style={{ paddingTop: "4px" }}>
            <img
              src={Github}
              style={{ display: "inline", height: "20px", width: "20px" }}
            ></img>
          </div>
          <div>
            <a
              href="https://github.com/arpitbhardwaj24"
              style={{
                display: "inline",
                fontSize: "18px",
                marginLeft: "5px",
                color: "#bbb",
                textDecoration: "none",
              }}
            >
              arpitbhardwaj24
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
