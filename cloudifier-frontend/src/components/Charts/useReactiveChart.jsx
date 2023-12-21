import { useState, useEffect } from "react";
import useProxmox from "../../config/Store";

export const useReactiveData = (node, vmid, length) => {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const [data, setData] = useState([]);

  const updateChart = async () => {
    try {
      const info = await proxmoxClient.getVMStatus(node, vmid);
      const date = new Date();

      setData((prevData) => [
        ...prevData,
        {
          label: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          data: info.cpu * 95,
        },
      ]);

      if (data.length === length) {
        setData((prevData) => prevData.slice(1));
      }
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(updateChart, 2000);

    return () => clearInterval(intervalId);
  }, [node, vmid, length, proxmoxClient]);

  return data;
};
