import { create } from "zustand";
import Cookies from "universal-cookie";
import ProxmoxClient from "./ProxmoxClient";
import { URL } from "../data/projectInfo";

const client = new ProxmoxClient(URL);
const cookies = new Cookies();
const useProxmox = create((set) => ({
  proxmoxClient: client,
  isAuth: cookies.get("Token") && cookies.get("CSRFPreventionToken"),
  setIsAuth: (isAuth) => set({ isAuth }),
  logout: () => {
    cookies.remove("Token");
    cookies.remove("CSRFPreventionToken");
    set({ isAuth: false });
  },
}));

export default useProxmox;
