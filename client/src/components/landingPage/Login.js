import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [createMode, setCreateMode] = useState(false);

    const navigate = useNavigate();
    const authorities = useContext(UserContext);

    const createUser = async () => {
        const response = await fetch(`${authorities.url}/create_account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({username, password})
        })
        if(response.status >= 400 && response.status < 500){
            const error = await response.json();
            setErrors(error);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(createMode){
            await createUser();
        }        
        if(errors.length > 0){
            return;
        }
        const response = await fetch(`${props.authenticationUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({username, password}),
        });
        if(response.status === 403){
            setErrors(["User not found, try again"]);
        } else if(response.status === 200){
            const json = await response.json();
            const jwt_token = json.jwt_token;
            authorities.login(jwt_token);
            clearFields();
            navigate("/userhome");
            window.localStorage.setItem("userToken", jwt_token);
        }
    };

    const switchCreateMode = () => {
        setCreateMode(!createMode)
        clearFields();
    }   
    const clearFields = () => {
        setUsername("");
        setPassword("");
        setErrors([]);
    }
    return(
        <div id="loginCard">
            <h3>{createMode ? "Create an Account" : "Login"}</h3>
            <form onSubmit={handleSubmit}>
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
                <div id="loginButtons">
                <input type="submit" value={createMode ? "Create account" : "Log in"} />
                <a href="#" id="createLink" onClick={switchCreateMode}>{createMode ? "Login" : "Create an account"}</a>
                </div>
            </form>
        </div>
    )
}