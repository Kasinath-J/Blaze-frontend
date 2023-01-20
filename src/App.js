import { BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarComp } from "./components/navbar/NavbarComp";
import { LeaderBoard } from "./components/LoggedoutComponents/leaderboard/LeaderBoard";
import { Home } from "./components/LoggedoutComponents/home/Home";
import { Events } from "./components/LoggedoutComponents/events/Events"
import { Problems } from "./components/LoggedoutComponents/problems/Problems";
import { ProblemsEasy } from "./components/LoggedoutComponents/problems/ProblemsEasy";
import { ProblemsMedium } from "./components/LoggedoutComponents/problems/ProblemsMedium";
import { Portfolio } from "./components/LoggedoutComponents/portfolio/Portfolio";
import {  SearchPortfolio } from "./components/LoggedoutComponents/searchPortfolio/SearchPortfolio";
import {UpdateProfile} from "./components/LoggedinComponents/UpdateProfile";

import {PageNotFound} from "./components/Utils/PageNotFound";

function App() {
  return (
      <BrowserRouter>
      <NavbarComp />
      <div style={{height:"100%"}}>
        <Routes>
          <Route exact path="/" element={
              <div style={{height:"100%"}}>
                <Home />
              </div>
            }
          />

          <Route exact path="/problems" element={<Problems />} />

          <Route exact path="/problems/easy" element={<ProblemsEasy />}  />

          <Route exact path="/problems/medium" element={<ProblemsMedium /> }/>

          <Route exact path="/Leaderboard" element={<LeaderBoard />}/>

          <Route exact path="/Events" element={<Events />}/>

          <Route exact path="/searchPortfolio" element={<SearchPortfolio />}/>

          <Route exact path="/user/:email" style={{
              "height":"{window.innerHeight} !important",
            }}
            element={<Portfolio />}
          />

          <Route exact path="/updateProfile" element={<UpdateProfile />}/>

          <Route path="*" element={<PageNotFound/>} />
          
          <Route exact path="pageNotFound" element={<PageNotFound/>} />

        </Routes>
        </div>
      </BrowserRouter>
   
  );
}

export default App;
