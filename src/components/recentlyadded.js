import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./cards.css";
import Watch from "./watch/watch";
import Card from "./cards";
import Loading from "./loading/loading";
export default function RecentlyAdded() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isBodySectionVisible, setIsBodySectionVisible] = useState(true); //for body section
  const [isFetched, setIsFetched] = useState(false);


  useEffect(() => {
    async function fetchdata() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://austereenviousconstant.fishyflick.repl.co/recentlyadded?page=${page}&per_page=30`
        );
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    fetchdata();
  }, []);

  async function fetchOther(page) {
    setIsFetched(true);
    try {
      const response = await fetch(
        `https://austereenviousconstant.fishyflick.repl.co/recentlyadded?page=${page}&per_page=30`
      );
      const newData = await response.json();
      setData(newData);
      setIsFetched(false);
    } catch (e) {
      console.log(e);
    }
  }

  const handleFetchPrev = () => {
    if (isFetched) {
      return;
    }
    let nextPage = page; // Get the updated value of page


    if (nextPage <= 1) {
      return;
    } else {
      nextPage = nextPage - 1;
    }
    setPage(nextPage); // Update page with the new value
    fetchOther(nextPage); // Pass in the updated value to fetchOther
  };

  const handleFetchNext = () => {
    if (isFetched) {
      return;
    }

    const nextPage = page + 1; // Get the updated value of page
    setPage(nextPage); // Update page with the new value
    fetchOther(nextPage); // Pass in the updated value to fetchOther
  };


  useEffect(() => {
    const itemsPath = document.querySelector(".itemsPath");
    itemsPath.children[0].addEventListener("click", () => {
      setIsBodySectionVisible(true);
    });
  }, []);

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
                to={"recentlyadded"}
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
