import { useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import EventForm from "./EventForm";
import PalmTree from "../components/PalmTree";

export default function EditEvent(props) {
    const params = useParams;

    const [eventToEdit, setEventToEdit] = useState({});

    const findEventToEdit = () => {
        setEventToEdit (
            props.data.find((event) => event.id === parseInt(params.id))
        );
    }

    useEffect(findEventToEdit, [props.data]);

    // var elem = document.getElementById("box-drop")

    // window.onclick = function(){
    // document.body.removeChild(elem)
    // setTimeout(function(){
    //     document.body.prepend(elem)
    // }, 100)
    // }

    return(
        <section id="box-drop">
            <EventForm event={eventToEdit} refreshData = {props.refreshData}/>
            <PalmTree />
            {/* <div>
            <div>
                <div class="sc-bdVaJa hCqOlD">
                <div class="sc-bwzfXH biqWkE">
                    <div class="sc-htpNat kGQype">
                    <div class="sc-bxivhb sc-dnqmqq ZEDDw">
                        <div class="sc-iwsKbI ekMwXW"></div>
                        <div class="sc-gZMcBi fujrhZ"></div>
                        <div class="sc-gqjmRU jRAgJu"></div>
                        <div class="sc-VigVT gpuqLL"></div>
                    </div>
                    <div class="sc-bxivhb sc-ifAKCX kLAltZ"></div>
                    <div class="sc-bxivhb sc-EHOje gvPWuP"></div>
                    <div class="sc-bxivhb sc-bZQynM ldKBkL"></div>
                    <div class="sc-bxivhb sc-gzVnrw fFMyeM"></div>
                    <div class="sc-bxivhb sc-htoDjs crPZsS"></div>
                    </div>
                </div>
                </div>
            </div>
            </div> */}
        </section>
    )
}