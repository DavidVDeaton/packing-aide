import ItemSearch from "./ItemSearch";

export default function ItemSearchDiv(props) {

    const itemToDisplay = [];
    const params = 0;

    return (
        <div className="left-align">
            <h3>Item Search</h3>
            <div>
                <ItemSearch event={props.event} params={params} item={itemToDisplay} />
            </div>
        </div>
    )
}