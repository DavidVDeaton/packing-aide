import InternalNavCard from "../components/InternalNavCard";
import ExpandingList from "../components/ExpandingList";

export default function UserHome(props) {
    const event = props.event;

    return (
        <main>
            <section>
                <ExpandingList event={event} text="Upcoming Events" past="n" />
            </section>
            <section className="two-columns">
                <InternalNavCard text="Plan a New Vacation" cardCSS="vacation-card" />
                <InternalNavCard text="Plan a New Move" cardCSS="move-card" />
            </section>
            <section>
                <ExpandingList event={event} text="Past Events" past="y" />
            </section>
            
        </main>
    )
}