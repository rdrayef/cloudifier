import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";

function MachinesPage() {

  const [machines, setMachines] = useState([])

  useEffect(()=>{
  },[])


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
