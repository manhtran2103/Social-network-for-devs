import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { setCurrentUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
class App extends Component {
  render() {
    const token = localStorage.jwtToken;
    if (token) {
      setAuthToken(token);
      store.dispatch(setCurrentUser(jwt_decode(token)));
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
