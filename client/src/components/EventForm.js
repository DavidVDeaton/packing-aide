import { useEffect, useState } from "react";
import Errors from "./Errors";
import LocationSearch from "./LocationSearch"; 
import { useNavigate } from "react-router-dom";

export default function EventForm(props) {

    let formTemplate;
    if(props.event === undefined) {
            formTemplate = {
            startDate: "",
            endDate: "",
            startLocation: "",
            endLocation: "",
        }
    } else {
        formTemplate = props.event;
    }


    const [formState, setFormState] = useState(formTemplate);
    const [errors, setErrors] = useState([]);
    const [selectStartPosition, setSelectStartPosition] = useState({})
    const [selectEndPosition, setSelectEndPosition] = useState({})

    useEffect(() => {
        setFormState(formTemplate);
    }, [props.event])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let method;
        let url;
        const navigate = useNavigate;
        if(props.event === undefined || props.eventId === undefined) {
            method = "POST";
            url = `${props.backendUrl}/event`;
        } else {
            method = "PUT";
            url = `${props.backendUrl}/event/${props.eventId}`;
        }
        const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
        <form onSubmit = {handleSubmit}>
            <Errors errors = {errors}/>
            
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

            <div>
                <label htmlFor = "startLocation-input">Start Location:</label>
                <LocationSearch selectPosition={selectStartPosition} setSelectPosition={setSelectStartPosition}/>
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
                <label htmlFor = "endLocation-input">End Location:</label>
                <LocationSearch selectPosition={selectEndPosition} setSelectPosition={setSelectEndPosition}/>
                {/* <input
                id = "endLocation-input"
                type = "text"
                value={formState.endLocation}
                onChange={(event) => {
                    setFormState({ ...formState, endLocation: event.target.value })
                }}
                /> */}
            </div>

            <div>
                <input type = "submit" value = "Submit"/>
            </div>

        </form>
    )


}