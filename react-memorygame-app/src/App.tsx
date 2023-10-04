import "./App.css";
import Navigation from "./Navigation/Navigate";
import Home from "./Home/Home";
import Game from "./Game/Game";
import HighScoreBoard, { fetchHighScores } from "./HighScore/HighScoreBoard";
import Level1 from "./Game/Level1";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route
          path="/highscoreboard"
          element={<HighScoreBoard />}
          loader={fetchHighScores}
          errorElement={<div>Something went wrong!</div>}
        />
        <Route
          path="/level1"
          element={<Level1 />}
          // loader={fetchGameNumbers}
          errorElement={<div>Something went wrong!</div>}
        />
        {/* <Route path="/addnewscore" element={<AddNewScore />} /> */}
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
    // <div className="parent">
    //   <div className="div1">
    //     <Navigation />
    //   </div>
    //   <div className="div2">
    //     <h2>Välkommen!</h2>
    //     <h2>
    //       Du börja spela spelet genom att klicka på "Game" i navigeringsfliken
    //       som du hittar på toppen av sidan.
    //     </h2>
    //     <h2>
    //       Utmana dig själv och ha roligt! Om du är nyfiken på topplistan kan du
    //       klicka på "Highscore" längst till höger på navigeringsfliken. Se hur
    //       du rankas och tävla mot andra spelare.
    //     </h2>
    //   </div>
    // </div>
  );
}
const Root = () => {
  const location = useLocation();
  let backgroundClass = "bg-default";
  switch (location.pathname) {
    case "/":
      backgroundClass = "bg-home";
      break;
    case "/game":
      backgroundClass = "bg-game";
      break;
    case "/highscoreboard":
      backgroundClass = "bg-highscore";
      break;
    case "/level1":
      backgroundClass = "bg-level1";
      break;
    default:
      break;
  }
  return (
    <div className={`parent ${backgroundClass}`}>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default App;
