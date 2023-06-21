import React from "react";
import { useState, useEffect } from "react";
import { Routes, useLocation, Route } from "react-router-dom";
import Loading from "./loading/loading";
import Watch from "./watch/watch";
import Card from "./cards";

export default function SearchPage() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const bar = params.get("q");
  let query = "";
  if (bar) {
    query = bar.replace(/\s+/g, "+");
  }
  const [data, setData] = useState([]);
  const [moreLoad, setMoreLoad] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isBodySectionVisible, setIsBodySectionVisible] = useState(true); //for body section
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const bx_search = document.querySelector(".bx-search");
    //loading first time!
    const loading = document.querySelector(".loadingData");

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://austereenviousconstant.fishyflick.repl.co/search?q=${query}`
        );
        const json = await response.json();
        setData(json);
        console.log(json);
        setMoreLoad(moreLoad + 1);
        console.log("fetched");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        if (loading) {
          loading.style.display = "none";
        }
      }
    }

    bx_search.addEventListener("click", () => {
      setData([]);
      fetchData();
    });

    fetchData();
  }, [query]);


  useEffect(() => {
    const itemsPath = document.querySelector(".itemsPath");
    itemsPath.children[0].addEventListener("click", () => {
      setIsBodySectionVisible(true);
    });
    const onMouseMove = (event) => {
      try {
        // Get the current mouse position
        const cardRect = event.currentTarget.getBoundingClientRect();
        const cardStyle = window.getComputedStyle(event.currentTarget);
        const cardPaddingLeft = parseFloat(cardStyle.paddingLeft);
        const cardPaddingTop = parseFloat(cardStyle.paddingTop);
        const cardPaddingRight = parseFloat(cardStyle.paddingRight);
        const cardPaddingBottom = parseFloat(cardStyle.paddingBottom);

        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const isMouseInside =
          mouseX >= cardRect.left + cardPaddingLeft &&
          mouseX <= cardRect.right - cardPaddingRight &&
          mouseY >= cardRect.top + cardPaddingTop &&
          mouseY <= cardRect.bottom - cardPaddingBottom;

        // Update the position and opacity of the overlay div
        const followMouse =
          event.currentTarget.querySelectorAll(".follow-mouse");
        followMouse.forEach((element) => {
          if (isMouseInside) {
            element.style.left = `${mouseX + 20}px`;
            element.style.top = `${mouseY}px`;
            element.style.display = "block";
          } else {
            element.style.display = "none";
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    const onMouseLeave = (event) => {
      // Hide the follow-mouse div when the mouse leaves the card
      const followMouse = event.currentTarget.querySelectorAll(".follow-mouse");
      followMouse.forEach((element) => {
        element.style.display = "none";
      });
    };
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);
    });
  }, [data]);

  const handleMoreLoad = async () => {
    if (isFetched) {
      return;
    }
    setMoreLoad(moreLoad + 1);
    setIsFetched(true);
    try {
      const response = await fetch(
        `https://austereenviousconstant.fishyflick.repl.co/search?q=${query}&page=${
          moreLoad + 1
        }&per_page=10`
      );
      const json = await response.json();
      const newData = [...data];
      json.forEach((item) => {
        if (!newData.find((existingItem) => existingItem.id === item.id)) {
          newData.push(item);
        }
      });
      setData(newData);
      setIsFetched(false);
    } catch (error) {
      setIsFetched(false);
      console.log(error);
    }
  };
  return (
    <div className="bodySection">
      {isBodySectionVisible ? (
        <div className="bodyContent">
          {!isLoading &&
            data.map((item,index) => (
              <Card
                key={index}
                item={item}
                setIsBodySectionVisible={setIsBodySectionVisible}
                to={"search"}
                index={index}
              />
            ))}
          {isLoading && <Loading/>}
        </div>
      ) : (
        <Routes>
          <Route path="/watch/:title" element={<Watch />} />
        </Routes>
      )}

      {isBodySectionVisible &&
        !isLoading &&
        (isFetched ? (
          <div className="loadMore disabled">
            <span>
              <i className="bx bxs-chevrons-down icon"></i>
            </span>
          </div>
        ) : (
          <div className="loadMore" onClick={handleMoreLoad}>
            <span>
              <i className="bx bxs-chevrons-down icon"></i>
            </span>
          </div>
        ))}
    </div>
  );
}
