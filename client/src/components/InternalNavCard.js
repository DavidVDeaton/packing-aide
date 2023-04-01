import { Link } from "react-router-dom";

export default function InternalNavCard(props) {
    const type = props.eventType;
    console.log(type);
    let linkTo = "/createvacation";

    if (type==="move") {
        linkTo = "/createmove";
    }

    return (
        <Link to ={linkTo} eventType={type} className={props.cardCSS}>{props.text}</Link>
    )
}
