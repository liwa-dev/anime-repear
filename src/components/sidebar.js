import React, { useEffect, useRef, useState } from "react";

export default function SideBar({ isPanelClose, setIsPanelClose }) {
const [isCooldown, setIsCooldown] = useState(false);


  useEffect(() => {
    const toggleSidebar = () => {
      if (!isCooldown) {
        setIsCooldown(true);

        const sideBar = document.querySelector(".sidebar");
        sideBar.classList.toggle("close");
        
        setIsPanelClose((prevIsPanelClose) => !prevIsPanelClose);
        document.querySelector('.toggle').style.opacity = '.5';

        setTimeout(() => {
          setIsCooldown(false);
          
          document.querySelector('.toggle').style.opacity = '1';
        }, 500); // Set cooldown duration in milliseconds
      }
    };

    const toggleButton = document.querySelector(".toggle");
    toggleButton.addEventListener("click", toggleSidebar);



    return () => {
      toggleButton.removeEventListener("click", toggleSidebar);
    };
  }, [isCooldown, setIsPanelClose]);

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   const modeText = document.querySelector(".mode-text");

  //   if (darkMode) {
  //     console.log("dark mode");
  //     body.classList.add("dark");
  //     modeText.innerText = "Light Mode";
  //   } else {
  //     console.log("light mode");
  //     body.classList.remove("dark");
  //     modeText.innerText = "Dark Mode";
  //   }

  //   // localStorage.setItem("darkMode", darkMode.toString());
  // }, [darkMode]);

  // Rest of the component code...
}
