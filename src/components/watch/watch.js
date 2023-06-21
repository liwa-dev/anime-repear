import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../cards.css";
import "./watch.css";
import { openNotification,closeNotification,closeToast } from '../notificaiton/notif-system';
import { IconButton, Pagination } from "rsuite";
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
export default function Watch() {
  const [data, setData] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [getInfoAnime, setInfoAnime] = useState([]);
  const [getOtherInfo, setOtherInfo] = useState([]);

  const [sortedData, setSortedData] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page

// Calculate total pages

const seenTitles = {};
const [episodeClicked, setEpisodeClicked] = useState(false);

const filteredData = data.filter((episode) => {
  const normalizedTitle = episode.Episode.replace(/^(الحلقة\s)0*(\d+)$/, '$1$2');
  if (!seenTitles[normalizedTitle]) {
    seenTitles[normalizedTitle] = true;
    return true;
  }
  return false;
});

const totalPages = Math.ceil(sortedData.length  );

// Get current items based on pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);


    // Change page
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  


  // Apply sorting logic to currentItems
    function sortEpisodes(episodes) {
      return episodes.slice().sort((a, b) => {
        const episodeA = parseInt(a.Episode.split(" ")[1]);
        const episodeB = parseInt(b.Episode.split(" ")[1]);
        return episodeA - episodeB;
      });
    }

  // Remove duplicate episodes
  function removeDuplicateEpisodes(episodes) {
    const seenTitles = {};
    return episodes.filter((episode) => {
      const normalizedTitle = episode.Episode.replace(/^(الحلقة\s)0*(\d+)$/, '$1$2');
      if (!seenTitles[normalizedTitle]) {
        seenTitles[normalizedTitle] = true;
        return true;
      }
      return false;
    });
  }

  useEffect(() => {
    // Sort and remove duplicates from the data array when it changes
    const sortedEpisodes = sortEpisodes(data);
    const uniqueEpisodes = removeDuplicateEpisodes(sortedEpisodes);
    setSortedData(uniqueEpisodes);
  }, [data]);

  

  const itemsPath = document.querySelector(".itemsPath");
  itemsPath.children[0].addEventListener("click", () => {
    closeNotification();
    closeToast();
    const secondLi = document.querySelectorAll(".textPath li")[1];
    if (secondLi) {
      secondLi.style.display = "none";
      secondLi.textContent = "";
    }
    const titleAnime = document.querySelectorAll(".textPath li")[2];
    if (titleAnime) {
      titleAnime.style.display = "none";
      titleAnime.textContent = "";
    }
    
  });

  const location = useLocation();
  const itemId = location?.state?.itemId ?? null;
  const idAnime = itemId;
  useEffect(() => {
    async function fetchJikan() {
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime/'+idAnime);
        const data = await response.json();
        const itemsPath = document.querySelector(".itemsPath");
        itemsPath.children[1].style.display = "inline-block";
        itemsPath.children[1].textContent = "Watch";
        itemsPath.children[2].style.display = "inline-block";
        itemsPath.children[2].textContent = data.data.title;
      } catch (error) {
        console.log(error);
      }
    }
    fetchJikan();

  }, [])
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    async function fetchData() {
      try {
        console.log("You are watching anime_id: " + idAnime);
        const [episodesResponse, infoResponse,infoMy] = await Promise.all([
          fetch(
            `https://austereenviousconstant.fishyflick.repl.co/getepisodes?mal_id=` +
              idAnime
          ),
          fetch(`https://api.jikan.moe/v4/anime/` + idAnime),
          fetch('https://austereenviousconstant.fishyflick.repl.co/getanime?mal_id=' + idAnime),
        ]);

        const episodesJson = await episodesResponse.json();
        const infoJson = await infoResponse.json();
        const otherInfo = await infoMy.json();
        setData(episodesJson);
        setInfoAnime(infoJson);
        setOtherInfo(otherInfo);
        if (episodesJson.length === 0) {
          openNotification(5000, "Sorry, we could not find any available episodes for this show. Please check back later or try searching for a different show");
        }
      } catch (error) {
        openNotification(5000,"Unable fetch to server. Please check your internet or try again");
        console.log(error);
      }
    }

    fetchData();
  }, []);

  // PUSH EPISODE FIRST
  useEffect(() => {
    if (data && data.length > 0) {
      const pushFirst = data.find((dataItem) => dataItem.Episode === 'الحلقة 1');
      if (pushFirst) {
        const video = document.querySelector("iframe");
        video.src = pushFirst.link_server;
        console.log(video.src)
        setSelectedServer([pushFirst]);
      }
    }

  }, [data]);
  
  

  useEffect(() => {
    if (getInfoAnime) {
      const { data } = getInfoAnime;
      if (data && data.studios && data.studios.length > 0) {
        const studios = data.studios.map((item) => item.name).join(", ");
        const studioElement = document.querySelector(".studio");
        studioElement.textContent = "Studio: " + studios;
      }

      if (data && data.aired) {
        const releasein = document.querySelector(".releasein");
        const releaseto = document.querySelector(".releaseto");
        releasein.textContent = "Air From: " + data.aired.from.split("T")[0];
        if (data.aired.to) {
          releaseto.textContent = "Air To: " + data.aired.to.split("T")[0];
        } else {
          releaseto.textContent = "Air To: N/A";
        }
      }
    }
  }, [getInfoAnime]);

  


  useEffect(() => {
    const videos = document.querySelector(".videos");
    if (videos) {
      const firstEpisode = videos.children[0]?.children[0]?.children[0]?.textContent;
      if (firstEpisode) {
        const selectedItem = data.filter(
          (dataItem) =>
            dataItem.Episode === firstEpisode &&
            !dataItem.link_server.startsWith("https://yonaplay.org")
        );
        console.log("this gonna work ", selectedItem);
        openNotification(5000, "Episodes loaded successfully: " + sortedData.length);
        setSelectedServer(selectedItem);
        // AUTO SELECT SERVER
        const video = document.querySelector("iframe");
        video.src = selectedItem[0].link_server;
      }
      console.log("test" + firstEpisode)
    }
  }, [sortedData]);
  



  
  const [toggleDescription, setToggleDescription] = useState(false);
  useEffect(() => {
    const description = document.querySelector('.description');
    if (description) {
      const show_more = document.querySelector('.show-more');
      const syno = document.querySelector('.syno');
      if (syno.textContent.length > 200) {
        show_more.style.display = 'block';
        show_more.addEventListener('click', function () {
          setToggleDescription((current) => !current);
          if (toggleDescription) {
            description.style.maxHeight = syno.textContent.length - 20 + '%';
          } else {
            description.style.maxHeight = '5em';
          }
          //console.log('updated toggleDescription:', current);
        })
      } else {
        show_more.style.display = 'none';
      }
      
    }
  }, [toggleDescription]);
  


  return (
    <div>
      <div className="bodyContent">
        <div className="bodyWatch">
          <section className="main-video">
            {data && data.length > 0 ? (
              <iframe title="video"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="loadingData skeleton"></div>
            )}

          </section>

          <section className="video-playlist">
            <h3 className="title">List Episodes</h3>
            <p>{getInfoAnime?.data?.duration || "Null"}</p>
            {sortedData && sortedData.length > 0 ? (
              <div className="videos">
                 {currentItems && currentItems.length > 0 ? (
                  <ul>
                    {currentItems.map((item, index) => (
                      <li
                        key={item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          const selectedItem = data.filter(
                            (dataItem) =>
                              dataItem.Episode === item.Episode &&
                              !dataItem.link_server.startsWith(
                                "https://yonaplay.org"
                              )
                          );

                          setSelectedServer(selectedItem);

                          // AUTO SELECT SERVER
                          const video = document.querySelector("iframe");
                          video.src = selectedItem[0].link_server;

                          setEpisodeClicked(true);
                        }}
                      >
                        <a href={"/#"}>{item.Episode}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No episodes found.</p>
                )}
            <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              layout={["pager"]}
              size={"xs"}
              prev={true}
              next={true}
              first={true}
              last={true}
              ellipsis={true}
              boundaryLinks={true}
              total={totalPages}
              limit={itemsPerPage}
              maxButtons={5}
              activePage={currentPage}
              onChangePage={handlePageChange}
/>
            </div>

              </div>
            ) : (
              <>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
                <div className="loadingList skeleton"></div>
              </>
            )}
          </section>
          <section className="description">
          <h3>Description</h3>
          <div className="syno">{getOtherInfo[0]?.synopsis? getOtherInfo[0].synopsis : 'لا يوجد!'}</div>
          <div className="show-more">...</div>
          </section>
            <section className="servers">
            <h3>Servers</h3>
              <ul>
                {selectedServer ?
                  selectedServer.map((item, index) => {
                    return (
                      <li key={index}>
                        <span
                          onClick={() => {
                            const video = document.querySelector("iframe");
                            video.src = item.link_server;
                          }}
                        >
                          {item.server_name}
                        </span>
                      </li>
                    );
                  }) : (
                    <div className="loadingServers skeleton"></div>
                  )}
              </ul>
            </section>
          <section className="moreDetail">
          <h3>More Details</h3>
              <div className="studio">Studio:</div>
              <div className="releasein">Air from:</div>
              <div className="releaseto">Air to:</div>
          </section>
        </div>
      </div>
    </div>
  );
}
