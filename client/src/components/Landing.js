import { useEffect } from "react";
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import Login from "./Login";

export default function Landing(props){
    const authorities = useContext(UserContext);
    
    return(
        <>
        <div>{props.event.map((event) => {
            return(
            <div>{event.eventName}</div>
            )
        })}
        </div>
        <Login authenticationUrl={props.authenticationUrl}/>
        </>
    )
}