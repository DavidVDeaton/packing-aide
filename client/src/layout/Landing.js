import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Login from "../components/landingPage/Login";
import About from "../components/landingPage/About";
import boxes from "../../images/boxes.png";
import luggages from "../../images/luggages.png";
import Features from "../components/landingPage/Features";

export default function Landing(props){
    const authorities = useContext(UserContext);
    
    return(
        <main id="landingPageContainer">
            <section id="landingMainSection">
                <img src={boxes} id="boxImage" width="300" />
                <Login authenticationUrl={props.authenticationUrl}/>
                <img src={luggages} id="luggageImage" width="300" />
            </section>
            <section className="aboutContainer">
                <About />
            </section>
            <section className="featuresContainer">
                <Features />
            </section>
        </main>
    )
}