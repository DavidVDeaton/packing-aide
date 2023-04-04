import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext"
import CreateItemForm from "./CreateItemForm";

export default function Item(props){

    const[editMode, setEditMode] = useState(false);
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

    const editItem =() => {

    }
    return(
        <div className="itemContainer">
            <div className="item">
                <div className="itemText">
                <div className="itemTitle">
                <h4 className="itemName">{props.item.itemName}</h4>
                <p className="quantity">(quantity:{props.item.quantity})</p>
                </div>
                <p className="itemDescription">{props.item.description}</p>
                </div>
                <div className="itemButtons">
                <button onClick={() => setEditMode(!editMode)}>{!editMode ? "edit icon" : "cancel update"}</button> 
                <button onClick={deleteItem}>X</button>
                </div>
            </div>
            {editMode && <CreateItemForm itemToEdit={props.item} refreshData={props.refreshData} setEditMode={setEditMode} />}
        </div>
    )
}