import React, { Component } from "react";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-5 mb-3">Developer Connector</h1>
              <p className="lead">
                Create a developer profile/porfolio, share posts and get help
                from others
              </p>
              <hr />
              <a href="register.html" className="btn btn-lg btn-info mr-3">
                Sign Up
              </a>
              <a href="login.html" className="btn btn-lg btn-success">
                Log In
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
