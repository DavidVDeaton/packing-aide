import ExpandingList from "../components/ExpandingList";
import EventItemSearch from "../components/EventItemSearch";
import ListCard from "../components/eventPage/ListCard"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListEvent from "../components/eventPage/ListEvent";

export default function Event(props) {

    const events = props.event;


    const params = useParams();

    let [editEvent, setEditEvent] = useState({});

    const eventToEdit = () => {
        for (let i=0; i < events.length; i++) {
            if (events[i].eventId === parseInt(params.id)) {
                setEditEvent(events[i]);
            }
        }
    }

    console.log(editEvent, events);

    useEffect(eventToEdit, [events]);

    const item = [];
    console.log(editEvent)
    return (
        <main>
            <section>
                <ListEvent editEvent={editEvent} eventId={params.id} refreshData = {props.refreshData}/>
            </section>

            <section className="left-align">
                <ListCard eventId={params.id} listType="toDos" eventType={eventToEdit.eventType}/>
            </section>
            <section className="center-align homeSearchSection">
                 <EventItemSearch event={editEvent} item={item} />
            </section>
            <section className="left-align" id="listCardSection">
                <ListCard eventId={params.id} listType="containers" eventType={eventToEdit.eventType}/>
            </section>
        </main>
    )
}