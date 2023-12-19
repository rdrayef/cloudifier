import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";

function MachinesPage() {

  const [machines, setMachines] = useState([])

  useEffect(() => {
    const client = new ProxmoxClient("https://192.168.108.129:8006");
     client.connect("root@pam","sayih").then((rep) =>{
      if(rep){
        client.getImages("one","local").then((data) => {
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
