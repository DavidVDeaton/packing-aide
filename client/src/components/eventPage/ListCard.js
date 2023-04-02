import ListSection from "./ListSection";

export default function ListCard(){

    const createContainer = () => {
        
    }
    return(
        <div className="listCard">
            <div className="listCardHeader">
                <h3>props.listTitle</h3>
                <button onClick={createContainer}>Add icon</button>
            </div>
            <ListSection />
        </div>
    )
}