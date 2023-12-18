import { useEffect } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import routes from "./routes/route.js";
export default function Dashbored() {
  useEffect(() => {}, []);

  return (
    <div>
      <NavBar />

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
