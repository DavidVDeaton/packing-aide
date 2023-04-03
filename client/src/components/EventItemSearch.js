import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function EventItemSearch (props) {

    // const itemToDisplay = props.item;
    const params = props.params
    const itemToDisplay = props.item;

    const [containers, setContainers] = useState([]);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

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
        fetch(`${url}/container/event/${params}`, {
            headers: {
            "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setContainers(data))
    }, []);

    console.log(items);

    const submitSearch = (searchText) => {

        for (let pop=0; pop<itemToDisplay.length; ) {
            itemToDisplay.pop();
        }

        for (let i=0; i<containers.length; i++) {
            for (let j=0; j<items.length; j++) {

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

    return (
        <div>
            <h3 className="left-align">Item Search</h3>
            <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
            <button value="search" onClick={() => {submitSearch(searchText)}}>Search</button>
            <div className="card-rows">{itemToDisplay.map((item) => {
                return (
                    <div className="card100" >  
                        <p class="left-align">{item.itemName}</p>
                        <p class="left-align">{item.description}</p>
                    </div>
                );
                })}
            </div>
        </div>
    )
  
}