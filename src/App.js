import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar.js";
import Newsbox from "./components/Newsbox";
import { Routes, Route } from "react-router-dom";

export class App extends Component {
   render() {
      return (
         <div>
            <Navbar />
            <Routes>
               <Route exact path="/" element={<Newsbox country="IN" />}></Route>
               <Route
                  exact
                  path="/sports"
                  element={<Newsbox country="IN" cat="sports" />}
               ></Route>
               <Route
                  exact
                  path="/technology"
                  element={<Newsbox country="IN" cat="technology" />}
               ></Route>
               <Route
                  exact
                  path="/health"
                  element={<Newsbox country="IN" cat="health" />}
               ></Route>
               <Route
                  exact
                  path="/entertainment"
                  element={<Newsbox country="IN" cat="entertainment" />}
               ></Route>
            </Routes>
         </div>
      );
   }
}

export default App;
