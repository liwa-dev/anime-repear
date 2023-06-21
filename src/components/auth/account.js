import React, { useEffect, useState } from "react";
import "./account.css";
import Register from "./register";
import Login from "./login";

export default function Account() {


    useEffect(() => {
        const homeContainer = document.querySelector(".homebg");
        homeContainer.style.backgroundImage = "url('https://i.pinimg.com/originals/c1/ef/37/c1ef3728a33f7b934665efa04049c3f5.jpg')";
        homeContainer.style.backgroundSize = "cover";
      }, []);
      
    const [modeType, setType] = useState(false);

    const handleLoginClick = () => {
        setType(false);
    };

    const handleSignupClick = () => {
        setType(true);
    };

    return (
        <div className="bodySection">
                    <div className="homebg"></div>
            <div className="container-account">
                <h2
                    className={`account-text ${!modeType ? "account-select" : ""}`}
                    onClick={handleLoginClick}
                >
                    Login
                </h2>
                <h2
                    className={`account-text ${modeType ? "account-select" : ""}`}
                    onClick={handleSignupClick}
                >
                    Signup
                </h2>
                {modeType ? (<Register/>) : (<Login/>)}
            </div>
        </div>
    );
}
