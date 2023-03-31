import { useContext } from "react";
import { useState } from "react";
import UserContext from "../../contexts/UserContext";

export default function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [createMode, setCreateMode] = useState(false);

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
        // if(response.status >= 200 && response.status <= 300){
        //     const json = await response.json();
        // } else{
            
        // }
    }

    const handleSubmit = async(e) => {
        if(createMode){
            createUser();
        }
        e.preventDefault();
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
            window.localStorage.setItem("userToken", jwt_token);
        }
    };

    const switchCreateMode = () => {
        setCreateMode(!createMode)
        setUsername("");
        setPassword("");
    }

    return(
        <div id="loginCard">
            <h3>{createMode ? "Create an Account" : "Login"}</h3>
            <form onSubmit={handleSubmit}>
                <div class="inputSection">
                    <label htmlFor="usernameInput">Username:</label>
                    <input
                        class="loginInput"
                        id="usernameInput"
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div class="inputSection">
                <label htmlFor="passwordInput">Password:</label>
                <input
                    class="loginInput"
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