import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function ItemSearch (props) {

    const itemToDisplay = props.item;

    const [items, setItems] = useState([]);

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

    console.log(items);

    const [searchText, setSearchText] = useState("");


    const submitSearch = (searchText) => {

        for (let pop=0; pop<itemToDisplay.length; ) {
            itemToDisplay.pop();
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