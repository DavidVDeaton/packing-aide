import ListSection from "./ListSection";
import CreateContainerForm from "./CreateContainerForm";
import CreateItemForm from "./CreateItemForm";
import CreateToDoForm from "./CreateToDoForm";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function ListCard(props){

    const [allData, setAllData] = useState([]);
    const [addFormOpen, setAddFormOpen] = useState(false);

    const authorities = useContext(UserContext);

    const refreshContainerData = () => {
        fetch(`${authorities.url}/container/event/${props.eventId}`, {
            headers: {
            "Authorization": `Bearer ${authorities.user.token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setAllData(data))
     }

    const refreshToDos = () => {
        fetch(`${authorities.url}/todo/event/${props.eventId}`, {
                headers: {
                "Authorization": `Bearer ${authorities.user.token}`
                }
            })
            .then((response) => response.json())
            .then((data) => setAllData(data))
    }

    const refreshItems = () => {
        fetch(`${authorities.url}/item/container/${props.container.containerId}`, {
            headers: {
            "Authorization": `Bearer ${authorities.user.token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setAllData(data))
    }

     const refreshData = () => {
        if(props.listType === "containers"){
            refreshContainerData();
        } else if (props.listType === "toDos"){
            refreshToDos();
        } else if(props.listType === "items"){
            refreshItems();
        }
     }
useEffect( () => {
        if(authorities.user.token != null){
            refreshData()
        }
         
    }, []);

    return(
        <div className="card100">
            <div className="cardHeader">
                <h3 className="left-align">{props.listType === "containers" ? "Containers" : props.listType === "toDos" ? "ToDos" : props.container.containerName}</h3>
                <div className="right-align">
                <button onClick={() => setAddFormOpen(!addFormOpen)}>{!addFormOpen ? "Add icon" : "Cancel icon"}</button>
                {props.listType === "items" && <button onClick={() => {props.closeListItem(props.container.containerId)}}>close icon</button>}
                </div>
            </div>
            {props.listType === "toDos" 
            &&
            <>
            {addFormOpen && 
            <div className="formWrapper">
            <CreateToDoForm eventId={props.eventId} setAddFormOpen={setAddFormOpen} refreshData={refreshData}/>
            </div>
            }
            </>
            }
            {props.listType === "containers" 
            &&
            <>
            {addFormOpen && 
            <div className="formWrapper">
            <CreateContainerForm eventId={props.eventId} setAddFormOpen={setAddFormOpen} refreshData={refreshData}/>
            </div>
            }
            </>
            }
            {props.listType === "items" 
            &&
            <>
            {addFormOpen && 
            <div className="formWrapper">
            <CreateItemForm containerId={props.container.containerId} setAddFormOpen={setAddFormOpen} refreshData={refreshData}/>
            </div>
            }
            </>
            }
            <ListSection listItems={allData} eventId={props.eventId} refreshData={refreshData} listType={props.listType}/>
        </div>
    )
}