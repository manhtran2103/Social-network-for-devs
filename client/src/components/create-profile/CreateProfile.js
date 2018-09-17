import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      instagram: "",
      facebook: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      facebook: this.state.facebook
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp) {
      this.setState({ errors: nextProp.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const selecOptions = [
      { label: "* Select your level status", value: 0 },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Tech Lead", value: "Tech Lead" },
      { label: "Student-Learning", value: "Student-Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Other", value: "Other" }
    ];
    let socialsInput;
    if (this.state.displaySocialInput) {
      socialsInput = (
        <div>
          <InputGroup
            name="facebook"
            placeholder="Facebook Link"
            value={this.state.facebook}
            onChange={this.onChange}
            icon="fab fa-facebook"
            error={errors.facebook}
          />
          <InputGroup
            name="youtube"
            placeholder="Youtube Link"
            value={this.state.youtube}
            onChange={this.onChange}
            icon="fab fa-youtube"
            error={errors.youtube}
          />
          <InputGroup
            name="instagram"
            placeholder="Instagram Link"
            value={this.state.instagram}
            onChange={this.onChange}
            icon="fab fa-instagram"
            error={errors.instagram}
          />
          <InputGroup
            name="linkedin"
            placeholder="Linkedin Link"
            value={this.state.linkedin}
            onChange={this.onChange}
            icon="fab fa-linkedin"
            error={errors.linkedin}
          />
          <InputGroup
            name="twitter"
            placeholder="Twitter Link"
            value={this.state.twitter}
            onChange={this.onChange}
            icon="fab fa-twitter"
            error={errors.twitter}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-5 text-center">Create your profile</h1>
              <p className="lead text-center">
                Let's add some infomation to make your profile stand out
              </p>
              <small className="d-block pb-4">* required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="handle"
                  placeholder="* Profile handle"
                  onChange={this.onChange}
                  value={this.state.handle}
                  error={errors.handle}
                  info="An unique handle for your profile URL. This can be your name, nick name, company name, etc"
                />
                <SelectListGroup
                  name="status"
                  options={selecOptions}
                  onChange={this.onChange}
                  value={this.state.status}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  name="company"
                  placeholder="Company"
                  onChange={this.onChange}
                  value={this.state.company}
                  error={errors.company}
                  info="Your own company or one you work for"
                />
                <TextFieldGroup
                  name="website"
                  placeholder="Website"
                  onChange={this.onChange}
                  value={this.state.website}
                  error={errors.website}
                  info="Your own website or one you contributed to develop"
                />
                <TextFieldGroup
                  name="location"
                  placeholder="Location"
                  onChange={this.onChange}
                  value={this.state.location}
                  error={errors.location}
                  info="City or Town"
                />
                <TextFieldGroup
                  name="skills"
                  placeholder="Skills"
                  onChange={this.onChange}
                  value={this.state.skills}
                  error={errors.skills}
                  info="Please use comma seperatea values (eg. HTML,CSS,JavaScript,React,etc)"
                />
                <TextFieldGroup
                  name="githubusername"
                  placeholder="Github Username"
                  onChange={this.onChange}
                  value={this.state.githubusername}
                  error={errors.githubusername}
                  info="Show your repos to others"
                />
                <TextAreaFieldGroup
                  name="bio"
                  placeholder="Bio-something about yourself"
                  onChange={this.onChange}
                  value={this.state.bio}
                  error={errors.bio}
                  info="Tell us a little about yourself
                  "
                />
                <div className="mb-3">
                  <button
                    onClick={() =>
                      this.setState({
                        displaySocialInput: !this.state.displaySocialInput
                      })
                    }
                    className="btn btn-light mr-2"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialsInput}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  createProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateProfile));
