import { useContext } from "react";
import { useState } from "react";
import UserContext from "../contexts/UserContext";

export default function Login(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const authorities = useContext(UserContext);

    const handleSubmit = async(e) => {
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

    return(
        <div id="loginCard">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usernameInput">Username:</label>
                    <input
                        id="usernameInput"
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor="passwordInput">Password:</label>
                <input
                    id="passwordInput"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                <input type="submit" value="Log in" />
                </div>
            </form>
        </div>
    )
}