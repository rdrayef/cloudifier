import React, { useEffect, useState } from "react";
import MachinesTable from "../components/Tables/MachinesTable";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useProxmox from "../config/Store";
import ModalForm from "../components/modal/ModalForm";
import FormatIso from "../utils/FormatIso";
function MachinesPage() {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const [listIso, setListIso] = useState([]);
  const [machines, setMachines] = useState([]);
  const [containers, setContainers] = useState([]);

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
    async function iso() {
      const res = await proxmoxClient.getISOImages("org", "local");
      const formatedIso = FormatIso(res);
      setListIso(formatedIso);
    }
    iso();
    getMachines();
    getContainers();
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
          {/* create Vm modal */}
          {/* <Tab className="text-gray-700 py-4 px-6 border-b-4 border-transparent hover:border-orange-600 focus:outline-none cursor-pointer">
            <ModalForm />
          </Tab> */}
          {/* create Vm modal */}
        </TabList>
        <TabPanel>
          <div className="py-2">
            <div className="flex justify-end">
              <ModalForm images={listIso} refetch={refetchMachines} />
            </div>
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
