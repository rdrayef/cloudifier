import Cookies from "universal-cookie";
import axios from "axios";
class ProxmoxClient {
  constructor(URL) {
    this.init(URL);
    this.cookies = new Cookies();
  }

  init(URL) {
    this.instance = axios.create({
      baseURL: `${URL}/api2/json`,
    });
    this.instance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers["Authorization"] = `PVEAuthCookie=${cookies.get(
            PVEAuthCookie
          )}`;
          config.headers["CSRFPreventionToken"] = `${cookies.get(
            CSRFPreventionToken
          )}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  async connect(username, password) {
    const response = await this.instance.post("/access/ticket", {
      username: username,
      password: password,
    });
    const res = await response.data;
    cookies.set("PVEAuthCookie", res.data.ticket);
    cookies.set("CSRFPreventionToken", res.data.CSRFPreventionToken);
    return true;
  }
}
