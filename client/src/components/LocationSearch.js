import { useState, useEffect } from "react";


const URL = "https://nominatim.openstreetmap.org/search?";
    
export default function LocationSearch (props) {
    const[searchText, setSearchText] = useState("");
    const[locationList, setLocationList] = useState([]);
    
    useEffect(() => {
        setSearchText(props.selectPosition.display_name)
    }, [props.selectPosition])

    const submitSearch = () => {
        const parameters = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            limit: 5
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
            <div className="locationSearchDiv">
                <input className="itemSearchInput" type="text" value={searchText} onChange={(e) => {setSearchText(e.target. value)}}/>
                <input type="button" className="blueSearchButton" value="Search" onClick={() => {submitSearch()}}/>
            </div>
            <div className="searchResult popUp">
                <ul class="locationPopUp">
                {locationList.map((location) => {
                    return(
                        <div key={location.osm_id} className="hoverMe" onClick={() => {
                            props.setSelectPosition(location)
                            if(props.locationType === "start") {
                                props.setFormState({...props.formState, startLocationId: location.osm_id, startLocationType: location.display_name})
                            } else {
                                props.setFormState({...props.formState, endLocationId: location.osm_id, endLocationType: location.display_name})
                            }
                                setLocationList([])

                        }}>
                            {location.display_name}
                        </div>
                    )
                })}
                </ul>
            </div>
        </div>
    )
}



// props.setSelectPosition(location)
// // props.setFormState({ ...props.formState, startLocationId: props.selectStartPositioncd })
// // props.setFormState({ ...props.formState, endLocationIdS: props.selectEndPosition})

// props.setFormState({ ...props.formState, startLocationId: location.osm_id, endLocationId: location.osm_id })

// if (props.isStartLocation) {
//     props.setFormState({
//         ...props.formState,
//         startLocationId: location.osm_id
//     });
//     } else {
//     props.setFormState({
//         ...props.formState,
//         endLocationId: location.osm_id
//     });
//     }
//   props.setSelectPosition(location);



// const { osm_id } = location;
// if (props.isStartLocation) {
//     props.setFormState({ ...props.formState, startLocationId: osm_id });
// } else {
//     props.setFormState({ ...props.formState, endLocationId: osm_id });
// }
// props.setSelectPosition(location);