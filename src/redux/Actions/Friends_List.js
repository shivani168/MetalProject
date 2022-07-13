import {
  FETCH_FRIENDS_DETAILS_REQUEST,
  FETCH_FRIENDS_DETAILS,
  ADD_FRIEND,
  DELETE_FRIEND
} from "../Actions/constant";

export const fetchFriendsDetailRequest = () => {
  return {
    type: FETCH_FRIENDS_DETAILS_REQUEST,
  };
};
export const fetchFriendsDetails = (data) => {
  return {
    type: FETCH_FRIENDS_DETAILS,
    data: data,
  };
};
export const addFriend = (val) => {
  return {
    type: ADD_FRIEND,
    payload: val,
  };
};

export const deleteFriend = (val) => {
  return {
    type: DELETE_FRIEND,
    payload: val,
  };
};
