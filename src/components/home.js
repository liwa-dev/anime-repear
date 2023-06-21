import React, { useEffect, useState } from "react";
import "./home.css";
import Card from "./cards";
import Loading from "./loading/loading";
import { Route, Routes, useNavigate } from "react-router-dom";
import Watch from "./watch/watch";
import { ToastRandom } from "./notificaiton/notif-system";

export default function Home() {
  const [safeRandom, setSafeRandom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBodySectionVisible, setIsBodySectionVisible] = useState(true);
  const [data, setData] = useState([]);
  const [ongoing, setgoing] = useState([]);

  useEffect(() => {
    const itemsPath = document.querySelector(".itemsPath");
    itemsPath.children[0].addEventListener("click", () => {
      setIsBodySectionVisible(true);
    });
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.jikan.moe/v4/recommendations/anime?limit=5"
        );
        const data = await response.json();
        const limitedData = data.data.slice(0, 10);
        setData(limitedData);
        const response2 = await fetch(
          "https://austereenviousconstant.fishyflick.repl.co/ongoing"
        );
        const data2 = await response2.json();
        setgoing(data2);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  async function getRandom() {
    try {
      const fetchResponse = await fetch(
        "https://austereenviousconstant.fishyflick.repl.co/getrandom"
      );
      const response = await fetchResponse.json();
      setSafeRandom(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();

    const handleRandomClick = async () => {
      setSafeRandom(true);
      setTimeout(async () => {
        const data = await getRandom();
        if (data) {
          ToastRandom(data.title,data.img)
          setIsBodySectionVisible(false);
          navigate('/dashboard/home/watch/'+data.title.toLowerCase().replace(/\s+/g, "-"), { state: { itemId: data.mal_id } });
        }
      }, 2000);
    };

  return (
    <div className="bodySection">
      {isLoading ? (
        <div className="bodyContent">
          <Loading />
        </div>
      ) : isBodySectionVisible ? (
        <div className="container">
          <div className="content">
            <div className="background">
              {!safeRandom ? (
                <button className="watchrndm" onClick={handleRandomClick}>
                  <i className="bx bxs-dice-6 icon"></i>
                  <span>Pick Random</span>
                </button>
              ) : (
                <button className="watchrndm disabled">
                  <i className="bx bxs-dice-6 icon"></i>
                  <span>Pick Random</span>
                </button>
              )}
            </div>
          </div>
          {/* Recommandations cards */}
          <section className="sectionContainerHome">
            <div className="recommandation">
              <h3><i className='bx bxs-bookmark-star icon'></i> Recommendations</h3>
              <div className="cardhome">
                <div className="latestvideo">
                  {data.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        item={item.entry[0]}
                        setIsBodySectionVisible={setIsBodySectionVisible}
                        to={"home"}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Ongoing Episodes */}

            <div className="ongoing">
              <h3><i className="fa-solid fa-spinner icon"></i> On-going</h3>
              <div className="cardhome">
                <div className="latestvideo">
                  {ongoing.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        item={item}
                        setIsBodySectionVisible={setIsBodySectionVisible}
                        to={"home"}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <Routes>
          <Route path="/watch/:title" element={<Watch />} />
        </Routes>
      )}
    </div>
  );
}
