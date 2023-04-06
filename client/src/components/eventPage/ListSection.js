import { useState } from "react"
import Container from "./Container"
import ToDo from "./ToDo";
import ListCard from "./ListCard";
import Item from "./Item";

export default function ListSection(props){

    const [editContainers, setEditContainers] = useState([]);

    const addToEditList = (container) => {
        const tempArray= [...editContainers]
        if(tempArray.includes(container)){
            return;
        }
        tempArray.push(container)
        if(tempArray.length === 3){
            tempArray.shift();
        }
        setEditContainers(tempArray);
    }
    
    const closeListItem = (id) => {
        const tempArray= [...editContainers] 
        const arrayToSave = tempArray.filter((container) => container.containerId !== id)
        setEditContainers(arrayToSave);
    }
     
    return(
        <div className={props.listType === "containers" ? "containerList scroll" :  "listWrapper scroll"}>
            <div className="editContainerWrapper">
                {editContainers !== undefined && 
                editContainers.map((container) => {
                    return(
                        <div className={editContainers.length === 2 ? "twoOpenContainers" : "oneOpenContainer"}>
                        <ListCard eventId={props.eventId} container={container} closeListItem={closeListItem} listType="items"/>
                        </div>
                    )
                })}
            </div>
            {props.listType === "toDos" 
            &&
            props.listItems.sort((a, b) => (new Date(a.toDoDate)-new Date(b.toDoDate)))
            .map((toDo) => {
                return(
                <ToDo toDo={toDo} key={toDo.toDoId} refreshData={props.refreshData} />
                )
            })}
            {props.listType === "containers" 
            &&
            props.listItems.map((container) => {
                return(
                    <Container container={container} key={container.containerId} refreshData={props.refreshData} addToEditList={addToEditList}/>
                )
            })}
            {props.listType === "items" 
            &&
            props.listItems.map((item) => {
                return(
                    <Item key={item.itemId} item={item} refreshData={props.refreshData} />
                )
            })
            }
        </div>
    )
}