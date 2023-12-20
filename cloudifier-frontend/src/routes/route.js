import CreateVm from "../pages/CreateVm";
import MachinesPage from "../pages/MachinesPage";
import TestForm from "../pages/TestForm";
import TestGenricForm from "../pages/TestGenricForm";
import TestTable from "../pages/TestTable";

const routes = [
  { path: "/vms", component: MachinesPage },
  { path: "/tableTest", component: TestTable },
  { path: "/formsTest", component: TestForm },
  { path: "/create-form", component: CreateVm },
];

export default routes;
