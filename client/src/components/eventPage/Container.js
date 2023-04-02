import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"

export default function Container(props){

    const [confirmDelete, setConfirmDelete] = useState(false);

    const authorities = useContext(UserContext);

    const deleteContainer = () => {
       fetch(`${authorities.url}/container/${props.container.containerId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authorities.user.token}`
            }
        })
        .then(props.refreshContainerData)
    }

    return(
        <div className="container" onClick={() => {props.setEditContainers(props.container)}}>
            <div className="containerButtons">
            <button onClick={() => {setConfirmDelete(!confirmDelete)}}>{!confirmDelete ? "delete icon" : "cancel icon"}</button>
            </div>
            {!confirmDelete 
            ?
            <h3 className="containerName">{props.container.containerName}</h3>
            :
            <>
            <p >If you haven't moved the items inside, deleting this container will delete all items as well. Are you sure you want to delete?</p>
            <button onClick={deleteContainer}>delete icon</button>
            </>
             }
        </div>
    )
}