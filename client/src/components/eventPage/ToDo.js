import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CreateToDoForm from "./CreateToDoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck, faCheckDouble, faMarker, faTrash} from "@fortawesome/free-solid-svg-icons";


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
        <div className="listItemWrapper">
            <div className="listItem">
            <span className="listItemButton checkIcon" onClick={() => setChecked(!checked)}>{!checked ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCheckDouble} />}</span>
                <div className="listItemText">
                    <div className="listItemTitle">
                    <h4 className="listItemName">{props.toDo.toDoName}</h4>
                    <p className="date">({props.toDo.toDoDate})</p>
                    </div>
                    <p className="listItemDescription">{props.toDo.toDoDescription}</p>
                </div>
                <div className="multipleButtons">
                <FontAwesomeIcon icon={faMarker} className="listItemButton editIcon" onClick={() => setEditMode(!editMode)}/>
                <FontAwesomeIcon icon={faTrash} className="listItemButton deleteIcon" onClick={deletetoDo}/>
                </div>
            </div>
            {editMode && <CreateToDoForm toDoToEdit={props.toDo} refreshData={props.refreshData} setEditMode={setEditMode}/>}
        </div>
    )
}