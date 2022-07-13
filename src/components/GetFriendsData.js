import axios from "axios";
import {
    fetchFriendsDetailRequest,
    fetchFriendsDetails,
} from "../redux/Actions/Friends_List";
import store from "../redux/Store";

export function getFriendsListCall() {
  return new Promise((resolve, reject) => {
    var url = "https://swapi.dev/api/people/";
    store.dispatch(fetchFriendsDetailRequest());
    return axios
      .get(url, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        store.dispatch(fetchFriendsDetails(response.data.results));
        return resolve(response.data.results);
      })
      .catch((err) => {
        console.log("err", err);
      });
  });
}