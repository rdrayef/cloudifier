import { create } from "zustand";

import ProxmoxClient from "./ProxmoxClient";

let client = new ProxmoxClient("https://192.168.100.84:8006");

const useProxmox = create((set) => ({
  proxmoxClient: client,
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useProxmox;
