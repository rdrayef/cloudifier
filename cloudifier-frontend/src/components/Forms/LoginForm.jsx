import { useEffect, useState } from "react";
import TextField from "./TextField"
import './LoginForm.css';
import useProxmox from "../../config/Store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const LoginForm = () => {

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
    <div className="container-form">
        {loading && <div className="text-base" >Loading ...</div>}
        {errorLogin && <div className="bg-red-500 p-10" onClick={()=>seterrorLogin(!errorLogin)}>Can't connect to this account</div>}
        <TextField className="text-field" label="username" type="text" size={21} callback={dataListener}  setter={setUsername} />
        <TextField className="text-field" label="password" type="password" size={21} callback={dataListener}  setter={setPassword} />
        <button onClick={sendData}>Send</button>
    </div>)
}

export default LoginForm;