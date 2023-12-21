import { create } from "zustand";
import Cookies from "universal-cookie";
import ProxmoxClient from "./ProxmoxClient";

const client = new ProxmoxClient("https://192.168.1.10:8006");
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
