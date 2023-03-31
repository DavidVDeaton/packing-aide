import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import EventForm from "./EventForm";

export default function EditEvent(props) {
    const params = useParams;

    const [eventToEdit, setEventToEdit] = useState({});

    const findEventToEdit = () => {
        setEventToEdit (
            props.data.find((event) => event.id === parseInt(params.id))
        );
    }

    useEffect(findEventToEdit, [props.data]);

    return(
        <EventForm 
        event={eventToEdit}
        // need URL here
        refreshData = {props.refreshData}/>
    )
}