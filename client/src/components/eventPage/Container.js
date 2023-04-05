import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
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
        .then(props.refreshData)
    }

    return(
        <div className="containerWrapper">
                <FontAwesomeIcon onClick={() => {setConfirmDelete(!confirmDelete)}} icon={!confirmDelete ? faTrash : faXmark} className="listItemButton deleteIconContainer"/>
            {!confirmDelete 
            ?
            <h3 className="containerName" onClick={() => {props.addToEditList(props.container)}}>{props.container.containerName}</h3>
            :
            <>
            <p>All items will be erased...</p>
            <button className="submitButton" onClick={deleteContainer}>Confirm Delete</button>
            </>
             }
        </div>
    )
}