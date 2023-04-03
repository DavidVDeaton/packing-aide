import { useState, useEffect } from "react";


const URL = "https://nominatim.openstreetmap.org/search?";
    
export default function LocationSearch (props) {
    // const{ selectPosition, setSelectPosition } = useState(props);
    const[searchText, setSearchText] = useState("");
    const[locationList, setLocationList] = useState([]);
    
    useEffect(() => {
        setSearchText(props.selectPosition.display_name)
    }, [props.selectPosition])

    const submitSearch = (searchText) => {
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
                <input type="text" value={searchText} onChange={(e) => {submitSearch(e.target.value)}}/>
            </div>
            <div class="searchResult popUp">
                <ul>
                {locationList.map((location) => {
                    return(
                        <div key={location.osm_id} class = "hoverMe" onClick={() => {
                            props.setSelectPosition(location)
                            if(props.locationType === "start") {
                                props.setFormState({...props.formState, startLocationId: location.osm_id})
                            } else {
                                props.setFormState({...props.formState, endLocationId: location.osm_id})
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