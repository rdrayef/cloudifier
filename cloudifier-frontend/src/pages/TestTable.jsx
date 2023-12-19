import { useEffect, useState } from "react";
import Table from "../components/Layouts/Table"
import ProxmoxClient from "../config/ProxmoxClient"
import formatData from "../utils/FormatData";
import useProxmox from "../config/Store";

const TestTable=()=> {
  const [data,setData]=useState([]);
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);

  useEffect(() => {
    // const client = new ProxmoxClient("https://192.168.1.14:8006");
    //  client.connect("root@pam","rootroot").then((rep) =>{
    //   if(rep){
    //     client.getNodes().then((nodes)=>{
    //       let data=formatData(nodes,["cpu","name","maxdisk"]);
    //       setData(data);
    //     });
    //   }
    //  })
    // proxmoxClient.getNodes().then((nodes)=>{
    //   let data=formatData(nodes,["cpu","name","maxdisk"]);
    //   setData(data);
    // });
        console.log(proxmoxClient)
        proxmoxClient.getNodes().then((nodes)=>{
          let data=formatData(nodes,["cpu","name","maxdisk"]);
          setData(data);
        });
      
    

    }
    ,[proxmoxClient]);
  if(data.length>0){
    return (
      <div className="App">
        <Table columns={data[1]} rows={data[0]}/>
      </div>
    )
}else{
  return (
    <div className="App">
      <p>loading</p>
    </div>
  )
}
}

export default TestTable;
