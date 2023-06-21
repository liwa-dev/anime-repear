import React from "react";
import gif from "../imgs/loading.gif";

export default function Loading() {
  return (
    <div className="loadingData">
      <img src={gif} alt="loading"></img>
      <div id="load">
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>
  );
}
