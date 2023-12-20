import { useEffect } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import routes from "../routes/route.js";
import Menu from "../components/Menu/Menu.jsx";
export default function Dashboard() {
  return (
    <div>
      <Menu />

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
    </div>
  );
}
