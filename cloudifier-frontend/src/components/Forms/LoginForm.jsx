
import { useEffect, useState } from "react";
import TextField from "./TextField"
import './LoginForm.css';
import useProxmox from "../../config/Store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = ({ toggleLoginForm }) => {

    let history = useHistory();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [errorLogin,seterrorLogin] = useState(false);

    const proxmoxClient = useProxmox((state) => state.proxmoxClient);
    const setIsAuth = useProxmox((state) => state.setIsAuth);
  
    const sendData = () => {
        proxmoxClient.connect(username, password).then((res)=>{
            setLoading(true);
            setIsAuth(res);
            return res;
        }).then((res) =>  {
            setLoading(false);
            if(!res){
                seterrorLogin(true);
            }
            else{
                history.push('/machines')
            }
        });
    }
      const dataListener = (data,setter) => {
        setter(data)
    }

    return (
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
            {loading && <div className="text-base" >Loading ...</div>}
            {errorLogin && <div className="bg-red-500 p-10" onClick={()=>seterrorLogin(!errorLogin)}>Can't connect to this account</div>}
            <TextField className="text-field" label="username" type="text" size={21} callback={dataListener}  setter={setUsername} />
            <TextField className="text-field" label="password" type="password" size={21} callback={dataListener}  setter={setPassword} />
            <span onClick={() => sendData()} >Login</span>
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
