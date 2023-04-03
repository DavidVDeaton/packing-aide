import ListSection from "./ListSection";
import CreateContainerForm from "./CreateContainerForm";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function ListCard(props){

    const [allContainers, setAllContainers] = useState([])
    const [allToDos, setAllToDos] = useState([])
    const [containerFormOpen, setContainerFormOpen] = useState(false);
    const [toDoFormOpen, setToDoFormOpen] = useState(false);
    const authorities = useContext(UserContext);

    console.log(authorities);
    const refreshContainerData = () => {
        fetch(`${authorities.url}/container/event/${props.eventId}`, {
            headers: {
            "Authorization": `Bearer ${authorities.user.token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setAllContainers(data))
     }
    useEffect( () => {
        if(props.listType === "containers" && authorities.user.token != null){
            refreshContainerData();
        }
         //this search for todo by event does not exist, needs backend creation
         //else {
        //     fetch(`${authorities.url}/todo/event/${props.eventId}`, {
        //         headers: {
        //         "Authorization": `Bearer ${authorities.user.token}`
        //         }
        //     })
        //     .then((response) => response.json())
        //     .then((data) => setAllToDos(data))
        // }
    }, []);

    return(
        <div className="listCard">
            <div className="listCardHeader">
                <h3>props.listTitle</h3>
                <button onClick={() => setContainerFormOpen(!containerFormOpen)}>{!containerFormOpen ? "Add icon" : "Cancel icon"}</button>
            </div>
            {props.listType === "containers" 
            ? 
            <>
            {containerFormOpen && 
            <div className="formWrapper">
            <CreateContainerForm eventId={props.eventId} setContainerFormOpen={setContainerFormOpen} refreshContainerData={refreshContainerData}/>
            </div>
            }
            <ListSection listItems={allContainers} refreshContainerData={refreshContainerData}/>
            </>
            :
            <>
            {/* {toDoFormOpen && <CreateToDoForm eventId={props.eventId} setToDoFormOpen={setToDoFormOpen} />}
            <ListSection /> */}
            </>
            }
        </div>
    )
}