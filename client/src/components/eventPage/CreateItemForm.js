import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"

export default function CreateItemForm(props){
    const authorities = useContext(UserContext);
    const itemTemplate = {
        itemName: "",
        packStatus: false,
        quantity: 1,
        description: "",
        appUserId: authorities.user.userId,
        containerId: props.containerId

    }
    const [item, setItem] = useState(itemTemplate);
    const [errors, setErrors] = useState([])

    const submitItem = async (event) => {
        event.preventDefault();
        const response = await fetch(`${authorities.url}/item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(item)
        })
        if(response.status >= 200 && response.status < 300){
            props.refreshData();
            setItem(itemTemplate);
            setErrors([]);
            props.setAddFormOpen(false);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }

    return(
        <form id="createItemForm" onSubmit={submitItem}>
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
            <input type="submit" className="addItemButton" value="Add item"/>
        </form>
    )
}