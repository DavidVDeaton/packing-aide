import { Link } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";


export default function Nav(){
    const authorities = useContext(UserContext);

    return(
        <nav id="navbar">
            <h3 id="navTitle">Packing-Aide</h3>
            <div id="navButtonContainer">
                {authorities.user 
                ? 
                <>
                <Link to="/userhome" className="navButton">Home</Link>
                <Link to="/createMove" className="navButton">Start a Move</Link>
                <Link to="/createVacation" className="navButton">Start a Vacation</Link>
                <Link to="/profile" className="navButton">Profile</Link>
                <Link to="/" onClick={authorities.logout} className="navButton">Log Out</Link>
                </>
                :
                <a className="navButton" >About</a>
                }
            </div>
        </nav>
    )
}