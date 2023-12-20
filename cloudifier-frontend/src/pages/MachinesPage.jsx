import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";

function MachinesPage() {

  const [machines, setMachines] = useState([])

  useEffect(() => {
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
