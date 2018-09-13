import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";

import { BrowserRouter as Router, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
