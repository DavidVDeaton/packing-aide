import { useContext, useState } from "react";
import UserContext from '../contexts/UserContext';

export default function Profile() {

    const user = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordOld, setPasswordOld] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        // if(createMode){
        //     await createUser();
        // }        
        // if(errors.length > 0){
        //     return;
        // }
        // const response = await fetch(`${props.authenticationUrl}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Accept: "application/json",
        //     },
        //     body: JSON.stringify({username, password}),
        // });
        // if(response.status === 403){
        //     setErrors(["User not found, try again"]);
        // } else if(response.status === 200){
        //     const json = await response.json();
        //     const jwt_token = json.jwt_token;
        //     authorities.login(jwt_token);
        //     window.localStorage.setItem("userToken", jwt_token);
        //     clearFields();
        //     navigate("/userhome");
        // }
    };

    const updateUser = () => {

    }


    return (
        <main>
            <section className="left-align card100 three-column-in-card-right">
                <div className="width100">
                    <h3 className="left-align">Welcome {user.user.username}</h3>
                </div>
                <button>Edit Username or Password</button>
                <button onClick={user.logout}>Log out</button>
            </section>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="inputSection">
                        <label htmlFor="usernameInput">Username:</label>
                        <input
                            className="loginInput"
                            id="usernameInput"
                            value={user.user.username}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="inputSection">
                        <label htmlFor="passwordInput">New Password (Optional):</label>
                        <input
                            className="loginInput"
                            id="passwordInput"
                            value=""
                            type="password"
                            onChange={(e) => setPasswordNew(e.target.value)}
                        />
                    </div>
                    <div className="inputSection">
                        <label htmlFor="passwordInput">Old Password:</label>
                        <input
                            className="loginInput"
                            id="passwordInput"
                            value=""
                            type="password"
                            onChange={(e) => setPasswordOld(e.target.value)}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Update" onClick={updateUser} />
                    </div>
                    {/* {errors.map((error) => {
                            return(
                                <p>{error}</p>
                            )
                        })} */}
                    {/* <div id="loginButtons">
                    <input type="submit" value={createMode ? "Create account" : "Log in"} />
                    <a href="#" id="createLink" onClick={switchCreateMode}>{createMode ? "Login" : "Create an account"}</a>
                    </div> */}
                </form>
            </section>
        </main>
    )
}