import axios from "axios";
import { GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING } from "./types";

// add post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get all posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading);
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
