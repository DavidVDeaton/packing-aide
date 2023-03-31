import { Link } from "react-router-dom";

export default function InternalNavCard(props) {
    const type = props.eventType;
    console.log(type);

    return (
        // <div className={props.cardCSS}>{props.text}</div>
        <Link to ="/createevent" eventType={type} className={props.cardCSS}>{props.text}</Link>
    )
}
