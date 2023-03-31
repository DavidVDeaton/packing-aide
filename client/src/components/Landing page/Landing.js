import { useEffect } from "react";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import Login from "./Login";
import boxes from "../../images/boxes.png";
import luggages from "../../images/luggages.png";

export default function Landing(props){
    const authorities = useContext(UserContext);
    
    return(
        <main id="landingPageContainer">
            <section id="landingMainSection">
            <img src={boxes} id="boxImage" width="300" />
            <Login authenticationUrl={props.authenticationUrl}/>
            <img src={luggages} id="luggageImage" width="300" />
            </section>
            <section class="aboutContainer">

            </section>
            <section class="featuresContainer">

            </section>
        </main>
    )
}