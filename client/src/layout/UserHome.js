import InternalNavCard from "../components/InternalNavCard";
import ExpandingList from "../components/ExpandingList";
import ItemSearchDiv from "../components/ItemSearchDiv";
import { useContext } from "react";
import UserContext from '../contexts/UserContext';
import EditIcons from "../components/EditIcons";

export default function UserHome(props) {

    const user = useContext(UserContext);
    console.log(user);

    return (
        <main>
            <section>
                <div className="two-column-even-display">
                    <div className="left-align">
                        <h3>Welcome {user.user.username}</h3>
                    </div>
                    
                    <ItemSearchDiv event={props.event} />
                </div>
            </section>
            <section className="left-align">
                <ExpandingList event={props.event} text="Upcoming Events" past="n" />
            </section>
            {/* <section className="two-column-even-display">
                <InternalNavCard text="Plan a New Vacation" cardCSS="vacation-card-special card" eventType="vacation" />
                <InternalNavCard text="Plan a New Move" cardCSS="move-card-special card" eventType="move" />
            </section> */}
            <section className="left-align">
                <ExpandingList event={props.event} text="Past Events" past="y" />
            </section>
        </main>
    )
}