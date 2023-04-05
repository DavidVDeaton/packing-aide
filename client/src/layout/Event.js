import ExpandingList from "../components/ExpandingList";
import EventItemSearch from "../components/EventItemSearch";
import ListCard from "../components/eventPage/ListCard"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

    return (
        <main>
            <section className="two-column-even-display">
                {/* <ExpandingList events={editEvent} text={editEvent.eventName} /> */}
                
            </section>
            <section className="left-align">
                <ListCard eventId={params.id} listType="toDos"/>
            </section>
            <section className="left-align" id="listCardSection">
                <EventItemSearch event={editEvent} item={item} />
                <ListCard eventId={params.id} listType="containers"/>
            </section>
        </main>
    )
}