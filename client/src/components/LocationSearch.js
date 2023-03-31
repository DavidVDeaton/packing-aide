import { useState, useEffect } from "react";


const URL = "https://nominatim.openstreetmap.org/search?";
    
export default function LocationSearch (props) {
    // const{ selectPosition, setSelectPosition } = useState(props);
    const[searchText, setSearchText] = useState("");
    const[locationList, setLocationList] = useState([]);
    useEffect(() => {
        setSearchText(props.selectPosition.display_name)
    }, [props.selectPosition])

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
                <button value="Search" onClick={() => {submitSearch()}}/>
            </div>
            <div>
                <ul>
                {locationList.map((location) => {
                    return(
                        <div key={location.osm_id}>
                            <button onClick={() => {
                                props.setSelectPosition(location)
                                setLocationList([])
                            }}></button>
                            {location.display_name}
                        </div>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}