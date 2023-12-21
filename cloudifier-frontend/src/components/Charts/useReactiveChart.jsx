import { useState, useEffect } from "react";
import useProxmox from "../../config/Store";

export const useReactiveData = (node, vmid, length, isVm) => {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const [cpuData, setCpuData] = useState([]);
  const [memData, setMemData] = useState({ usedMem: 0, maxMem: 100 });
  const updateChart = async () => {
    if (isVm) {
      const info = await proxmoxClient.getVMStatus(node, vmid);
      await updateCpuChart(info);
      await updateMemChart(info);
    } else {
      const info = await proxmoxClient.getContainerStatus(node, vmid);
      await updateCpuChart(info);
      await updateMemChart(info);
    }
  };

  const updateMemChart = async (info) => {
    setMemData({ usedMem: info.mem, maxMem: info.maxmem });
    console.log(memData);
  };

  const updateCpuChart = async (info) => {
    try {
      const date = new Date();

      setCpuData((prevData) => [
        ...prevData,
        {
          label: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
          data: info.cpu * 95,
        },
      ]);

      if (cpuData.length === length) {
        setCpuData((prevData) => prevData.slice(1));
      }
    } catch (error) {
      console.error("Error updating chart:", error);
    }
  };

  useEffect(() => {
    updateChart();
    const intervalId = setInterval(updateChart, 2000);

    return () => clearInterval(intervalId);
  }, [node, vmid, length, proxmoxClient]);

  return { cpuData, memData };
};
