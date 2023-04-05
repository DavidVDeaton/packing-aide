import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Login from "../components/landingPage/Login";
import About from "../components/landingPage/About";
import boxes from "../images/boxes.png"
import luggages from "../images/luggages.png";
import Features from "../components/landingPage/Features";
import ballon from "../images/pa-logo-ballon.png";

export default function Landing(props){
    
    return(
        <main id="landingPageContainer">
            <div className="">
                <img src={ballon} className="balloon" width="180" />
            </div>
            <section id="landingMainSection">
                <img src={boxes} id="boxImage" width="300" />
                <Login authenticationUrl={props.authenticationUrl}/>
                <img src={luggages} id="luggageImage" width="300" />
            </section>
            <section id="aboutContainer">
                <About />
            </section>
            <section id="featuresContainer">
                <Features />
            </section>
        </main>
    )
}