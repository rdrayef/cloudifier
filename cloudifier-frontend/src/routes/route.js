import MachinesTable from "../components/Tables/MachinesTable";
import MachinesPage from "../pages/MachinesPage";
import TestTable from "../pages/TestTable";

const routes = [
  { path: "/machines", component: MachinesPage },
  { path: "/tableTest", component: MachinesTable },
];

export default routes;
