import SingleMachine from "../components/Cards/Machine/SingleMachine";


const MachinePage = (props) =>{
    const {vmid} = props.location.state;
    return (
        <SingleMachine node={"org"} vmid={vmid} />
    );
}


export default MachinePage;