import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import EventForm from "../EventForm";


export default function ListEvent(props) {
    const [editEvent, setEditEvent] = useState(false);
    const authorities = useContext(UserContext);

    const beginDelete = () => {
        fetch(`${authorities.url}/event/${props.eventId}`, {method: "DELETE",
        headers: {
            Authorization: `Bearer ${authorities.user.token}`
        }
    })
        .then(props.refreshData);
    }


    


    return (
        <div>
            <div>Event: {props.editEvent.eventName}</div>
            <div>Start Date: {props.editEvent.startDate}</div>
            <div>End Date: {props.editEvent.endDate}</div>
            <div>Start Location: {props.editEvent.startLocationId}</div>
            <div>End Location: {props.editEvent.endLocationId}</div>
            <button onClick={() => setEditEvent(!editEvent)}>{!editEvent ? "edit" : "cancel update"}</button> 
            <button onClick={beginDelete}>Delete Event</button>
            {editEvent && <EventForm  eventFormEdit={props.editEvent} setEditEvent={setEditEvent} refreshData={props.refreshData} /> }
        </div>
    )
}