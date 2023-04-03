import { useState } from "react"
import Container from "./Container"

export default function ListSection(props){
        const [editContainers, setEditContainers] = useState([]);
        //figure out how to update this array list to then display while also ensuring no more than 2 are allowed at a time
    return(
        <div className="listSection">
            <div id="firstOpenContainer"></div>
            <div id="firstOpenContainer"></div>
            {props.listItems.map((container) => {
                return(
                    <Container container={container} key={container.containerId} refreshContainerData={props.refreshContainerData} 
                    setEditContainers={setEditContainers}/>
                )
            })}
        </div>
    )
}