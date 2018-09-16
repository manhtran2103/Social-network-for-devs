import axios from "axios";
import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE } from "./types";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .post("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});
