import { Link } from "react-router-dom"
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import logo from "../images/pa-logo-transparent.png";


export default function Nav(){
    const authorities = useContext(UserContext);

    return(
        <nav>
            <Link to="/" className="navButton">
                <img src={logo} alt="Packing Aide Logo" width="150"/>   
            </Link>
            {authorities.user 
            ? 
            <>
            <Link to="/userhome" className="navButton">Home</Link>

            <Link to="/createMove" className="navButton">Plan a Move</Link>

            <Link to="/createVacation" className="navButton">Plan a Trip</Link>
            {/* <Link to="/profile" className="navButton">Profile</Link> */}
            <Link to="/" onClick={authorities.logout} className="navButton">Log Out</Link>
            </>
            :
            <a className="navButton" >About</a>
            }
        </nav>
    )
}