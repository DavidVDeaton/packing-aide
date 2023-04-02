import { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
    
export default function ItemSearch (props) {

    const itemToDisplay = props.item;

    const user = useContext(UserContext);
    const id = user.user.userId;

    const url = user.url;
    const token = user.user.token;

    const [items, setItems] = useState([]);

    const refreshData = () => {

        fetch(`${url}/item/user/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => setItems(data))
    }

    useEffect(refreshData, []);

    console.log(items);

    const [searchText, setSearchText] = useState("");

    const submitSearch = (searchText) => {

        for (let pop=0; pop<itemToDisplay.length; ) {
            itemToDisplay.pop();
        }

        if (searchText.length > 2) {
            for (let i=0; i<items.length; i++) {
                if (items[i].itemName.toUpperCase().includes(searchText.toUpperCase())) {
                    itemToDisplay.push(items[i]);
                    setSearchText("");
                }
            }
        } else {
            for (let i=0; i<items.length; i++) {
                if (items[i].itemName.toUpperCase() === searchText.toUpperCase()) {
                    itemToDisplay.push(items[i]);
                    setSearchText("");
                }
            }
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