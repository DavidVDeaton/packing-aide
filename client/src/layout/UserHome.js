import InternalNavCard from "../components/InternalNavCard";
import ExpandingList from "../components/ExpandingList";
import ItemSearch from "../components/ItemSearch";
import { useContext } from "react";
import UserContext from '../contexts/UserContext';
import EditIcons from "../components/EditIcons";

export default function UserHome(props) {

    const user = useContext(UserContext);
    console.log(user);
    const itemToDisplay = [];
    const params = 0;

    return (
        <main>
            <section className="left-align homeSection">
                <h3 className="welcome-heading">Welcome {user.user.username}</h3>    
            </section>
            <section className="center-align homeSearchSection">
                <ItemSearch event={props.event} params={params} item={itemToDisplay} />
            </section>
            <section className="left-align homeSection">
                <ExpandingList event={props.event} text="Upcoming Events" past="n" />
            </section>
            {/* <section className="two-column-even-display">
                <InternalNavCard text="Plan a New Vacation" cardCSS="vacation-card-special card" eventType="vacation" />
                <InternalNavCard text="Plan a New Move" cardCSS="move-card-special card" eventType="move" />
            </section> */}
            <section className="left-align homeSection">
                <ExpandingList event={props.event} text="Past Events" past="y" />
            </section>
        </main>
    )
}