import {
  FETCH_FRIENDS_DETAILS_REQUEST,
  FETCH_FRIENDS_DETAILS,
  ADD_FRIEND,
  DELETE_FRIEND,
} from "../Actions/constant";

let initialState = {
  loading: false,
  data: "",
};

export default function fetchFriendsDetailsReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_FRIENDS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_FRIENDS_DETAILS:
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case ADD_FRIEND:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
      };
    case DELETE_FRIEND:
      return {
        data: [...state.data.filter((data) => data.name !== action.payload)],
      };
    default:
      return state;
  }
}
