import EditIcons from "./EditIcons";

export default function ExpandingList(props) {

    // useEffect(props.refreshData, []);
    const past = props.past;
    const date = new Date;

    // Build Link to Event Specific Page


    return (
        <div>
            <h3 id="responsive-title">{props.text}</h3>
            <div>
                <div className="display-selected-card"> 
                </div>
                <div className="card-rows">{props.event.map((single) => {

                        let cardCSS = "move-card"
                        if (single.event_type === 1) {
                            cardCSS = "vacation-card"
                        }
                        return (
                            // onClick Function to take user to event specific page will be inserted into this div
                        <div className={cardCSS} >  
                            <p>{single.event_name}</p>
                            <p>{single.start_date} - {single.end_date}</p>
                            <EditIcons />
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
