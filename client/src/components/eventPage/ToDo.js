
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

    props.toDo.toDoStatus = checked;
    return(
        <div className="toDoContainer">
            <div className="toDo">
                <div className="toDoText">
                    <div className="toDoTitle">
                    <h4 className="toDoName">{props.toDo.toDoName}</h4>
                    <p className="quantity">({props.toDo.toDoDate})</p>
                    </div>
                    <p className="toDoDescription">{props.toDo.toDoDescription}</p>
                </div>
                <div className="toDoButtons">
                <button onClick={() => setChecked(!checked)}>check</button>
                <button onClick={() => setEditMode(!editMode)}>{!editMode ? "edit icon" : "cancel update"}</button> 
                <button onClick={deletetoDo}>X</button>
                </div>
            </div>
            {editMode && <CreateToDoForm toDoToEdit={props.toDo} refreshData={props.refreshData} setEditMode={setEditMode}/>}
        </div>
    )
}