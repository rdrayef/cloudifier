import { useEffect } from "react";
import routes from "../routes/route.js";
import Menu from "../components/Menu/Menu.jsx";
import useProxmox from "../config/Store.js";
import { Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useToast from "../hooks/useToast.js";
export default function Dashboard() {
  const isAuth = useProxmox((state) => state.isAuth);
  const { showToast, setToastPosition } = useToast();
  const history = useHistory();
  useEffect(() => {
    if (!isAuth) {
      history.push("/login");

      showToast("You need to login first", "error");
    }
  }, []);
  return (
    <div>
      {isAuth && (
        <div className="container">
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      )}
    </div>
  );
}
