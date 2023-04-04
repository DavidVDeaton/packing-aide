import ListSection from "./ListSection";
import CreateContainerForm from "./CreateContainerForm";
import CreateItemForm from "./CreateItemForm";
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
        } 
        if (props.listType === "todos"){
            refreshToDos();
        } 
        if(props.listType === "items"){
            refreshItems();
        }
     }
    useEffect( () => {
        // if(props.listType === "containers" && authorities.user.token != null){
        //     refreshContainerData();
        // } 
        // if(props.listType === "todos" && authorities.user.token != null){
        //     refreshToDos();
        // } 
        // if (props.listType ==="items" && authorities.user.token != null){
        //     refreshItems();
        // }
        if(authorities.user.token != null){
            refreshData()
        }
         
    }, [allData]);

    return(
        <div className="listCard">
            <div className="listCardHeader">
                <h3>{props.listType === "containers" ? "Containers" : props.listType === "todos" ? "ToDo's" : props.container.containerName}</h3>
                <div>
                <button onClick={() => setAddFormOpen(!addFormOpen)}>{!addFormOpen ? "Add icon" : "Cancel icon"}</button>
                {props.listType === "items" && <button onClick={() => {props.closeListItem(props.container.containerId)}}>close icon</button>}
                </div>
            </div>
            {props.listType === "Containers" 
            &&
            <>
            {addFormOpen && 
            <div className="formWrapper">
            <CreateContainerForm eventId={props.eventId} setAddFormOpen={setAddFormOpen} refreshData={refreshData}/>
            </div>
            }
            </>
            }
            {/* {toDoFormOpen && <CreateToDoForm eventId={props.eventId} setToDoFormOpen={setToDoFormOpen} />}
            <ListSection /> */}
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