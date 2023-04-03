import { useContext } from "react"
import UserContext from "../../contexts/UserContext"

export default function Item(props){

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
    
    return(
        <div className="item">
            <div className="itemText">
            <div className="itemTitle">
            <h4 className="itemName">{props.item.itemName}</h4>
            <p className="quantity">(quantity:{props.item.quantity})</p>
            </div>
            <p className="itemDescription">{props.item.description}</p>
            </div>
            <div className="itemButtons">
            <button onClick={deleteItem}>X</button>
            </div>
        </div>
    )
}