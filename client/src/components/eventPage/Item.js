import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext"
import CreateItemForm from "./CreateItemForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faCheckDouble, faMarker, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function Item(props){

    const[editMode, setEditMode] = useState(false);
    const[checked, setChecked] = useState(false);
    const authorities = useContext(UserContext);

    const deleteItem = () => {
       fetch(`${authorities.url}/item/${props.item.itemId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authorities.user.token}`
            }
        })
        .then(props.refreshData)
    }
    props.item.packStatus = checked;
    return(
        <div className="listItemWrapper">
            <div className="listItem">
                <span className="listItemButton checkIcon" onClick={() => setChecked(!checked)}>{!checked ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCheckDouble} />}</span>
                <div className="listItemText">
                    <div className="listItemTitle">
                    <h4 className="listItemName">{props.item.itemName}</h4>
                    <p className="quantity">(quantity:{props.item.quantity})</p>
                    </div>
                    <p className="listItemDescription">{props.item.description}</p>
                </div>
                <div className="multipleButtons">
                    <FontAwesomeIcon icon={faMarker} className="listItemButton editIcon" onClick={() => setEditMode(!editMode)}/> 
                    <FontAwesomeIcon icon={faTrash} className="listItemButton deleteIcon" onClick={deleteItem}/>
                </div>
            </div>
            {editMode && <CreateItemForm itemToEdit={props.item} refreshData={props.refreshData} setEditMode={setEditMode} />}
        </div>
    )
}