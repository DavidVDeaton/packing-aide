import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Login from "../components/landingPage/Login";
import logo from "../images/pa-logo-transparent.png"
import Features from "../components/landingPage/Features";
import balloon from "../images/pa-logo-balloon.png";

export default function Landing(props){
    
    return(
        <main className="landingPageMain">
            <div>
                <img src={balloon} className="balloon" width="120" />
                <img src={balloon} className="balloon-two" width="130" />
            </div>
            <section className="landingMainSection">
                <div className="two-column-even-display">
                    <img src={logo} />
                    <Login authenticationUrl={props.authenticationUrl}/>
                    
                </div>
                <div className="taglineDiv">
                    <p className="question center-align">Business Trip?</p>
                    <p className="question center-align">Upcoming Move?</p>
                    <p className="tagline">Packing Aide is an all-in-one, inventory, itenerary, to-do-list, to aide your next move or trip.</p>
                </div>
            </section>
            <section className="featuresContainer">
                <Features />
            </section>
        </main>
    )
}