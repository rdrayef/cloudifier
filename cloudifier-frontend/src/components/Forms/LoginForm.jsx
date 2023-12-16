import { useState } from "react";
import TextField from "./TextField"
import { connect, getVms } from "../../config/Connection";
import './LoginForm.css';


const LoginForm = () => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const dataListener = (data,setter) => {
        setter(data)
    }
    const sendData = () => {
        connect(username,password);
    }
    const getData = async () => {
        console.log(await getVms());
    }

    return (
    <div className="container-form">
        <TextField className="text-field" label="username" type="text" size={21} callback={dataListener}  setter={setUsername} />
        <TextField className="text-field" label="password" type="password" size={21} callback={dataListener}  setter={setPassword} />
        <button onClick={sendData}>Send</button>
    </div>)
}

export default LoginForm;