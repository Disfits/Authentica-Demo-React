import logo from "./logo.svg";
import "./App.css";

function App() {
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
        </div>
      </header>
    </div>
  );
}

export default App;
