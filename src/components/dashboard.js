import React, { useEffect, useState, useRef } from "react";
import { Link, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./home";
import Movies from "./movies";
import TVSeries from "./tvseries";
import RecentlyAdded from "./recentlyadded";
import TopAnimes from "./topanimes";
import SearchPage from "./searchpage";
import Watch from "./watch/watch";
import Error from "./page_not_found/notfound";
import "./notificaiton/notif.css";
import { closeNotification, closeToast, openNotification } from "./notificaiton/notif-system";
import { useAuthUser, useSignOut } from 'react-auth-kit'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import guestAvatar from './imgs/guest.png';


import "./dashboard.css";
// Colors
import "./colors.css";
import debounce from "lodash.debounce";
import { Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Account from "./auth/account";
import SearchInput from "./searchInput";
import SideBar from "./sidebar";
import MenuLogin from "./menulogin";
export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState("home");
  const [activeSearch, setActiveSearch] = useState(false);
  const [isPanelClose, setIsPanelClose] = useState(false);
  const darkMode = useRef(null);
  const lastTypedValueRef = useRef('');

  const location = useLocation();

  // useEffect(() => {
  //   setActiveCategory("home");
  // }, [])

  useEffect(() => {
    const path = location.pathname;
    if (path === "/topanimes") {
      setActiveCategory("topanimes");
    } else if (path === "/movies") {
      setActiveCategory("movies");
    } else if (path === "/tvseries") {
      setActiveCategory("tvseries");
    } else if (path === "/recentlyadded") {
      setActiveCategory("recentlyadded");
    } else if (path === "/home") {
      setActiveCategory("home");
    } else if (path === "/account") {
      setActiveCategory("account");
    } else if (path ==="/search") {
      setActiveCategory("search");
    }
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 9) {
        // check if the key pressed is Tab
        e.preventDefault(); // prevent the default behavior of the Tab key
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const body = document.querySelector("body"),
      sideBar = document.querySelector(".sidebar"),
      toggle = document.querySelector(".toggle"),
      searchBtn = document.querySelector(".search-box"),
      modeText = document.querySelector(".mode-text"),
      effecttextmsg = document.querySelector(".effecttextmsg");




      const modeSwitch = document.querySelector(".toggle-switch");
      modeSwitch.addEventListener("click", () => {
        document.body.classList.toggle("dark");
      });



    searchBtn.addEventListener("click", () => {
      sideBar.classList.remove("close");
      setIsPanelClose(false);
      // effecttextmsg.classList.remove("scalemsglow");
    });

    toggle.addEventListener("click", () => {
      // sideBar.classList.toggle("close");
       effecttextmsg?.classList?.toggle("scalemsglow");
    });
    // const container = document.querySelector(".containerDashboard");
    // container.classList.add('container-animation-up');


    sideBar.classList.add("sidebar-startup");
  }, []);
  
  
  
  
  // Check if is logged in

  const [isCategorySet, setIsCategorySet] = useState(false);

  const auth = useAuthUser()

  useEffect(() => {
    if (auth()?.user && !isCategorySet) {
      console.log("You're Logged in we move you home page!");
      setActiveCategory("home");
      setIsCategorySet(true);
    }
  }, [auth,isCategorySet]);
  
  const signOut = useSignOut();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //END


  const handleSearch = (searchValue) => {
    // Handle the search functionality here
    console.log("Searching for: " + searchValue);
    // Additional logic...
  };
  

  const handleCategoryClick = (category) => {
    if (category === activeCategory) return false;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const secondLi = document.querySelectorAll(".textPath li")[1];
    if (secondLi) {
      secondLi.style.display = "none";
    }
    const titleAnime = document.querySelectorAll(".textPath li")[2];
    if (titleAnime) {
      titleAnime.style.display = "none";
      titleAnime.textContent = "";
    }
    closeNotification();
    closeToast();
    setActiveCategory(category);
  };


  const getCategoryText = () => {
    console.log(activeCategory);
    if (activeCategory === "home") return "Home";
    if (activeCategory === "topanimes") return "Top Animes";
    if (activeCategory === "movies") return "Movies";
    if (activeCategory === "tvseries") return "TV Series";
    if (activeCategory === "recentlyadded") return "Recently Added";
    if (activeCategory === "account") return "Account";
    if (activeCategory === "search") return "Search";

    return "Home";
  };
  const categoryText = getCategoryText();


  return (
    <div className="containerDashboard">
      <SideBar isPanelClose={isPanelClose} setIsPanelClose={setIsPanelClose}/>
      <nav className="sidebar">
        <header>
          <div className="image-text">
            <span className="image">
              <div className="logoImage"></div>
            </span>
            {/* <div className="text header-text">
              <span className="name">Liwa</span>
              <span className="profession">Web developer</span>
            </div> */}
          </div>

          <i className="bx bx-chevron-right toggle"></i>
        </header>
        {auth()?.user ? (
          <>
          <ul className="menuAvatar">
            <li>
            <img src={guestAvatar} className="avatarGuest menubar"></img>
            </li>
            {isPanelClose ? (
              <></>
              ) : (
              
            <li>
            <span className={`effecttextmsg`}>{auth().user}
            </span>
            </li>
            )}



          </ul>
          </>
        ) : (
          <></>
        )}

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <SearchInput isPanelClose={isPanelClose} handleSearch={handleSearch} setActiveSearch={setActiveSearch} handleCategoryClick={handleCategoryClick}></SearchInput>
            </li>
            <ul className="menu-links">
              {activeCategory === "home" ? (
                <li className="nav-link">
                  <Link to="#" className="aHref">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Home</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-link">
                  <Link
                    to="/dashboard/home"
                    className="aHref"
                    onClick={() => {
                      handleCategoryClick("home");
                    }}
                  >
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Home</span>
                  </Link>
                </li>
              )}

              {activeCategory === "movies" ? (
                <li className="nav-link">
                  <Link to="#" className="aHref">
                    <i className="bx bx-movie icon"></i>
                    <span className="text nav-text">Movies</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-link">
                  <Link
                    to="/dashboard/movies"
                    className="aHref"
                    onClick={() => handleCategoryClick("movies")}
                  >
                    <i className="bx bx-movie icon"></i>
                    <span className="text nav-text">Movies</span>
                  </Link>
                </li>
              )}

              {activeCategory === "tvseries" ? (
                <li className="nav-link">
                  <Link to="#" className="aHref">
                    <i className="bx bx-tv icon"></i>
                    <span className="text nav-text">TV Series</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-link">
                  <Link
                    to="/dashboard/tvseries"
                    className="aHref"
                    onClick={() => handleCategoryClick("tvseries")}
                  >
                    <i className="bx bx-tv icon"></i>
                    <span className="text nav-text">TV Series</span>
                  </Link>
                </li>
              )}

              {activeCategory === "recentlyadded" ? (
                <li className="nav-link">
                  <Link to="#" className="aHref">
                    <i className="bx bxs-meteor icon"></i>
                    <span className="text nav-text">Recently Added</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-link">
                  <Link
                    to="/dashboard/recentlyadded"
                    className="aHref"
                    onClick={() => handleCategoryClick("recentlyadded")}
                  >
                    <i className="bx bxs-meteor icon"></i>
                    <span className="text nav-text">Recently Added</span>
                  </Link>
                </li>
              )}

              {activeCategory === "topanimes" ? (
                <li className="nav-link">
                  <Link to="#" className="aHref">
                    <i className="bx bx-objects-vertical-top icon"></i>
                    <span className="text nav-text">Top Animes</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-link">
                  <Link
                    to="/dashboard/topanimes"
                    className="aHref"
                    onClick={(e) => {
                      handleCategoryClick("topanimes");
                    }}
                  >
                    <i className="bx bx-objects-vertical-top icon"></i>
                    <span className="text nav-text">Top Animes</span>
                  </Link>
                </li>
              )}


            </ul>
            <li className="mode">
              <div className="moon-sun">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>

              <span className="mode-text text">Dark Mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="textPath">
          <ol className="itemsPath">
            <li>
              <Link
                to={`/dashboard/${activeCategory}`}
                className="hre"
                onClick={(e) => {
                  //e.preventDefault();
                }}
              >
                {categoryText}
              </Link>
            </li>
            {/* {WATCH} ELEMENT */}
            <li></li>
            {/* {ANIMETITLE} ELEMENT */}
            <li></li>
          </ol>
          {auth()?.user ?
                  (
                    
                    <div className="logged-in-menu">
                      <MenuLogin
                      isPanelClose={isPanelClose}
                      handleClick={handleClick}
                      handleClose={handleClose}
                      anchorEl={anchorEl}
                      auth={auth}
                      signOut={signOut}
                      setIsCategorySet={setIsCategorySet}
                      open={open}
                      
                      />
                    </div>

                  ) : (
                    <ul>
                    <li className="nav-link">
                    <Link
                      to="/dashboard/account"
                      onClick={(e) => {
                        handleCategoryClick("account");
                      }}
                    >
                        <Button
                        color="primary"
                        style={{backgroundColor: "var(--primary-color)", color: "var(--text-primary)"}}
                        disabled={false}
                        size="small"
                        variant="contained"
                      >Sign in</Button>
                    </Link>
                  </li>                  
                    </ul>

                  )

                }
        </div>
        <Routes>
          {/* <Route path="/" element={<Navigate to="/home" />} /> */}
          <Route path="/home/*" element={<Home />} />
          <Route path="/account/*" element={<Account />} />

          <Route path="/movies/*" element={<Movies />} />
          <Route path="/tvseries/*" element={<TVSeries />} />

          <Route path="/recentlyadded/*" element={<RecentlyAdded />} />

          <Route path="/topanimes/*" element={<TopAnimes />} />
          {/* <Route path="/" element={<Error />} /> */}

          {activeSearch ? (
            <>
              <Route path="/search/*" element={<SearchPage />} />
              <Route path="/watch/:title" element={<Watch />} />
            </>
          ) : null}
        </Routes>
      </section>

      {/* Notification */}

      <div className="containerNotification">
        <div className="notification">
          <div className="circle"></div>
          <div className="impact">
            <div className="icon">
              <i className="fa-solid fa-bell fa"></i>
            </div>
          </div>
          <div className="message-container">
            <div className="message">
              <span className="textNotification"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}

      <div className="toast">
        <div className="containertoast">
          <div className="thumbnail">
            <img className="p" src=""></img>
          </div>
          <div className="textToast"></div>
        </div>
      </div>
    </div>
  );
}
