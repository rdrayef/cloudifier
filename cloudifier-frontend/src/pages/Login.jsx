import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from "../components/Forms/LoginForm";
import useProxmox from "../config/Store";
import useToast from "../hooks/useToast";
import { useEffect } from "react";

const Login = () => {
  const isAuth = useProxmox((state) => state.isAuth);
  const { showToast, setToastPosition } = useToast();
  const history = useHistory();
  useEffect(() => {
    if (isAuth) {
      history.push("/machines");
      showToast("You are connected", "info");
    }
  }, []);

  return <LoginForm />;
};

export default Login;
