import { useState } from "react"

export default function CreateContainerForm(){
    const [containerName, setContainerName] = useState("")

    return(
        <form id="createContainerForm">
            <label htmlFor="containerName">Container name</label>
            <input type="text" id="containerName" value={containerName} onChange={(e) => {setContainerName(e.target.value)}} />
        </form>
    )
}