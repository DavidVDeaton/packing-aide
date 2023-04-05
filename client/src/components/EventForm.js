import { useEffect, useState, useContext } from "react";
import Errors from "./Errors";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";


export default function EventForm(props) {
    
    const authorities = useContext(UserContext);
    

    let formTemplate;
    if(props.eventFormEdit === undefined) {
            formTemplate = {
            startDate: "",
            endDate: "",
            startLocationId: "",
            startLocationType: "",
            endLocationId: "",
            endLocationType:"",
            appUserId: authorities.user.userId,
            eventName:"",
            eventType: props.eventType,
        }
    } else {
        formTemplate = props.eventFormEdit;
    }

    const [formState, setFormState] = useState(formTemplate);
    const [errors, setErrors] = useState([]);
    const [selectStartPosition, setSelectStartPosition] = useState({})
    const [selectEndPosition, setSelectEndPosition] = useState({})
    const navigate = useNavigate();


    // const authorities = useContext(UserContext);

    useEffect(() => {
        setFormState(formTemplate);    
    }, [props.event])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let method = "POST";
        let url = `${authorities.url}/event`;
        
        

        if(props.eventFormEdit !== undefined) {
            url = `${authorities.url}/event/${props.eventFormEdit.eventId}`
            method = "PUT"
            console.log(props.eventFormEdit.eventId)
        }
        // if(props.event === undefined || props.event.eventId === undefined) {
        //     method = "PUT";
        //     url = `${authorities.url}/event/${props.event.eventId}`;
        // }
        // setFormState({
        //     ...formState,
        //     startLocationId: selectStartPosition.osm_id,

        //   });

        //   setFormState({
        //     ...formState,
        //     endLocationId: selectEndPosition.osm_id,
        //   });


        //   console.log(selectStartPosition.osm_id)
        //   console.log(selectEndPosition.osm_id)
        //   console.log(formState)
    
        const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authorities.user.token}`
            },
            body: JSON.stringify(formState),
          });
          if (response.status >= 200 && response.status < 300) {
              let eventFormEdit = undefined;
            if(props.eventFormEdit === undefined) {
             let a = await response.json();
                eventFormEdit = a;
        } 
            console.log(eventFormEdit)
            props.refreshData();
            setFormState(formTemplate);
            setSelectStartPosition("");
            setSelectEndPosition("");
            setErrors([]);
            if(props.eventFormEdit === undefined) {
            navigate(`/event/${eventFormEdit.eventId}`);  
            } else {
                props.setEditEvent(false);
                navigate(`/event/${props.eventFormEdit.eventId}`)
            }
          } else {
            const errors = await response.json();
            setErrors(errors);
          }
    }
    

    return(
        <form id="eventForm" onSubmit = {handleSubmit}>
            {/* <Errors errors = {errors}/> */}
            
            <div id="eventName">
                <label htmlFor = "eventName-input">Event Name:</label>
                    <input
                    id = "eventName-input"
                    type = "text"
                    placeholder="add name"
                    value={formState.eventName}
                    onChange={(event) => {
                        setFormState({ ...formState, eventName: event.target.value })
                    }}
                    />
            </div>
        
            <div id="eventDates">
                <div>
                    <label htmlFor = "startDate-input">Start Date:</label>
                    <input
                    id = "startDate-input"
                    type = "date"
                    value={formState.startDate.toString()}
                    onChange={(event) => {
                        setFormState({ ...formState, startDate: event.target.value })
                    }}
                    />
                </div>

                <div>
                    <label htmlFor = "endDate-input">End Date:</label>
                    <input
                    id = "endDate-input"
                    type = "date"
                    value={formState.endDate.toString()}
                    onChange={(event) => {
                        setFormState({ ...formState, endDate: event.target.value })
                    }}
                    />
                </div>
            </div>
                    
            <div id="eventLocation">
                <div>
                    <label htmlFor = "startLocationId-input">Start Location:</label>
                    <LocationSearch selectPosition={selectStartPosition} setSelectPosition={setSelectStartPosition} selectStartPosition={selectStartPosition} setFormState={setFormState} formState={formState} locationType = "start"
                    placeholder = "search"/>
                </div>

                <div>
                    <label htmlFor = "endLocationId-input">End Location:</label>
                    <LocationSearch selectPosition={selectEndPosition} setSelectPosition={setSelectEndPosition} selectEndPosition={selectEndPosition} setFormState={setFormState} formState={formState} locationType = "end"/>
                </div>
            </div>

            <div id="eventFormSubmitButton">
                <input type = "submit" value = {props.eventFormEdit === undefined ? "AddEvent" : "Update"}/>
            </div>
        </form>
    )
}