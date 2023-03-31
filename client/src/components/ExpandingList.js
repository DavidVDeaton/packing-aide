import EditIcons from "./EditIcons";

export default function ExpandingList(props) {

    // useEffect(props.refreshData, []);
    const past = props.past;
    const date = new Date;
<<<<<<< HEAD
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
=======

    // Build Link to Event Specific Page

>>>>>>> ea36905c30b7ca600fff2f68242ef3eebbd33693

    return (
        <div>
            <h3 id="responsive-title">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>
<<<<<<< HEAD
                <div className="card-rows">{displayedEvents.map((event) => {

                        let cardCSS = "move-card"
                        if (event.event_type === 1) {
=======
                <div className="card-rows">{props.event.map((single) => {

                        let cardCSS = "move-card"
                        if (single.event_type === 1) {
>>>>>>> ea36905c30b7ca600fff2f68242ef3eebbd33693
                            cardCSS = "vacation-card"
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
<<<<<<< HEAD
                            <p>{event.event_name}</p>
                            <p>{event.start_date} - {event.end_date}</p>
=======
                            <p>{single.event_name}</p>
                            <p>{single.start_date} - {single.end_date}</p>
>>>>>>> ea36905c30b7ca600fff2f68242ef3eebbd33693
                            <EditIcons />
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> ea36905c30b7ca600fff2f68242ef3eebbd33693
