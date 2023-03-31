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

    for (let i = 0; i < events.length(); i++) {

        if (date > events[i].end_date) {
            pastEvents.push(events[i]) 
        } else {
            futureEvents.push(events[i])
        }
    }

    if (past === "y") {
        displayedEvents = pastEvents;
    } else {
        displayedEvents = futureEvents;
    }

    return (
        <div>
            <h3 id="responsive-title">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>

                <div className="card-rows">{displayedEvents.map((event) => {

                        let cardCSS = "move-card"
                        if (event.event_type === 1) {

                            cardCSS = "vacation-card"
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
                            <p>{event.event_name}</p>
                            <p>{event.start_date} - {event.end_date}</p>
                            <EditIcons />
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

