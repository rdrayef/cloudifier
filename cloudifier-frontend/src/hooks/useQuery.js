import { useEffect } from "react";
import useProxmox from "../config/Store";

const useQuery = ({}) => {
  const proxmox = useProxmox((state) => state.proxmoxClient);
};

export default useQuery;
