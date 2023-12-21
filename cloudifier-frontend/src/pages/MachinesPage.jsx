import React, { useEffect, useState } from "react";
import MachinesTable from "../components/Tables/MachinesTable";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useProxmox from "../config/Store";

function MachinesPage() {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const [machines, setMachines] = useState([]);
  const [containers, setContainers] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const refetchMachines = async () => {
    try {
      let machines = await proxmoxClient.getVMList("org");
      machines = machines.map((m) => ({
        ...m,
        caller: handleStartStopVM,
      })).sort((a, b) =>  a.name.localeCompare(b.name));
      setMachines(machines);
    } catch (error) {
      console.error("Error fetching machines:", error);
    }
  };


  const refetchContainers = async () => {
    try {
    let containers = await proxmoxClient.getContainersList("org");
      containers = containers.map((m) => ({
        ...m,
        caller: handleStartStopLXC,
      })).sort((a, b) =>  a.name.localeCompare(b.name));;
      setContainers(containers);}
      catch (error) {
        console.error("Error fetching machines:", error);
      }
  }

  const handleStartStopVM = (machine, start, stop) => {
    const actionPromise =
      machine.status === "stopped"
        ? proxmoxClient.startVM("org", machine.vmid)
        : proxmoxClient.stopVM("org", machine.vmid);

    actionPromise.then((res) => {
      refetchMachines();
    });
  };

  const handleStartStopLXC = (machine, start, stop) => {
    const actionPromise =
      machine.status === "stopped"
        ? proxmoxClient.startContainer("org", machine.vmid)
        : proxmoxClient.stopContainer("org", machine.vmid);

    actionPromise.then((res) => {
      refetchContainers();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await refetchMachines();
      await refetchContainers();
    };
    fetchData();
    const id = setInterval(fetchData, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []); 


  return (
    <div className="mx-auto mt-5">
      <Tabs className="border-b bg-gray-100 rounded- h-screen">
        <TabList className="flex pl-4">
          <Tab className="text-gray-700 py-4 px-6 border-b-4 border-transparent hover:border-orange-600 focus:outline-none cursor-pointer">
            Machines
          </Tab>
          <Tab className="text-gray-700 py-4 px-6 border-b-4 border-transparent hover:border-orange-600 focus:outline-none cursor-pointer">
            Containers
          </Tab>
        </TabList>
        <TabPanel>
          <div className="py-2">
            <MachinesTable title="List of your machines" machines={machines} />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="py-6">
            <MachinesTable
              title="List of your containers"
              machines={containers}
            />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default MachinesPage;