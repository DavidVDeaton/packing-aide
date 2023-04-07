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
        <div className="center-align">
            <div>
                <h3 className="welcome-heading">{props.editEvent.eventName}</h3>
                <p><span className="subHeading-black">Date:</span> {props.editEvent.startDate} -&gt; {props.editEvent.endDate}</p>
            </div>
            <div>
                <p><span className="subHeading-black">Start Location:</span> {props.editEvent.startLocationType}</p>
                <p><span className="subHeading-black">End Location:</span> {props.editEvent.endLocationType}</p>
            </div>

            <div>
                <button className="blueSearchButton margin-right-10" onClick={() => setEditEvent(!editEvent)}>{!editEvent ? "Edit" : "Cancel Update"}</button>
                {!deleteEvent 
                ? <button className="blueSearchButton" onClick={() => setDeleteEvent(!deleteEvent)}>Delete</button> 
                :   <div>
                        <button className="redSearchButton" onClick={beginDelete}>Confirm Delete</button>
                        <button className="graySearchButton" onClick={() => setDeleteEvent(false)}>Cancel</button>
                    </div>}
                {editEvent && <EventForm eventFormEdit={props.editEvent} setEditEvent={setEditEvent} refreshData={props.refreshData} />}
            </div>

        </div>
    );
}
