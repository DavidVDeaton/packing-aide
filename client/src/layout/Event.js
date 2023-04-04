import ExpandingList from "../components/ExpandingList";
import ItemSearchDiv from "../components/ItemSearchDiv";
import ListCard from "../components/eventPage/ListCard"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventItemSearch from "../components/EventItemSearch";
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

    // console.log(editEvent, events);

    useEffect(eventToEdit, [events]);

    const item = [];

    return (
        <main>
            <section>
                <ListEvent editEvent={editEvent} eventId={params.id} refreshData = {props.refreshData}/>
            </section>
            <section className="two-column-even-display">
                {/* <ExpandingList events={editEvent} text={editEvent.eventName} /> */}
                <EventItemSearch params={params.id} item={item} />
            </section>
            <section className="left-align">
                <ListCard eventId={params.id} listType="toDos"/>
            </section>
            <section className="left-align" id="listCardSection">
                <ListCard eventId={params.id} listType="containers"/>
            </section>
        </main>
    )
}