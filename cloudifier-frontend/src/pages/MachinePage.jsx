import SingleMachine from "../components/Cards/Machine/SingleMachine";
import { NODE } from "../data/projectInfo";

const MachinePage = (props) => {
  const { vmid, isVM } = props.location.state;
  return <SingleMachine node={NODE} vmid={vmid} type={isVM} />;
};

export default MachinePage;
