import { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

export default function CreateContainerForm(props){
 
    const containerTemplate = {
        parentContainerId : 0,
        containerName: "",
        eventId: props.eventId
    }
    const [container, setContainer] = useState(containerTemplate)
    const [errors, setErrors] = useState([]);
    const authorities = useContext(UserContext);

    const submitContainer = async (event) => {
        event.preventDefault();
        const response = await fetch(`${authorities.url}/container`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(container)
            })
            if(response.status >= 200 && response.status < 300){
                props.refreshData();
                setContainer(containerTemplate);
                setErrors([]);
                props.setContainerFormOpen(false);
            } else{
                const error = await response.json();
                setErrors(error);
            }
    }

    return(
        <form id="createContainerForm" onSubmit={submitContainer}>
            <label htmlFor="containerName">Container name</label>
            <input type="text" id="containerName" value={container} onChange={(e) => {setContainer({...container, containerName: e.target.value})}} />
            <input type="submit" value="Create container" />
        </form>
    )
}