import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";

function MachinesPage() {

  const [machines, setMachines] = useState([])

  useEffect(() => {
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
