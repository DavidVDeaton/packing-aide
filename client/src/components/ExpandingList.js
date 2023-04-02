// import EditIcons from "./EditIcons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';

export default function ExpandingList(props) {

    // useEffect(props.refreshData, []);
    const past = props.past;
    const date = new Date;
    const events = props.event;

    let pastEvents = [];
    let futureEvents = [];
    let displayedEvents = [];

    for (let i = 0; i < events.length; i++) {

        let eventEndDate = new Date(events[i].endDate)

        if (date > eventEndDate) {
            pastEvents.push(events[i]) 
        } else {
            futureEvents.push(events[i])
        }
    }

    if (past === "y") {
        displayedEvents = pastEvents;
    } else {
        displayedEvents = futureEvents;
    }

    const navigate = useNavigate();

    const editEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    const url = useContext(UserContext);
    console.log(url.url);

    const deleteEvent = (eventId) => {

        fetch(`${url.url}/event/${eventId}`, { 
            method: "DELETE",
            headers: {
                  "Authorization": `Bearer ${url.user.token}`
            }})
        .then(navigate("/userhome"));
    }

    return (
        <div>
            <h3 className="">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>
                <div className="card-rows">{displayedEvents.map((event) => {

                        let cardCSS = "move-card card100 three-column-in-card"
                        if (event.eventType === false) {
                            cardCSS = "vacation-card card100 three-column-in-card"
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
                            <p class="left-align">{event.eventName}</p>
                            <p>{event.startDate} - {event.endDate}</p>
                            <div className="right-align">
                                <button onClick={() => {editEvent(event.eventId)}}>Edit</button>
                                <button onClick={() => {deleteEvent(event.eventId)}}>Delete</button>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
