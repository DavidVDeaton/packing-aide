import InternalNavCard from "../components/InternalNavCard";
import ExpandingList from "../components/ExpandingList";
import ItemSearchDiv from "../components/ItemSearchDiv";

export default function UserHome(props) {

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
                <ItemSearchDiv />
            </section>
            <section className="left-align">
                <ExpandingList event={props.event} text="Past Events" past="y" />
            </section>
            
        </main>
    )
}