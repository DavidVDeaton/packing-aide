import { useEffect, useState, useContext } from "react";
import Errors from "./Errors";
import LocationSearch from "./LocationSearch"; 
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";


export default function EventForm(props) {
    
    const authorities = useContext(UserContext);

    
    let formTemplate;
    // if(props.event === undefined) {
            formTemplate = {
            startDate: "",
            endDate: "",
            startLocationId: "",
            endLocationId: "",
            appUserId: authorities.user.userId,
            eventName:"",
            eventType: props.eventType,
        }
    // } else {
    //     formTemplate = props.event;
    // }


    const [formState, setFormState] = useState(formTemplate);
    const [errors, setErrors] = useState([]);
    const [selectStartPosition, setSelectStartPosition] = useState({})
    const [selectEndPosition, setSelectEndPosition] = useState({})



    // const authorities = useContext(UserContext);

    useEffect(() => {
        setFormState(formTemplate);    
    }, [props.event])


    const handleSubmit = async (event) => {
        event.preventDefault();
        let method;
        let url;
        const navigate = useNavigate;

   
        if(props.event === undefined || props.event.eventId === undefined) {
            method = "POST";
            url = `${authorities.url}/event`;
        } else {
            method = "PUT";
            url = `${authorities.url}/event/${props.event.eventId}`;
        }

        setFormState({
            ...formState,
            startLocationId: selectStartPosition.osm_id,

          });

          setFormState({
            ...formState,
            endLocationId: selectEndPosition.osm_id,
          });


          console.log(selectStartPosition.osm_id)
          console.log(selectEndPosition.osm_id)
        
    
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
            props.refreshData();
            setFormState(formTemplate);
            setErrors([]);
            navigate("/event");
          } else {
            const errors = await response.json();
            setErrors(errors);
          }
    }

    return(
        <form id="eventForm" onSubmit = {handleSubmit}>
            <Errors errors = {errors}/>
            
            <div id="eventName">
                <label htmlFor = "eventName-input">Event Name:</label>
                    <input
                    id = "eventName-input"
                    type = "text"
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
                    value={formState.startDate}
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
                    value={formState.endDate}
                    onChange={(event) => {
                        setFormState({ ...formState, endDate: event.target.value })
                    }}
                    />
                </div>
            </div>
                    
            <div id="eventLocation">
                <div>
                    <label htmlFor = "startLocationId-input">Start Location:</label>
                    <LocationSearch selectPosition={selectStartPosition} setSelectPosition={setSelectStartPosition} selectStartPosition={selectStartPosition} setFormState={setFormState} formState={formState} locationType = "start"/>
                    {/* <input
                    id = "startLocation-input"
                    type = "text"
                    value={formState.startLocation}
                    onChange={(event) => {
                        setFormState({ ...formState, startLocation: event.target.value })
                    }}
                    /> */}
                </div>

                <div>
                    <label htmlFor = "endLocationId-input">End Location:</label>
                    <LocationSearch selectPosition={selectEndPosition} setSelectPosition={setSelectEndPosition} selectEndPosition={selectEndPosition} setFormState={setFormState} formState={formState} locationType = "end"/>
                    {/* <input
                    id = "endLocation-input"
                    type = "text"
                    value={formState.endLocation}
                    onChange={(event) => {
                        setFormState({ ...formState, endLocation: event.target.value })
                    }}
                    /> */}
                </div>
            </div>

            <div id="eventFormSubmitButton">
                <input type = "submit" value = "Submit"/>
            </div>

        </form>
    )


}