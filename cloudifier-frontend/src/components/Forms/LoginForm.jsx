import { useState } from "react";
import TextField from "./TextField";
import "./LoginForm.css";

const LoginForm = ({ toggleLoginForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataListener = (data, setter) => {
    setter(data);
  };
  const sendData = () => {};
  const getData = async () => {};

  return (
    /*  <div className="container-form">
        <TextField className="text-field" label="username" type="text" size={21} callback={dataListener}  setter={setUsername} />
        <TextField className="text-field" label="password" type="password" size={21} callback={dataListener}  setter={setPassword} />
        <button onClick={sendData}>Send</button>
    </div> */
    <>
      <div className="home-page-ctr"></div>
      <div className="login-page-ctr">
        <div>
          <span>
            Welcome to <span>Cloudifier</span>
          </span>
          <div>
            <img src="images/login.png" alt="Login" />
          </div>
          <span>
            At Cloudifier, we prioritize the security of your data. Your cloud
            journey begins with us, where innovation meets reliability.
          </span>
        </div>
        <div>
          <span>Sign in to account</span>
          <div>
            <input type="text" placeholder="Email" id="" />
            <input type="password" placeholder="Password" id="" />
            <span>Login</span>
          </div>
          <span>Sign Up</span>
        </div>
        <div onClick={toggleLoginForm}>
          <img src="icons/close.png" alt="Close" />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
