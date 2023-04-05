
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CreateToDoForm from "./CreateToDoForm";

export default function ToDo(props){

    const[editMode, setEditMode] = useState(false);
    const[checked, setChecked] = useState(false);
    const authorities = useContext(UserContext);

    const deletetoDo = () => {
       fetch(`${authorities.url}/todo/${props.toDo.toDoId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authorities.user.token}`
            }
        })
        .then(props.refreshData)
    }
    console.log(checked)
    props.toDo.toDoStatus = checked;
    return(
        <div className="listItemContainer">
            <div className="listItem">
                <div className="listItemText">
                    <div className="listItemTitle">
                    <h4 className="listItemName">{props.toDo.toDoName}</h4>
                    <p className="date">({props.toDo.toDoDate})</p>
                    </div>
                    <p className="listItemDescription">{props.toDo.toDoDescription}</p>
                </div>
                <div className="toDoButtons">
                <span className="listItemButton material-symbols-outlined" onClick={() => setChecked(!checked)}>{!checked ? "done" : "done_all"}</span>
                <span className="listItemButton material-symbols-outlined" onClick={() => setEditMode(!editMode)}> edit_note</span> 
                <span className="listItemButton material-symbols-outlined" onClick={deletetoDo}>delete</span>
                </div>
            </div>
            {editMode && <CreateToDoForm toDoToEdit={props.toDo} refreshData={props.refreshData} setEditMode={setEditMode}/>}
        </div>
    )
}