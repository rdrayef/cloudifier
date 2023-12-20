import React, { useEffect, useState } from "react";
import MachinesTable from "../components/Tables/MachinesTable";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useProxmox from "../config/Store";
import formatData from "../utils/FormatData";

function MachinesPage() {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);

  const [machines, setMachines] = useState([]);
  const [containers, setContainers] = useState([]);
  const handleStartStopVM = (machine, start, stop) => {
    let data = null;
    if (machine.status === "stopped") {
      proxmoxClient.startVM("org", machine.vmid).then((res) => {
        setMachines((prev) => {
          prev.forEach((m) => {
            if (m.vmid == machine.vmid) m.status = "running";
          });
          return [...prev];
        });
      });

      // update the status of the machine
    } else {
      proxmoxClient.stopVM("org", machine.vmid).then((res) => {
        setMachines((prev) => {
          prev.forEach((m) => {
            if (m.vmid == machine.vmid) m.status = "stopped";
          });
          return [...prev];
        });
      });
    }
  };

  const handleStartStopLXC = (machine, start, stop) => {
    let data = null;
    if (machine.status === "stopped") {
      proxmoxClient.startContainer("org", machine.vmid).then((res) => {
        setContainers((prev) => {
          prev.forEach((m) => {
            if (m.vmid == machine.vmid) m.status = "running";
          });
          return [...prev];
        });
      });

      // update the status of the machine
    } else {
      proxmoxClient.stopContainer("org", machine.vmid).then((res) => {
        setContainers((prev) => {
          prev.forEach((m) => {
            if (m.vmid == machine.vmid) m.status = "stopped";
          });
          return [...prev];
        });
      });
    }
  };
  useEffect(() => {
    async function getMachines() {
      let machines = await proxmoxClient.getVMList("org");
      machines = machines.map((m) => ({
        ...m,
        caller: handleStartStopVM,
      }));
      setMachines(machines);
    }
    async function getContainers() {
      let containers = await proxmoxClient.getContainersList("org");
      containers = containers.map((m) => ({
        ...m,
        caller: handleStartStopLXC,
      }));
      setContainers(containers);
    }
    getMachines();
    getContainers();
  }, []);

  // const containers = [
  //   {
  //     netin: 684,
  //     disk: 10956800,
  //     diskread: 10354688,
  //     vmid: "103",
  //     swap: 0,
  //     name: "root",
  //     maxmem: 536870912,
  //     cpu: 0,
  //     status: "running",
  //     pid: 7514,
  //     uptime: 13,
  //     maxswap: 536870912,
  //     maxdisk: 8350298112,
  //     cpus: 1,
  //     diskwrite: 8192,
  //     netout: 1270,
  //     type: "lxc",
  //     mem: 1630208,
  //     template: "ubuntu",
  //   },
  // ];

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
