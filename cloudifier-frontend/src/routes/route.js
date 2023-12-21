import MachinesTable from "../components/Tables/MachinesTable";
import MachinePage from "../pages/MachinePage";
import MachinesPage from "../pages/MachinesPage";

const routes = [
  { path: "/machines", component: MachinesPage },
  { path: "/tableTest", component: MachinesTable },
  { path: "/machine-details", component: MachinePage },

];


export default routes;
