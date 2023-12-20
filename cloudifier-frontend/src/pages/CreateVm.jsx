import React from "react";
import FormGeneric from "../components/Forms/FormGeneric";
import { schemaVm } from "../schema";
import useProxmox from "../config/Store";
import { useHistory } from "react-router-dom";
import { useToast } from "../hooks";
const fields = [
  {
    label: "name",
  },
  {
    label: "vimId",
    type: "hidden",
  },
  {
    label: "format",
    type: "hiden",
  },
  {
    label: "images",
    type: "select",
    options: [
      {
        label: "ubuntu",
        value: "ubuntu",
      },
      {
        label: "centos",
        value: "centos",
      },
    ],
  },
];
const generateRandomNumber = () => {
  // number between 1 and 10000
  return Math.floor(Math.random() * 10000) + 1;
};
const CreateVm = () => {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const navigate = useHistory();
  const { showToast, setToastPosition } = useToast();
  const onSubmit = (data) => {
    proxmoxClient
      .createVM(
        "org",
        generateRandomNumber(),
        data.name,
        "local:iso/ubuntu-22.04.3-live-server-amd64.iso"
      )
      .then((data) => {
        console.log(data);
        showToast("VM created successfully");
        navigate.push("/tableTest");
      });
  };
  return (
    <div>
      <FormGeneric fields={fields} schema={schemaVm} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateVm;
