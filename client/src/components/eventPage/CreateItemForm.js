import { useContext, useEffect, useState } from "react"
import UserContext from "../../contexts/UserContext"
import CloseForm from "./CloseForm";
import Errors from "../Errors";
export default function CreateItemForm(props){

    const authorities = useContext(UserContext);
    let itemTemplate = undefined;
    if(props.itemToEdit === undefined){
        itemTemplate = {
            itemName: "",
            packStatus: false,
            quantity: 1,
            description: "",
            appUserId: authorities.user.userId,
            containerId: props.containerId
        }
        } else{
        itemTemplate = props.itemToEdit;
        }

    const [item, setItem] = useState(itemTemplate);
    const [errors, setErrors] = useState([])
    console.log(props.itemToEdit)
    const submitItem = async (event) => {
        event.preventDefault();

        let url = `${authorities.url}/item`;
        let method = "POST";

        if(props.itemToEdit !== undefined){
            url = `${authorities.url}/item/${props.itemToEdit.itemId}`
            method = "PUT" 
        }
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(item)
        })
       
        if(response.status >= 200 && response.status < 300){
            props.refreshData();
            CloseForm(props.itemToEdit, props.setAddFormOpen, props.setEditMode);
            setErrors([]);
            setItem(itemTemplate);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }
 

    return(
        <form id="createItemForm" onSubmit={submitItem}>
            <Errors errors={errors} />
            <div className="inputDiv">
            <label htmlFor="itemName">Item name:</label>
            <input type="text" id="itemName" value={item.itemName} onChange={(e) => {setItem({...item, itemName: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={item.description} onChange={(e) => {setItem({...item, description: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" value={item.quantity} onChange={(e) => {setItem({...item, quantity: e.target.value})}} />
            </div>
            <input type="submit" className="addItemButton" value={props.itemToEdit === undefined ? "Add item" : "Update"}/>
        </form>
    )
}