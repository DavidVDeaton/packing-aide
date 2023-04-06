import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function ItemSearch (props) {

    const itemToDisplay = props.item;
    const events = props.event;

    const [items, setItems] = useState([]);
    const [containers, setContainers] = useState([]);
    const [searchText, setSearchText] = useState("");

    const displayObjects= [];
    let mainObjects = [{}];
    let temporaryContainerObject = {};
    let temporaryParentContainerObject = {};
    let temporaryEventObject = {};

    const user = useContext(UserContext);
    const id = user.user.userId;
    const url = user.url;
    const token = user.user.token;

    useEffect( () => {
        fetch(`${url}/item/user/${id}`, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setItems(data))
    }, []);


    useEffect( () => {
        fetch(`${url}/container`, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setContainers(data))
    }, []);
    
    for (let i=0; i<itemToDisplay.length; i++) {

        for (let j=0; j<containers.length; j++) {
            if (containers[j].containerId === itemToDisplay[i].containerId) {
                temporaryContainerObject = containers[j];
            }
        }

        if (temporaryContainerObject.parentContainerId != 0) {
            for (let k=0; k<containers.length; k++) {
                if (containers[k].containerId === temporaryContainerObject.parentContainerId) {
                    temporaryParentContainerObject = containers[k];
                }
            }
        }

        for (let l=0; l<events.length; l++) {
            if (events[l].eventId === temporaryContainerObject.eventId) {
                temporaryEventObject = events[l];
            }
        }

        console.log(temporaryEventObject);

        mainObjects[i] = {
            itemName: itemToDisplay[i].itemName,
            description: itemToDisplay[i].description,
            containerName: temporaryContainerObject.containerName,
            parentName: temporaryParentContainerObject.containerName,
            eventName: temporaryEventObject.eventName,
            eventStart: temporaryEventObject.startDate,
            eventEnd: temporaryEventObject.endDate,
            eventType: temporaryEventObject.eventType
        }

        displayObjects.push(mainObjects[i]);

    }
    
    const submitSearch = (searchText) => {
        
        for (let pop=0; pop<itemToDisplay.length; ) {
            itemToDisplay.pop();
        }

        for (let hop=0; hop<displayObjects.length; ) {
            displayObjects.pop();
        }

        for (let i=0; i<items.length; i++) {
            if (searchText.length>2){
                if (items[i].itemName.toUpperCase().includes(searchText.toUpperCase())) {
                    itemToDisplay.push(items[i]);
                    setSearchText("");
                }
            } else {
                if (items[i].itemName.toUpperCase()===searchText.toUpperCase()) {
                    itemToDisplay.push(items[i]);
                    setSearchText("");
                }
            }
        }

        const noItem = {
            itemName: searchText,
            description: "Item not found. Please refine search."
        }

        if (itemToDisplay.length < 1) {
            itemToDisplay.push(noItem);
            setSearchText("");
        }
    }

    return (
        <div>
            <div className="itemSearchDiv">
                <h3 className="subHeading">Item Search</h3>
                <input className="itemSearchInput" type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
                <input type="submit" value="Search" onClick={() => {submitSearch(searchText)}}/>
            </div>
            <div className="card-rows">
                {displayObjects.map((item) => {
                    if (item.description === "Item not found. Please refine search.") {
                        return (
                            <div className="three-column-in-card" >  
                                <p class="left-align highlight">{item.itemName}</p>
                                <p class="left-align">{item.description}</p>
                                <p></p>
                            </div>
                        );
                    }
                    else {
                        if (item.parentName === undefined) {
                            return (
                                <div className="three-column-in-card" >  
                                    <p class="left-align highlight">{item.itemName}</p>
                                    <p class="left-align">{item.description}</p>
                                    <p>{item.eventName} <span className="highlight">&gt;</span> {item.containerName}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div className="three-column-in-card" >  
                                    <p class="left-align highlight">{item.itemName}</p>
                                    <p class="left-align">{item.description}</p>
                                    <p>{item.eventName} <span className="highlight">&gt;</span> {item.parentName} <span className="highlight">&gt;</span> {item.containerName}</p>
                                </div>
                            );
                        }
                    }
                })}
            </div>
        </div>
    )
  
}