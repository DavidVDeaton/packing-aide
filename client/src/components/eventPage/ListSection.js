import { useState } from "react"
import Container from "./Container"

export default function ListSection(props){

        const [editContainers, setEditContainers] = useState([]);
        //figure out how to update this array list to then display while also ensuring no more than 2 are allowed at a time
        
        if(editContainers.length === 3){
            editContainers.filter(container => {
                return()
            })
        }
    console.log(editContainers)
    return(
        <div className="listSection">
            {/* <div id="firstOpenContainer">{editContainers[0]}</div>
            <div id="secondOpenContainer">{editContainers[1]}</div> */}
            {props.listItems.map((container) => {
                return(
                    <Container container={container} key={container.containerId} refreshContainerData={props.refreshContainerData} editContainers={editContainers} setEditContainers={setEditContainers}/>
                )
            })}
        </div>
    )
}