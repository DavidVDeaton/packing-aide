import UserContext from "../contexts/UserContext";

export default function ListEvent(props) {
    const beginDelete = (eventId) => {
        fetch(`${props.backendUrl}/event/${props.event.eventId}`, {method: "DELETE"})
        .then(props.refreshData);
    }

    const authorities = useContext(UserContext);

    return (
        <div>
            <div>Event: {props.event.eventName}</div>
            <div>Start Date: {props.event.startDate}</div>
            <div>End Date: {props.event.endDate}</div>
            <div>Start Location: {props.event.startLocationId}</div>
            <div>End Location: {props.event.endLocationId}</div>
            <button onClick={() => {
                beginDelete(props.event.eventId)
            }}>Delete Event</button>
            <button>Edit Event</button>
        </div>
    )
}