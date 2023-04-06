import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

export default function Login(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [createMode, setCreateMode] = useState(false);

    const navigate = useNavigate();
    const authorities = useContext(UserContext);

    const createUser = async (event) => {
        event.preventDefault();
        const response = await fetch(`${authorities.url}/create_account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({username, password})
        })
        if(response.status >= 200 && response.status < 300){
            handleSubmit();
        } else if(response.status >= 400 && response.status <= 500){
            const error = await response.json();
            setErrors(error);
        }
    }

    const handleSubmit = async(e) => {
        if(createMode === false){
        e.preventDefault();
        }
        
        const response = await fetch(`${props.authenticationUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({username, password}),
        });
       if(response.status >= 200 && response.status < 300){
            const json = await response.json();
            const jwt_token = json.jwt_token;
            authorities.login(jwt_token);
            window.localStorage.setItem("userToken", jwt_token);
            clearFields();
            setCreateMode(false);
            navigate("/userhome");
        } else if(response.status === 403){
            setErrors(["User not found, try again."])
        }
            else{
            const error = await response.json();
            console.log(error)
            setErrors(error);
        }  
    };

    const switchCreateMode = (e) => {
        e.preventDefault();
        setCreateMode(!createMode)
        clearFields();
    }   
    const clearFields = () => {
        setUsername("");
        setPassword("");
        setErrors([]);
    }
    return(
        <div className="loginCard">
            <h3 className="subHeading">{createMode ? "Create an Account" : "Login"}</h3>
            <form onSubmit={createMode ? createUser : handleSubmit}>
                <div className="inputSection">
                    <label htmlFor="usernameInput">Username:</label>
                    <input
                        className="loginInput"
                        id="usernameInput"
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="inputSection">
                <label htmlFor="passwordInput">Password:</label>
                <input
                    className="loginInput"
                    id="passwordInput"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                {errors.map((error) => {
                        return(
                            <p>{error}</p>
                        )
                    })}
                <div className="loginButtons">
                <input type="submit" value={createMode ? "Create Account" : "Login"} />
                <a href="#" className="createLink" onClick={switchCreateMode}>{createMode ? "Login" : "Create an account"}</a>
                </div>
            </form>
        </div>
    )
}