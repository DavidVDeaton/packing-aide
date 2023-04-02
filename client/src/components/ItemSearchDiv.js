// import { useContext, useState } from "react";
// import UserContext from "../contexts/UserContext";
import ItemSearch from "./ItemSearch";

export default function ItemSearchDiv() {

    const itemToDisplay = [];

    return (
        <div className="left-align">
            <h3>Item Search</h3>
            <div>
                <ItemSearch item={itemToDisplay} />
            </div>
        </div>
    )
}



// if (itemToDisplay > 0) {
//     return (
//         <div>
//             <input type="text" value={searchText} onChange={(e) => {setSearchText(e.target.value)}}/>
//             <button value="search" onClick={() => {submitSearch(searchText)}}>Search</button>
//             <div className="card-rows">{itemToDisplay.map((item) => {
//                 return (
//                     <div className="card100" >  
//                         <p class="left-align">{item.itemName}</p>
//                         <p class="left-align">{item.description}</p>
//                     </div>
//                 );
//                 })}
//             </div>
//         </div>
//     )
// } else {