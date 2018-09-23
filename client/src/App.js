import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/layout/Login";
import Register from "./components/layout/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-expreriences/AddExperience";
import AddEducation from "./components/add-education/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { logoutUser } from "./actions/auth";
import { clearCurrentProfile } from "./actions/profile";
import PrivateRoute from "./components/common/PrivateRoute";
class App extends Component {
  render() {
    const token = localStorage.jwtToken;
    if (token) {
      // set token to header request
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // set current user
      store.dispatch(setCurrentUser(decoded));
      // check for expired user
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(clearCurrentProfile());
        store.dispatch(logoutUser());
        window.location.href = "/login";
      }
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:handle" component={Profile} />
            <Switch>
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute path="/create-profile" component={CreateProfile} />
            </Switch>
            <Switch>
              <PrivateRoute path="/edit-profile" component={EditProfile} />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
              <PrivateRoute path="/add-education" component={AddEducation} />
            </Switch>
            <Switch>
              <PrivateRoute path="/feed" component={Posts} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
