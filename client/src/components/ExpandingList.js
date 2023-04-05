// import EditIcons from "./EditIcons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

export default function ExpandingList(props) {

    const edit = <FontAwesomeIcon icon={faMarker} className="whiteIcon"/>
    const plus = <FontAwesomeIcon icon={faPlus} className="whiteIcon" />
    const trash = <FontAwesomeIcon icon= {faTrash} className="whiteIcon" />
    //console.log(props.refreshData);
    const past = props.past;
    const date = new Date;
    const [events, setEvents] = useState([props.event]);

    let pastEvents = [];
    let futureEvents = [];
    let displayedEvents = [];

    format (new Date(), 'do MMMM Y');

    for (let i = 0; i < events.length; i++) {

        events.sort((a, b) => (new Date(a.startDate)- new Date(b.startDate)));

        console.log(events);

        let eventEndDate = new Date(events[i].endDate)

        if (date > eventEndDate) {
            pastEvents.push(events[i]) 
        } else {
            futureEvents.push(events[i])
        }
    }

    if (past === "y") {
        displayedEvents = pastEvents
    } else {
        displayedEvents = futureEvents
    }

    const navigate = useNavigate();

    const editEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    const url = useContext(UserContext);
    //console.log(url.url);

    const deleteEvent = (eventId) => {

        fetch(`${url.url}/event/${eventId}`, { 
            method: "DELETE",
            headers: {
                  "Authorization": `Bearer ${url.user.token}`
            }})
        .then(refreshData, [])
        .then(navigate("/userhome"));
    }

    const refreshData = () => {
        fetch(`${url.url}/event/user/${url.user.userId}`, {
            headers: {
                "Authorization": `Bearer ${url.user.token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setEvents(data))
    }

    useEffect(refreshData, []);
  

    return (
        <div>
            <h3 className="section-heading">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>
                <div className="card-rows">{displayedEvents.map((event) => {

                        let cardCSS = "move-card card100 three-column-in-card-right";
                        let iconCSS = "icon icon-bg-move";
                        if (event.eventType === false) {
                            cardCSS = "trip-card card100 three-column-in-card-right";
                            iconCSS = "icon icon-bg-trip";
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
                            <p className="left-align highlight">{event.eventName}</p>
                            <p>{event.startDate} - {event.endDate}</p>
                            <div className="right-align">
                                <button className={iconCSS} onClick={() => {editEvent(event.eventId)}}>{edit}</button>
                                <button className={iconCSS} onClick={() => {deleteEvent(event.eventId)}}>{trash}</button>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
