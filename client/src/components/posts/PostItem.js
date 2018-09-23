import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

class PostItem extends Component {
  onDeleteClick(id) {}

  render() {
    const { post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                height="100"
                width="100"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center font-weight-bold">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <br />
            <button type="button" className="btn btn-light mr-1">
              <i className="fas fa-thumbs-up" />
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
