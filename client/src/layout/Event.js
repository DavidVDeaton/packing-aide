import ExpandingList from "../components/ExpandingList";
import ItemSearchDiv from "../components/ItemSearchDiv";
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

    return (
        <main>
            <section className="two-column-even-display">
                {/* <ExpandingList events={editEvent} text={editEvent.eventName} /> */}
                <ItemSearchDiv />
            </section>
            <section className="left-align">
                {/* <ExpandingList text="ToDos" /> */}
            </section>
            <section className="left-align">
                {/* <ExpandingList text="Containers" /> */}
            </section>
        </main>
    )
}