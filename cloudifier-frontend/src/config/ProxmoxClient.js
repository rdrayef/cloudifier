import axios from "axios";
import Cookies from "universal-cookie";

export default class ProxmoxClient {
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
        const token = {
          PVEAuthCookie: this.cookies.get("PVEAuthCookie"),
          CSRFPreventionToken: this.cookies.get("CSRFPreventionToken"),
        };
        if (token.CSRFPreventionToken && token.PVEAuthCookie) {
          config.headers[
            "Authorization"
          ] = `PVEAuthCookie=${token.PVEAuthCookie}`;
          config.headers[
            "CSRFPreventionToken"
          ] = `${token.CSRFPreventionToken}`;
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
    this.cookies.set("PVEAuthCookie", res.data.ticket);
    this.cookies.set("CSRFPreventionToken", res.data.CSRFPreventionToken);
    return true;
  }

  async getNodes() {
    const response = await this.instance.get("/nodes/pve/qemu");
    const res = await response.data;
    return res.data;
  }
}
