import React, { useEffect, useState } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";
import ProxmoxClient from "../config/ProxmoxClient";

function MachinesPage() {

  const [machines, setMachines] = useState([])



  useEffect(() => {
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
