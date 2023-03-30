import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import Login from './components/Login';
import jwtDecode from 'jwt-decode';


function App() {

  const url = "http://localhost:8080/api";
  const authenticationUrl = "http://localhost:8080/api/authenticate";

  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});

  const login = (token) => {
    const {sub: username, authorities: authoritiesString} = jwtDecode(token);

    const roles = authoritiesString.split(",");

    const user = {
      username,
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

  return (
    <div>hello</div>
    // <BrowserRouter>
    //   <NavBar />
    //   <Routes>
    //     <Route path="/" element={<Landing />} />
    //     <Route path="/userhome" element={<UserHome />} />
    //     <Route path="/createevent" element={<CreateEvent />} />
    //     <Route path="/event" element={<Event />} />
    //     <Route path="*" element={<NotFound />} />
    //   </Routes>
    //   <Footer />
    // </BrowserRouter>
  );
}

export default App;
