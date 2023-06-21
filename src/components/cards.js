import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const { item, index } = props;
  useEffect(() => {
    const cards = document.querySelectorAll(".card");
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

    cards.forEach((card) => {
      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);
    });
  });

  return (
    <div className="card" key={item.id ? item.id : item.mal_id}>
      <div className="status">{item?.airing ? "يعرض الأن" : "مكتمل"}</div>
      {item?.genres?.split
        ? item?.genres.split(", ").map((genre) =>
            genre === "Award Winning" ? (
              <span className="award" key={genre}>
                <i className="bx bxs-award icon glitter-icon"></i>
              </span>
            ) : null
          )
        : item?.genres?.map((genre) =>
            genre.name === "Award Winning" ? (
              <span className="award" key={genre.mal_id}>
                <i className="bx bxs-award icon glitter-icon"></i>
              </span>
            ) : null
          )}
      <div className="poster">
        {item.img ? (
          <img src={item.img} alt={item.id} />
        ) : item.images.jpg.image_url ? (
          <img src={item.images.jpg.image_url} alt={item.mal_id} />
        ) : (
          <div className="">Loading....</div>
        )}
      </div>
      <Link
        to={
          `/dashboard/${props.to}/watch/` + item.title.toLowerCase().replace(/\s+/g, "-")
        }
        state={{ itemId: item.mal_id }}
        onClick={() => {
          props.setIsBodySectionVisible(false);
        }}
      >
        <div className="play">
          <i className="bx bx-play-circle"></i>
        </div>
      </Link>

      <div key={`details${index}`} className="details">
        <h3 key={`title${index}`}>{item.title}</h3>
        <div key={`rating${index}`} className="rating">
          {item.score && <i key={`icon${index}`} className="bx bxs-star"></i>}
          <span key={`score${index}`}>{item.score}</span>
        </div>
        <div className="tags">
          {item?.genres?.split
            ? item?.genres
                .split(", ")
                .filter(
                  (genre) =>
                    !genre.includes("Award Winning") && !genre.includes("Award")
                )
                .map((genre, index) => (
                  <span key={`award${index}`}>{genre}</span>
                ))
            : item?.genres
                ?.filter(
                  (genre) =>
                    !genre.name.includes("Award Winning") &&
                    !genre.name.includes("Award")
                )
                .map((genre, index) => (
                  <span key={`award2${index}`}>{genre.name}</span>
                ))}
          {item?.genres?.length === 0 && (
            <span key={`award3${index}`} style={{ opacity: "0" }}>
              .
            </span>
          )}
        </div>
      </div>
      {item.synopsis && (
        <div className="follow-mouse">
          Season: {item.season ? item.season : "Null"}
          <br></br>
          Rating: {item.rating ? item.rating : "Null"}
          <br></br>
          Episodes: {item.episodes ? item.episodes : "Null"}
          <br></br>
        </div>
      )}
    </div>
  );
}

export default Card;
