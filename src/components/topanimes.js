import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./cards.css";
import Loading from "./loading/loading";
import Watch from "./watch/watch";
import Card from "./cards";
export default function TopAnimes() {
  const [data, setData] = useState([]);
  const [moreLoad, setMoreLoad] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setFetchedData] = useState(false);
  const [isBodySectionVisible, setIsBodySectionVisible] = useState(true); //for body section
  useEffect(() => {
    //loading first time!
    const loading = document.querySelector(".loadingData");
    // FETCH DATA

    async function fetchData() {
      try {
        setIsLoading(true);

        const types = ["tv", "movie", "special", "ova", "ona"];
        const allData = [];

        for (const type of types) {
          const response = await fetch(
            `https://api.jikan.moe/v4/top/anime?type=${type}&limit=10`
          );
          const json = await response.json();

          const promises = json.data.map((element, index) => {
            return new Promise(async (resolve) => {
              setTimeout(async () => {
                const response2 = await fetch(
                  `https://austereenviousconstant.fishyflick.repl.co/getanime?mal_id=${element.mal_id}`
                );
                const json2 = await response2.json();
                if (json2[0] && json2[0].synopsis) {
                  element.synopsis = json2[0].synopsis;
                }

                const malIdExists = allData.some(
                  (data) => data.mal_id === element.mal_id
                );
                if (
                  !malIdExists &&
                  json2[0] &&
                  json2[0].mal_id === element.mal_id
                ) {
                  allData.push(element);
                }

                resolve();
              }, index * 100);
            });
          });

          await Promise.all(promises);
        }

        setData(allData);
      } catch (error) {
        //setIsLoading(true);
        console.log(error);
      } finally {
        setIsLoading(false);
        if (loading) {
          loading.style.display = "none";
        }
      }
    }

    fetchData();
  }, []);

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



  const fetchOther = async (page) => {
    try {
      const types = ["tv", "movie", "special", "ova", "ona"];
      const newData = [];

      for (const type of types) {
        const response = await fetch(
          `https://api.jikan.moe/v4/top/anime?type=${type}&page=${page}&limit=10`
        );
        const json = await response.json();

        const promises = json.data.map((element, index) => {
          return new Promise(async (resolve) => {
            const response2 = await fetch(
              `https://austereenviousconstant.fishyflick.repl.co/getanime?mal_id=${element.mal_id}`
            );
            const json2 = await response2.json();
            console.log(json2);
            if (json2[0] && json2[0].synopsis) {
              element.synopsis = json2[0].synopsis;
            }

            const malIdExists = newData.some(
              (data) => data.mal_id === element.mal_id
            );
            if (
              !malIdExists &&
              json2[0] &&
              json2[0].mal_id === element.mal_id
            ) {
              newData.push(element);
            }

            resolve();
          });
        });

        await Promise.all(promises);
      }
      setData(newData);
      setFetchedData(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchNext = async () => {
    if (isFetched) {
      return;
    }
    setMoreLoad(moreLoad+1);
    fetchOther(moreLoad);
    setFetchedData(true);
  }

  const handleFetchPrev = async () => {
    if (isFetched) {
      return;
    }
    let numPage = moreLoad;

    if (numPage <= 1) {
      return;
    } else {
      numPage -= 1;
      setMoreLoad(numPage);
      setFetchedData(true);
      fetchOther(numPage);
    }
  }

  return (
    <div className="bodySection">
      {isBodySectionVisible ? (
        <div className="bodyContent">
          {!isLoading &&
            data.map((item, index) => (
              <Card
                key={index}
                item={item}
                setIsBodySectionVisible={setIsBodySectionVisible}
                to={"topanimes"}
                index={index}
              />
            ))}
          {isLoading && <Loading />}
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
              <i className="bx bxs-left-arrow"></i>
            </span>

            <span>
              <i className="bx bxs-right-arrow"></i>
            </span>
          </div>
        ) : (
          <div className="loadMore">
            <span
              onClick={() => {
                handleFetchPrev();
              }}
            >
              <i className="bx bxs-left-arrow"></i>
            </span>

            <span
              onClick={() => {
                handleFetchNext();
              }}
            >
              <i className="bx bxs-right-arrow"></i>
            </span>
          </div>
        ))}
    </div>
  );
}
