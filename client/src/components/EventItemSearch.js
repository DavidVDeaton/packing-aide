import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function ItemSearch (props) {

    const itemToDisplay = props.item;
    const event = props.event;

    const [items, setItems] = useState([]);
    const [containers, setContainers] = useState([]);
    const [searchText, setSearchText] = useState("");

    const displayObjects= [];
    let mainObjects = [{}];
    let temporaryContainerObject = {};
    let temporaryParentContainerObject = {};

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

    console.log(containers);

    for (let i=0; i<itemToDisplay.length; i++) {

        for (let j=0; j<containers.length; j++) {
            if (containers[j].containerId === itemToDisplay[i].containerId && 
                containers[j].eventId === event.eventId) {
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

        if (temporaryContainerObject === {}) {

            mainObjects[i] = {
                itemName: itemToDisplay[i].itemName,
                description: "Item not found. Please refine search.",
            }
        } else {
            mainObjects[i] = {
                itemName: itemToDisplay[i].itemName,
                description: itemToDisplay[i].description,
                containerName: temporaryContainerObject.containerName,
                parentName: temporaryParentContainerObject.containerName,
            }
        }
    
        displayObjects.push(mainObjects[i]);

    }

    const submitSearch = (searchText) => {

        fetch(`${url}/item/user/${id}`, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setItems(data));

        fetch(`${url}/container`, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setContainers(data));

        
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
            <h3>Item Search</h3>
            <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
            <button value="search" onClick={() => {submitSearch(searchText)}}>Search</button>
            <div className="card-rows">
                {displayObjects.map((item) => {
                    if (item.description === "Item not found. Please refine search.") {
                        return (
                            <div className="card100 three-column-in-card" >  
                                <p class="left-align">{item.itemName}</p>
                                <p class="left-align">{item.description}</p>
                                <p class="left-align"></p>
                            </div>
                        );
                    } else {
                        if (item.parentName === undefined) {
                            return (
                                <div className="card100 three-column-in-card" >  
                                    <p class="left-align">{item.itemName}</p>
                                    <p class="left-align">{item.description}</p>
                                    <p class="left-align">&gt; {item.containerName}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div className="card100 three-column-in-card" >  
                                    <p class="left-align">{item.itemName}</p>
                                    <p class="left-align">{item.description}</p>
                                    <p class="left-align">&gt; {item.parentName} &gt; {item.containerName}</p>
                                </div>
                            );
                        }
                    }
                })}
            </div>
        </div>
    )

}