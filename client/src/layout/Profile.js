import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from '../contexts/UserContext';


export default function Profile() {

    const user = useContext(UserContext.user);
    const url= useContext(UserContext.url);
    const [username, setUsername] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordOld, setPasswordOld] = useState("");

    // console.log(user.url);
    const navigate = useNavigate();
    // console.log(user);

    const handleAccountDeletion = () => {
        fetch(`${url}/delete_account/${user.userId}`, { 
            method: "DELETE",
            headers: {
                  "Authorization": `Bearer ${user.token}`
            }})
            .then(navigate("/"))
    }

    const updateUser = () => {

        fetch(`${url}/update_account/${user.userId}`, { 
            method: "PUT",
            headers: {
                  "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({username, passwordNew, passwordOld}),
        })
            .then(navigate("/"))
    }


    return (
        <main>
            <section className="left-align card100 three-column-in-card-right">
                <div className="width100">
                    <h3 className="left-align">Welcome {user.user.username}</h3>
                </div>
                <button>Edit Username or Password</button>
                <button onClick={handleAccountDeletion}>Delete Account</button>
            </section>
            <section>
                <form >
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

                </form>
            </section>
        </main>
    )
}