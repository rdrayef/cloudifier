import CreateVm from "../pages/CreateVm";
import MachinesPage from "../pages/MachinesPage";
import TestGenricForm from "../pages/TestGenricForm";
import TestTable from "../pages/TestTable";

const routes = [
  { path: "/vms", component: MachinesPage },
  { path: "/tableTest", component: TestTable },
  { path: "/formsTest", component: TestGenricForm },
  { path: "/create-form", component: CreateVm },
];

export default routes;
