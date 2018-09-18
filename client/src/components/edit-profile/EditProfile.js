import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
class EditProfile extends Component {
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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const { profile } = nextProps.profile;
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.skillsEdit = profile.skills.join(",");
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: profile.skillsEdit,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        youtube: profile.youtube,
        linkedin: profile.linkedin,
        instagram: profile.instagram,
        facebook: profile.facebook
      });
    }
  }

  render() {
    const { errors } = this.state;
    const selecOptions = [
      { label: "* Select your level status", value: "" },
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
              <h1 className="display-5 text-center">Edit your profile</h1>
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
                    type="button"
                    onClick={() => {
                      this.setState({
                        displaySocialInput: !this.state.displaySocialInput
                      });
                    }}
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

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
