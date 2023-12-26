import React from "react";
import clipp from "./backgrounds/videoplayback.mp4";
import s from "./videoTest.module.css";

const videoTest = () => {
  return (
    <div className={s.main}>
      {/* <div className={s.overlay}></div> */}
      <video className={s.bvideo} src={clipp} autoPlay loop muted />
      <div className={s.content}>
        <h1>Welcome</h1>
        <p>To my site</p>
      </div>
    </div>
  );
};

export default videoTest;
