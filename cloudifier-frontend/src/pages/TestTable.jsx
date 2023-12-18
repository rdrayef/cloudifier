import { useEffect, useState } from "react";
import Table from "../components/Layouts/Table"
import ProxmoxClient from "../config/ProxmoxClient"
import formatData from "../utils/FormatData";
const columns=["id","name","status"]
const rows=[{id:"1",name:"test",status:"running"},{id:"2",name:"test2",status:"running"}]


function TestTable() {
  const [data,setData]=useState([]);
  useEffect(() => {
    console.log("MachinesPage");
    const client = new ProxmoxClient("https://192.168.1.10:8006");
     client.connect("root@pam","rootroot").then((rep) =>{
      if(rep){
        client.getNodes().then((nodes)=>{
          let data=formatData(nodes,["cpu","name","maxdisk"]);
          setData(data);
        });
      }
     })}
    ,[]);
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
