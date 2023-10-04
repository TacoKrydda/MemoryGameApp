import React from "react";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.home}>
      <h1>Välkommen!</h1>
      <h2>
        Du börja spela spelet genom att klicka på "Game" i navigeringsfliken som
        du hittar på toppen av sidan.
      </h2>
      <h2>
        Utmana dig själv och ha roligt! Om du är nyfiken på topplistan kan du
        klicka på "Highscore" längst till höger på navigeringsfliken. Se hur du
        rankas och tävla mot andra spelare.
      </h2>
    </div>
  );
};

export default Home;
