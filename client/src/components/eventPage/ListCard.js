import ListSection from "./ListSection";
import CreateContainerForm from "./CreateContainerForm";
import { useState } from "react";

export default function ListCard(props){
    const [containerFormOpen, setContainerFormOpen] = useState(false);

    return(
        <div className="listCard">
            <div className="listCardHeader">
                <h3>props.listTitle</h3>
                <button onClick={() => setContainerFormOpen(!containerFormOpen)}>Add icon</button>
            </div>
            {containerFormOpen && <CreateContainerForm eventId={props.eventId} setContainerFormOpen={setContainerFormOpen} />}
            <ListSection />
        </div>
    )
}