import ItemSearch from "./ItemSearch";

export default function ItemSearchDiv(props) {

    const itemToDisplay = [];

    return (
        <div className="left-align">
            <h3>Item Search</h3>
            <div>
                <ItemSearch event={props.event} item={itemToDisplay} />
            </div>
        </div>
    )
}