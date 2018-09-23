import { ADD_POST } from "../actions/types";
const initialState = {
  loading: false,
  posts: [],
  post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}
