import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import fetchFriendsDetailsReducer from "../redux/Reducers/Friends_List_Reducer";

let composeEnhancers = compose;

const rootReducer = combineReducers({ fetchFriendsDetailsReducer });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  // console.log(`Store data is ${JSON.stringify(store.getState())}`)
});

export default store;
