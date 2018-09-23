import { Link } from "react-router-dom";
import React, { Component } from "react";
import { logoutUser } from "../../actions/auth";
import { clearCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { auth } = this.props;
    const guest = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Log In
          </Link>
        </li>
      </ul>
    );
    const user = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            PostFeed
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {" "}
            <img
              src={auth.user.avatar}
              alt={auth.user.name}
              title={auth.user.name}
              className="rounded-circle"
              style={{ height: "25px", marginRight: "10px" }}
            />
            Log Out
          </a>
        </li>
      </ul>
    );

    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              <Link className="navbar-brand" to="/">
                DevConnector
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#mobile-nav"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                      {" "}
                      Developers
                    </Link>
                  </li>
                </ul>
                {auth.isAuthenticated ? user : guest}
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
