import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import Landing from './layout/Landing';
import jwtDecode from 'jwt-decode';
import Nav from './layout/Nav';
import UserHome from './layout/UserHome';
import EventForm from './components/EventForm';
import Event from "./layout/Event";
import NotFound from "./layout/NotFound";
import Profile from "./layout/Profile";
import CardboardBox from "./components/CardboardBox";

function App() {

  // const url = "http://3.129.73.57:8080/api";
  // const authenticationUrl = "http://3.129.73.57:8080/api/authenticate";

  const url = "http://localhost:8080/api";
  const authenticationUrl = "http://localhost:8080/api/authenticate";

  const move = false;
  const vacation = true;
  const [user, setUser] = useState(null);
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
      }
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
  
  const refreshData = () => {
    if(user != null){
    fetch(`${url}/event/user/${user.userId}`, {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then((response) => response.json())
    .then((data) => setEvent(data))
    }
  }

  useEffect(refreshData, [user]);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      login(localStorage.getItem("userToken"));
    }
    setRestoreLoginAttemptCompleted(true);
  }, []);

  if(!restoreLoginAttemptCompleted){
    return (<div><CardboardBox /></div>)
  }
  return (
    <BrowserRouter>
    <UserContext.Provider value={authorities}>
      <Nav />
       <Routes>
         <Route path="/" element={<Landing authenticationUrl={authenticationUrl} event={event}/>} />
         <Route path="/userhome" element={<UserHome event={event} />} />
         <Route path="/createmove" element={<EventForm event={event} eventType={move} refreshData={refreshData}/>} />
         <Route path="/createvacation" element={<EventForm event={event} eventType={vacation} refreshData={refreshData}/>} />
         <Route path="/event/:id" element={<Event event={event} refreshData={refreshData}/>} />
         <Route path="/profile" element={<Profile />} />
         <Route path="*" element={<NotFound />} />
       </Routes>
       {/* <Footer /> */}
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
