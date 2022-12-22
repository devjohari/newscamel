import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar.js";
import Newsbox from "./components/Newsbox";

export class App extends Component {
   render() {
      return (
         <div>
            <Navbar />
            <Newsbox />
         </div>
      );
   }
}

export default App;
