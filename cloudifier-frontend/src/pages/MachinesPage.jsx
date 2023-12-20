import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";
import MachinesTable from "../components/Tables/MachinesTable";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function MachinesPage() {
  //const [machines, setMachines] = useState([])

  /*   useEffect(() => {
    console.log("MachinesPage");
    const client = new ProxmoxClient("https://192.168.1.10:8006");
     client.connect("root@pam","rootroot").then((rep) =>{
      if(rep){
        client.getNodes().then((nodes)=>{
          console.log(nodes);
        });
      }
     })}
    ,[]);
 */

  const machines = [
    {
      diskwrite: 0,
      netin: 0,
      netout: 0,
      name: "VM 108",
      mem: 0,
      uptime: 0,
      cpus: 1,
      maxdisk: 0,
      disk: 0,
      diskread: 0,
      cpu: 0,
      vmid: 108,
      status: "stopped",
      maxmem: 536870912,
      template: "windows",
    },
    {
      maxmem: 536870912,
      status: "stopped",
      cpu: 0,
      vmid: 100,
      diskread: 0,
      disk: 0,
      cpus: 1,
      maxdisk: 0,
      uptime: 0,
      mem: 0,
      netin: 0,
      name: "my-vm",
      netout: 0,
      diskwrite: 0,
      template: "debian",
    },
    {
      cpus: 1,
      maxdisk: 10737418240,
      uptime: 22,
      disk: 0,
      diskwrite: 0,
      mem: 137886462,
      netin: 157,
      name: "ubuntu-vm-lvl2-m1",
      netout: 0,
      cpu: 0.997020534788137,
      pid: 1041,
      vmid: 101,
      maxmem: 2147483648,
      status: "running",
      diskread: 0,
      template: "fedora",
    },
    {
      diskread: 0,
      cpu: 0,
      vmid: 102,
      maxmem: 1073741824,
      status: "stopped",
      diskwrite: 0,
      mem: 0,
      netin: 0,
      name: "arch-vm-lvl2-m2",
      netout: 0,
      cpus: 2,
      maxdisk: 10737418240,
      uptime: 0,
      disk: 0,
      template: "centos",
    },
    {
      mem: 0,
      netin: 0,
      name: "vm-zakaria",
      netout: 0,
      diskwrite: 0,
      disk: 0,
      cpus: 1,
      maxdisk: 0,
      uptime: 0,
      diskread: 0,
      maxmem: 536870912,
      status: "stopped",
      cpu: 0,
      vmid: 200,
      template: "ubuntu",
    },
  ];

  const containers = [
    {
      netin: 684,
      disk: 10956800,
      diskread: 10354688,
      vmid: "103",
      swap: 0,
      name: "root",
      maxmem: 536870912,
      cpu: 0,
      status: "running",
      pid: 7514,
      uptime: 13,
      maxswap: 536870912,
      maxdisk: 8350298112,
      cpus: 1,
      diskwrite: 8192,
      netout: 1270,
      type: "lxc",
      mem: 1630208,
      template:"ubuntu"
    },
  ];

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
            <MachinesTable title="List of your containers" machines={containers} />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default MachinesPage;
