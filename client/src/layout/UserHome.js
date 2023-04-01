import InternalNavCard from "../components/InternalNavCard";
import ExpandingList from "../components/ExpandingList";

export default function UserHome(props) {
    // const events = [];

    // const event1 = {
    //     eventId: 1,
    //     eventName: "Event 1",
    //     eventType: false,
    //     startDate: ""
    // }

    return (
        <main>
            <section className="left-align">
                <ExpandingList event={props.event} text="Upcoming Events" past="n" />
            </section>
            <section className="two-column-even-display">
                <InternalNavCard text="Plan a New Vacation" cardCSS="vacation-card card" eventType="vacation" />
                <InternalNavCard text="Plan a New Move" cardCSS="move-card card" eventType="move" />
            </section>
            <section className="left-align">
                <ExpandingList event={props.event} text="Past Events" past="y" />
            </section>
            
        </main>
    )
}