import PalmTree from "../components/PalmTree";
import CardboardBox from "../components/CardboardBox";

export default function Footer(props) {

    if (props.eventType === false) {
        return (
            <footer className="box-footer">
                <CardboardBox />
            </footer>
        )
    } else {
        return (
            <footer className="palm-footer">
                <PalmTree />
            </footer>
        )
    }

}