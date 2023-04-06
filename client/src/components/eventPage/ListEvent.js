import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import EventForm from "../EventForm";
import { useNavigate } from "react-router-dom";

export default function ListEvent(props) {
    const [editEvent, setEditEvent] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState(false);
    const authorities = useContext(UserContext);
    const navigate = useNavigate();

    const beginDelete = async () => {
        try {
            const response = await fetch(`${authorities.url}/event/${props.eventId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authorities.user.token}`
                }
            });
            props.refreshData();
            navigate("/userhome");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>Event: {props.editEvent.eventName}</div>
            <div>Start Date: {props.editEvent.startDate}</div>
            <div>End Date: {props.editEvent.endDate}</div>
            <div>Start Location: {props.editEvent.startLocationType}</div>
            <div>End Location: {props.editEvent.endLocationType}</div>
            <button onClick={() => setEditEvent(!editEvent)}>{!editEvent ? "Edit" : "Cancel Update"}</button>
            {!deleteEvent 
            ? <button onClick={() => setDeleteEvent(!deleteEvent)}>Delete</button> 
            :   <div>
                    <button onClick={beginDelete}>Confirm Delete</button>
                    <button onClick={() => setDeleteEvent(false)}>Cancel</button>
                </div>}
            {editEvent && <EventForm eventFormEdit={props.editEvent} setEditEvent={setEditEvent} refreshData={props.refreshData} />}
        </div>
    );
}
