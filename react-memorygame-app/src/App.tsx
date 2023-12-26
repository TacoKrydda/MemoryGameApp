import "./App.css";
import Navigation from "./Navigation/Navigate";
import Home from "./Home/Home";
import Game from "./Game/Game";
import HighScoreBoard, { fetchHighScores } from "./HighScore/HighScoreBoard";
import Level1, { fetchGameNumberSize } from "./Game/Level1";
import AddNewHighScore from "./HighScore/AddNewHighScore";
import VideoTest from "./videoTest";

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
          loader={fetchGameNumberSize}
          errorElement={<div>Something went wrong!</div>}
        />
        <Route path="/addnewhighscore" element={<AddNewHighScore />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
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
      // backgroundClass = "bg-level1";
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
