 import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CloseForm from "./CloseForm";
import Errors from "../Errors";

export default function ToDo(props){

    const authorities = useContext(UserContext);

    let toDoTemplate = undefined;
    if(props.toDoToEdit === undefined){
        toDoTemplate = {
            toDoName: "",
            toDoDate: "",
            toDoDescription: "",
            toDoStatus: false,
            eventId: props.eventId
        }
        } else{
        toDoTemplate = props.toDoToEdit;
        }

    const [toDo, setToDo] = useState(toDoTemplate);
    const[errors, setErrors] = useState([]);


    const submitToDo = async (event) => {
        event.preventDefault();

        let url = `${authorities.url}/todo`;
        let method = "POST";

        if(props.toDoToEdit !== undefined){
            url = `${authorities.url}/todo/${props.toDoToEdit.toDoId}`
            method = "PUT" 
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authorities.user.token}`,
                Accept: "application/json",
            },
            body: JSON.stringify(toDo)
        })
    
        if(response.status >= 200 && response.status < 300){
            props.refreshData();
            CloseForm(props.toDoToEdit, props.setAddFormOpen, props.setEditMode);
            setErrors([]);
            setToDo(toDoTemplate);
        } else{
            const error = await response.json();
            setErrors(error);
        }
    }

    return(
        <form className="add-form" onSubmit={submitToDo}>
            {errors.length > 0 && <Errors errors={errors} />}
            <div className="inputDiv">
            <label htmlFor="toDoName" className="label">ToDo name:</label>
            <input type="text" className="input" id="toDoName" value={toDo.toDoName} onChange={(e) => {setToDo({...toDo, toDoName: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="toDoDate" className="label">Date:</label>
            <input type="date" className="input"  id="toDoDate" value={toDo.toDoDate} onChange={(e) => {setToDo({...toDo, toDoDate: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="description" className="label" >Description:</label>
            <input type="text" className="input" id="description" value={toDo.toDoDescription} onChange={(e) => {setToDo({...toDo, toDoDescription: e.target.value})}} />
            </div>
            <div className="submitButtonDiv">
            <button className="submitButton" type="submit" >{props.toDoToEdit === undefined ? "Create" : "Update"}</button>
            </div>
        </form>
    )
}