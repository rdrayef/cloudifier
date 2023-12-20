import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";

function MachinesPage() {

  const [machines, setMachines] = useState([])



  useEffect(() => {
<<<<<<< HEAD
    console.log("MachinesPage");
    setMachines([
      {
        "mem": 78819481,
        "maxdisk": 0,
        "diskread": 0,
        "vmid": 101,
        "pid": 1398,
        "disk": 0,
        "name": "VM 101",
        "netout": 0,
        "uptime": 4301,
        "status": "running",
        "cpu": 0.111831962864292,
        "maxmem": 536870912,
        "cpus": 1,
        "netin": 0,
        "diskwrite": 0
    },
    {
      "cpu": 0.167320450981585,
      "maxmem": 536870912,
      "status": "running",
      "diskread": 0,
      "cpus": 1,
      "vmid": 106,
      "disk": 0,
      "name": "VM 106",
      "mem": 78424477,
      "netout": 0,
      "netin": 0,
      "pid": 3963,
      "diskwrite": 0,
      "uptime": 3062,
      "maxdisk": 0
  },
  {
    "mem": 78812481,
    "maxdisk": 2,
    "diskread": 0,
    "vmid": 101,
    "pid": 1398,
    "disk": 0,
    "name": "VM 103",
    "netout": 0,
    "uptime": 4301,
    "status": "stopped",
    "cpu": 0.111831962864292,
    "maxmem": 536870912,
    "cpus": 1,
    "netin": 0,
    "diskwrite": 0
  },


    ])
  },[]);

=======
    const client = new ProxmoxClient("https://192.168.108.129:8006");
     client.connect("root@pam","sayih").then((rep) =>{
      if(rep){
        // client.getClusterResources("storage").then((data)=> {
        //   console.log("Storages :",data);
        // })
        // client.getNodesList().then((data) => {
        //   console.log("Nodes : ", data);
        //   data.map((node)=> {
        //     client.getNodeStatus(node).then((dataNode) => {
        //       console.log("Node Status :" , dataNode);
        //     })
        //   })
        // })
        // client.getISOImages("one","local").then((data)=> {
        //   console.log("Images :",data);
        // })
        // client.getContainerTemplates("one","local").then((data)=> {
        //   console.log("Templates :",data);
        // })
        // client.getBackups("one","local").then((data)=> {
        //   console.log("Backups :",data);
        // })
        // client.getVMStatus("one",106).then((data) => {
        //   console.log("VM Status : ", data);
        // })
        // client.startVM("one",106).then((data) => {
        //   console.log("Start VM : ", data);
        // })
        // client.createContainer("one",105,"local:vztmpl/alpine-3.18-default_20230607_amd64.tar.xz").then((data) => {
        //   console.log(data);
        // })
        client.getContainerStatus("one",104).then((data) => {
          console.log(data);
        })
      }
     })}
    ,[]);
>>>>>>> 29bb27f847e034b5671240602fb43e5b042d4dbb


  return (
    <div>
      <span>Your Machines</span>
      <div className="Machines">
        {machines.map((machine) => (
          <MachineCard
            key={machine.vmid}
            machineData={machine}
          />
        ))}
      </div>
    </div>
  );
}

export default MachinesPage;
