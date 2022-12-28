import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar.js";
import Newsbox from "./components/Newsbox";
import { Routes, Route } from "react-router-dom";

export class App extends Component {
   apiKey = process.env.REACT_APP_NEWS_CAMEL_OOS;
   render() {
      return (
         <div>
            <Navbar />
            <Routes>
               <Route
                  exact
                  path="/"
                  element={<Newsbox country="IN" apiKey={this.apiKey} />}
               ></Route>
               <Route
                  exact
                  path="/sports"
                  element={
                     <Newsbox country="IN" cat="sports" apiKey={this.apiKey} />
                  }
               ></Route>
               <Route
                  exact
                  path="/technology"
                  element={
                     <Newsbox
                        country="IN"
                        cat="technology"
                        apiKey={this.apiKey}
                     />
                  }
               ></Route>
               <Route
                  exact
                  path="/health"
                  element={
                     <Newsbox country="IN" cat="health" apiKey={this.apiKey} />
                  }
               ></Route>
               <Route
                  exact
                  path="/entertainment"
                  element={
                     <Newsbox
                        country="IN"
                        cat="entertainment"
                        apiKey={this.apiKey}
                     />
                  }
               ></Route>
            </Routes>
         </div>
      );
   }
}

export default App;
