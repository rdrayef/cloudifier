import { create } from "zustand";

import ProxmoxClient from "./ProxmoxClient";


const client = new ProxmoxClient("https://192.168.1.12:8006");

const useProxmox = create((set) => ({
  proxmoxClient: client,
  isAuth: false,
  setIsAuth: (isAuth) => set({ isAuth }),
}));

export default useProxmox;
