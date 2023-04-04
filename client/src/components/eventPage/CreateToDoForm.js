 import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import CloseForm from "./CloseForm";
import Errors from "../Errors";
export default function ToDo(props){

//if one edit open, full width
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
    // const closeForm = () => {
    //     if(props.toDoToEdit === undefined){
    //         props.setAddFormOpen(false);
    //     } else{
    //         props.setEditMode(false);
    //     }
    // }
    return(
        <form id="createtoDoForm" onSubmit={submitToDo}>
            <Errors errors={errors} />
            <div className="inputDiv">
            <label htmlFor="toDoName">ToDo name:</label>
            <input type="text" id="toDoName" value={toDo.toDoName} onChange={(e) => {setToDo({...toDo, toDoName: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="toDoDate">Date:</label>
            <input type="date" id="toDoDate" value={toDo.toDoDate} onChange={(e) => {setToDo({...toDo, toDoDate: e.target.value})}} />
            </div>
            <div className="inputDiv">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={toDo.toDoDescription} onChange={(e) => {setToDo({...toDo, toDoDescription: e.target.value})}} />
            </div>
            <input type="submit" className="addtoDoButton" value={props.toDoToEdit === undefined ? "Add toDo" : "Update"}/>
        </form>
    )
}