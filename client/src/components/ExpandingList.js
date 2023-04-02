import EditIcons from "./EditIcons";

export default function ExpandingList(props) {

    // useEffect(props.refreshData, []);
    const past = props.past;
    const date = new Date;
    const events = props.event;

    let pastEvents = [];
    let futureEvents = [];
    let displayedEvents = [];

    // Build Link to Event Specific Page
    console.log(date);
    console.log(events);


    for (let i = 0; i < events.length; i++) {

        let eventEndDate = new Date(events[i].endDate)

        if (date > eventEndDate) {
            pastEvents.push(events[i]) 
        } else {
            futureEvents.push(events[i])
        }
    }

    console.log(pastEvents);
    console.log(futureEvents);

    if (past === "y") {
        displayedEvents = pastEvents;
    } else {
        displayedEvents = futureEvents;
    }

    return (
        <div>
            <h3 className="">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>
                <div className="card-rows">{displayedEvents.map((event) => {

                        let cardCSS = "move-card card100 three-column-in-card"
                        if (event.eventType === false) {
                            cardCSS = "vacation-card card100 three-column-in-card"
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
                            <p class="left-align">{event.eventName}</p>
                            <p>{event.startDate} - {event.endDate}</p>
                            <EditIcons />
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
