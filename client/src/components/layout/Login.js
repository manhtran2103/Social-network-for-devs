import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/auth";
import InputGroup from "../common/InputGroup";
import { Link } from "react-router-dom";
import UserIcon from "../../img/user.png";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp) {
      this.setState({ errors: nextProp.errors });
    }
    if (nextProp.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              {/* <h1 className="display-4 text-center">Log In</h1> */}
              <div className="text-center">
                <img src={UserIcon} alt="user" height="130" />
              </div>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <InputGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  icon="fa fa-envelope fa"
                />
                <InputGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  icon="fa fa-lock fa-lg"
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Log In"
                />
              </form>
              <div className="text-center mt-4">
                <Link to="/register">Register for an account ?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
