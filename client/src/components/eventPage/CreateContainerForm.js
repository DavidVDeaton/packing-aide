import { useState } from "react"
import { useParams } from "react-router-dom";

export default function CreateContainerForm(){
    const params = useParams;
    console.log(params.id)
    const containerTemplate = {
        parentContainerId : 0,
        containerName: "",
        eventId: params.id
    }
    const [container, setContainer] = useState("")

    const submitContainer = () => {

    }

    return(
        <form id="createContainerForm" onSubmit={submitContainer}>
            <label htmlFor="containerName">Container name</label>
            <input type="text" id="containerName" value={container} onChange={(e) => {setContainer(e.target.value)}} />
            <input type="submit" value="Create container" />
        </form>
    )
}