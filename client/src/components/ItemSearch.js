import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function ItemSearch (props) {

    const itemToDisplay = props.item;
    const events = props.event;

    console.log(events);

    const [items, setItems] = useState([]);
    const [containers, setContainers] = useState([]);

    const displayObjects= [];
        // {
        //     itemName: "itemToDisplay[i].itemName",
        //     description: "itemToDisplay[i].description",
        //     containerName: "temporaryContainerObject.containerName",
        //     parentName: "temporaryParentContainerObject.containerName",
        //     eventName: "temporaryEventObject.eventName",
        //     eventStart: "temporaryEventObject.startDate",
        //     eventEnd: "temporaryEventObject.endDate"
        // }

    // const events = [];

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

    console.log(items);
    console.log(containers);

    const [searchText, setSearchText] = useState("");
    let mainObjects = [{}];


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
                    // itemDisplay();
                }
            } else {
                if (items[i].itemName.toUpperCase()===searchText.toUpperCase()) {
                    itemToDisplay.push(items[i]);
                    setSearchText("");
                    // itemDisplay();
                }
            }
        }

        const noItem = {
            itemName: "No Item",
            description: "Please refine search."
        }

        if (itemToDisplay.length < 1) {
            itemToDisplay.push(noItem);
            setSearchText("");
        }
        
    }

    let temporaryContainerObject = {};
    let temporaryParentContainerObject = {};
    let temporaryEventObject = {};

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

        mainObjects[i] = {
            itemName: itemToDisplay[i].itemName,
            description: itemToDisplay[i].description,
            containerName: temporaryContainerObject.containerName,
            parentName: temporaryParentContainerObject.containerName,
            eventName: temporaryEventObject.eventName,
            eventStart: temporaryEventObject.startDate,
            eventEnd: temporaryEventObject.endDate
        }

        displayObjects.push(mainObjects[i]);
        console.log(displayObjects);
    }

    console.log(mainObjects);

    // const itemDisplay = () => {
    //     let temporaryContainerObject = {};
    //     let temporaryParentContainerObject = {};
    //     let temporaryEventObject = {};

    //     for (let i=0; i<itemToDisplay.length; i++) {

    //         for (let j=0; j<containers.length; j++) {
    //             if (containers[j].containerId === itemToDisplay[i].containerId) {
    //                 temporaryContainerObject = containers[j];
    //             }
    //         }

    //         if (temporaryContainerObject.parentContainerId != 0) {
    //             for (let k=0; k<containers.length; k++) {
    //                 if (containers[k].containerId === temporaryContainerObject.parentContainerId) {
    //                     temporaryParentContainerObject = containers[k];
    //                 }
    //             }
    //         }

    //         for (let l=0; l<events.length; l++) {
    //             if (events[l].eventId === temporaryContainerObject.eventId) {
    //                 temporaryEventObject = events[l];
    //             }
    //         }

    //         mainObjects[i] = {
    //             itemName: itemToDisplay[i].itemName,
    //             description: itemToDisplay[i].description,
    //             containerName: temporaryContainerObject.containerName,
    //             parentName: temporaryParentContainerObject.containerName,
    //             eventName: temporaryEventObject.eventName,
    //             eventStart: temporaryEventObject.startDate,
    //             eventEnd: temporaryEventObject.endDate
    //         }

    //         displayObjects.push(mainObjects[i]);
    //         console.log(displayObjects);
    //     }

    //     console.log(mainObjects);
    // }
    // console.log(displayObjects);

    return (
        <div>
            <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
            <button value="search" onClick={() => {submitSearch(searchText)}}>Search</button>
            <div className="card-rows">
                {displayObjects.map((item) => {
                    if (item.parentName === undefined) {
                        return (
                            <div className="card100 three-column-in-card" >  
                                <p class="left-align">{item.itemName}</p>
                                <p class="left-align">{item.description}</p>
                                <p>{item.eventName} {item.eventStart}-{item.eventEnd} &gt; {item.containerName}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div className="card100 three-column-in-card" >  
                                <p class="left-align">{item.itemName}</p>
                                <p class="left-align">{item.description}</p>
                                <p>{item.eventName} {item.eventStart}-{item.eventEnd} &gt; {item.parentName} &gt; {item.containerName}</p>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
  
}