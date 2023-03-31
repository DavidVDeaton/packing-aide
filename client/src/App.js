import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import Landing from './components/landingPage/Landing';
import jwtDecode from 'jwt-decode';
import UserHome from './layout/UserHome';
import EventForm from './components/EventForm';


function App() {

  const url = "http://3.135.185.195:8080/api";
  const authenticationUrl = "http://3.135.185.195:8080/api/authenticate";

  const [user, setUser] = useState({});
  const [event, setEvent] = useState([]);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  const login = (token) => {
    const {sub: username, app_user_id: userId, authorities: authoritiesString} = jwtDecode(token);

    const roles = authoritiesString.split(",");

    const user = {
      username,
      userId,
      roles,
      token,
      hasRole(role) {
        return this.roles.includes(role);
      },
    };

    console.log(user);

    setUser(user);

    return user; 
  }

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("userToken");
  };

  const authorities = {
    user: user ? {...user} : null,
    login,
    logout,
    url
  };

  console.log(event);
  
  const refreshData = () => {
    if(user != null){
    fetch(`${url}/event/user/${user.userId}`, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then((response) => response.json())
    .then((data) => setEvent(data))
    console.log(event);
  }
}

  useEffect(refreshData, [user]);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      login(localStorage.getItem("userToken"));
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  return (
    <BrowserRouter>
    <UserContext.Provider value={authorities}>
       {/* <NavBar /> */}
       <Routes>
         <Route path="/" element={<Landing authenticationUrl={authenticationUrl} event={event}/>} />
         <Route path="/userhome" element={<UserHome event={event} />} />
         <Route path="/createevent" element={<EventForm event={event} />} />
         {/* <Route path="/event" element={<Event />} />
         <Route path="*" element={<NotFound />} /> */}
       </Routes>
       {/* <Footer /> */}
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
