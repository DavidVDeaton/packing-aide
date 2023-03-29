import { useState } from "react";

const URL = "https://nominatim.openstreetmap.org/?addressdetails=1&q=bakery+in+berlin+wedding&format=json&limit=1";
    
export default LocationSearch = () => {

    const[searchText, setSearchText] = useState("");
    const[locationList, setLocationList] = useState([]);

    const submitSearch = () => {
        const parameters = {
            q: searchText,
            format: "json",
            addressdetails: 1 
        };
        const queryString = new URLSearchParams(parameters).toString();

        fetch(`${URL}${queryString}`, {
            method: "GET",
            redirect: "follow"
        })
        .then((response) => response.text())
        .then((result) => {setLocationList(JSON.parse(result))})
    }
    
    return (
        <div>
            <div>
                <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
                <button value="Search" onClick={() => {submitSearch}}/>
            </div>
            <div>
                <ul>
                {locationList.map((location) => {
                    return(
                        <li key={location.osm_id}>{location.display_name}</li>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}