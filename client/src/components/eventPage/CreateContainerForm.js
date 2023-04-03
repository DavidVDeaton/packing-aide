import { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function CreateContainerForm(props){
 
    const containerTemplate = {
        parentContainerId : null,
        containerName: "",
        eventId: props.eventId
    }
    const [container, setContainer] = useState(containerTemplate);
    const [errors, setErrors] = useState([]);

    const authorities = useContext(UserContext);

    const submitContainer = async (event) => {
        event.preventDefault();
        const response = await fetch(`${authorities.url}/container`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authorities.user.token}`,
                    Accept: "application/json",
                },
                body: JSON.stringify(container)
            })
            if(response.status >= 200 && response.status < 300){
                props.refreshData();
                setContainer(containerTemplate);
                setErrors([]);
                props.setAddFormOpen(false);
            } else{
                const error = await response.json();
                setErrors(error);
            }
        }

    return(
        <form id="createContainerForm" onSubmit={submitContainer}>
            <div className="inputDiv">
            <label htmlFor="containerName">Container name</label>
            <input type="text" id="containerName" value={container.containerName} onChange={(e) => {setContainer({...container, containerName: e.target.value})}} />
            </div>
            <input type="submit" className="addItemButton" value="Create container"/>
        </form>
    )
}