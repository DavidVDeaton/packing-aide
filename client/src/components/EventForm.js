import { useEffect, useState, useContext } from "react";
import Errors from "./Errors";
import LocationSearch from "./LocationSearch";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Footer from "../layout/Footer";
import balloon from "../images/pa-logo-balloon.png";

export default function EventForm(props) {
    
    const authorities = useContext(UserContext);
    let sectionTitle="Plan a Trip";

    if (props.eventType===false) {
        sectionTitle="Plan a Move";
    }
    
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
            setSelectStartPosition("");
            setSelectEndPosition("");
            setErrors([]);
            if(props.eventFormEdit === undefined) {
                const newEditEvent = await response.json();
                navigate(`/event/${newEditEvent.eventId}`);  
            } else {
                props.setEditEvent(false);
                navigate(`/event/${props.eventFormEdit.eventId}`)
            }
          } else {
            const error = await response.json();
            console.log(error)
            setErrors(error);
            
          }
    }
    
    return(
        <main className="eventFormMain">
            <div className="balloonDiv">
                <img src={balloon} className="balloon" width="120" />
                <img src={balloon} className="balloon-two" width="130" />
            </div>
            <section className="formSection">
                <h3 className="section-heading-black">{sectionTitle}</h3>
                <form className="eventForm" onSubmit = {handleSubmit}>
                    <Errors errors = {errors}/>
                    <div id="eventFormSubmitButton">
                        <input type = "submit" value = {props.eventFormEdit === undefined ? "Add Event" : "Update"}/>
                    </div>
                    <div className="eventName">
                        <label htmlFor = "eventName-input" className="subHeading-black">Event Name</label>
                            <input
                            id = "eventName-input"
                            className="itemSearchInput"
                            type = "text"
                            value={formState.eventName}
                            onChange={(event) => {
                                setFormState({ ...formState, eventName: event.target.value })
                            }}
                            />
                    </div>
                
                    <div className="two-column-even-display-sm-gap">
                        <div className="dateSearchDiv">
                            <label htmlFor = "startDate-input" className="subHeading-black">Start Date</label>
                            <input
                            id = "startDate-input"
                            className="itemSearchInput date-field"
                            type = "date"
                            value={formState.startDate.toString()}
                            onChange={(event) => {
                                setFormState({ ...formState, startDate: event.target.value })
                            }}
                            />
                        </div>

                        <div className="dateSearchDiv">
                            <label htmlFor = "endDate-input" className="subHeading-black">End Date</label>
                            <input
                            id = "endDate-input"
                            className="itemSearchInput date-field"
                            type = "date"
                            value={formState.endDate.toString()}
                            onChange={(event) => {
                                setFormState({ ...formState, endDate: event.target.value })
                            }}
                            />
                        </div>
                    </div>
                            
                    <div className="eventLocation">
                        <div className="locationSearchDisplay">
                            <label htmlFor = "startLocationId-input" className="subHeading-black padding-top-15">Start Location</label>
                            <LocationSearch selectPosition={selectStartPosition} setSelectPosition={setSelectStartPosition} selectStartPosition={selectStartPosition} setFormState={setFormState} formState={formState} locationType = "start"/>
                        </div>

                        <div className="locationSearchDisplay">
                            <label htmlFor = "endLocationId-input" className="subHeading-black padding-top-15">End Location</label>
                            <LocationSearch selectPosition={selectEndPosition} setSelectPosition={setSelectEndPosition} selectEndPosition={selectEndPosition} setFormState={setFormState} formState={formState} locationType = "end"/>
                        </div>
                    </div>


                </form>
            </section>
            <Footer eventType={props.eventType} />
        </main>

    )
}