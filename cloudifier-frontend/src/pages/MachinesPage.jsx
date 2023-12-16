import React, { useEffect } from "react";
import MachineCard from "../components/Cards/Machine/MachineCard";

function MachinesPage() {
  const machines = [
    {
      diskread: 0,
      netout: 0,
      disk: 0,
      cpu: 0,
      maxmem: 2147483648,
      maxdisk: 34359738368,
      vmid: 102,
      cpus: 2,
      mem: 0,
      status: "stopped",
      name: "ubuntu-live-server-vm",
      uptime: 0,
      netin: 0,
      diskwrite: 0,
    },
    {
      diskread: 0,
      netout: 0,
      disk: 0,
      cpu: 0,
      maxmem: 2147483648,
      maxdisk: 34359738368,
      vmid: 102,
      cpus: 2,
      mem: 0,
      status: "running",
      name: "ubuntu-live-server-vm2",
      uptime: 0,
      netin: 0,
      diskwrite: 0,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'root'; // Replace with your Proxmox username
        const password = 'admin'; // Replace with your Proxmox password

        // Get the Proxmox ticket
        const ticketResponse = await fetch("https://192.168.1.3:8006/api2/json/access/ticket", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const { data: { ticket } } = await ticketResponse.json();

        // Use the obtained ticket to fetch data from Proxmox API
        const dataResponse = await fetch("https://192.168.1.3:8006/api2/json/nodes/server/qemu", {
          headers: {
            Cookie: `PVEAuthCookie=${ticket}`,
          },
        });

        const data = await dataResponse.json();
        console.log("data>>>>>"+data); // Use the fetched data as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


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
