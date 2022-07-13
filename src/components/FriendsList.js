import React from "react";
import { getFriendsListCall } from "../components/GetFriendsData";
import { connect } from "react-redux";
import "../components/FriendsList.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import { addFriend, deleteFriend } from "../redux/Actions/Friends_List";
import FriendListData from "./FriendListData";

class FriendsList extends React.Component {
  constructor(props) {
    var favouriteValues = localStorage.getItem("favourites");
    super(props);
    this.state = {
      friendsNameList: [],
      favourite: favouriteValues != undefined ? favouriteValues.split(",") : [],
      startValue: 0,
      endValue: 4,
      sort: false,
      newFriendName: "",
      searchValue: false,
      searchName: "",
    };
  }

  componentDidMount() {
    getFriendsListCall().then((resolve) => {
      this.setState({
        ...this.state,
        friendsNameList: resolve,
      });
    });
  }

  addFavourite = (val) => {
    var setValue = [];
    if (this.state.favourite.includes(val) == true) {
      setValue = this.state.favourite.filter((x) => {
        return x != val;
      });
    } else {
      setValue = this.state.favourite.concat(val);
    }
    this.setState((prevState) => ({
      favourite: setValue,
      friendsNameList: prevState.friendsNameList,
    }));
    localStorage.setItem("favourites", setValue);
  };

  callPrevNext = (startValue, endValue) => {
    this.setState({
      ...this.state,
      startValue: startValue,
      endValue: endValue,
    });
  };

  handleSort = () => {
    this.setState({
      ...this.state,
      sort: !this.state.sort,
      startValue: 0,
      endValue: 4,
    });
  };

  onFriendsDelete = (val) => {
    this.props.deleteFriend(val);
  };

  handleValueChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      newFriendName: value,
    });
  };

  handleSearchValueChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      ...this.state,
      searchName: value,
    });
  };

  dispatchTheAction = (event) => {
    var finalToAdd = { name: this.state.newFriendName };
    if (event.key === "Enter") {
      this.setState({
        newFriendName: "",
      });
      this.props.addFriend(finalToAdd);
    }
  };

  searchFriend = () => {
    this.setState({
      ...this.state,
      searchValue: this.state.searchName.length !== 0 ? true : false,
    });
  };

  render() {
    var favouriteValues = localStorage.getItem("favourites");
    var splitArrfavouriteValues =
      favouriteValues != undefined ? favouriteValues.split(",") : [];

    let FriendsList = "";

    var sortData = [];
    if (
      this.props.data != undefined &&
      this.props.data != null &&
      this.props.data.length != 0
    ) {
      sortData = this.props.data.filter((values, index) => {
        if (this.state.favourite.includes(values.name)) {
          return values;
        }
      });
    }

    var searchedData = [];
    if (
      this.props.data != undefined &&
      this.props.data != null &&
      this.props.data.length != 0
    ) {
      searchedData = this.props.data.filter((values, index) => {
        if (values.name === this.state.searchName) {
          return values;
        }
      });
    }

    var dataLength =
      this.props.data != undefined &&
      this.props.data != null &&
      this.state.sort === false
        ? this.props.data.length
        : sortData != undefined && sortData != null && this.state.sort === true
        ? sortData.length
        : 0;

    if (
      this.props.data != undefined &&
      this.props.data != [] &&
      this.props.data != null &&
      this.state.sort === true &&
      this.state.searchValue === false
    ) {
      FriendsList = sortData
        .slice(this.state.startValue, this.state.endValue)
        .map((friends, index) => {
          return (
            <FriendListData
              friends={friends}
              splitArrfavouriteValues={splitArrfavouriteValues}
              addFavourite={(val) => this.addFavourite(val)}
              onFriendsDelete={(val) => this.onFriendsDelete(val)}
            />
          );
        });
    } else if (
      this.props.data != undefined &&
      this.props.data != [] &&
      this.props.data != null &&
      this.state.sort === false &&
      this.state.searchValue === false
    ) {
      FriendsList = this.props.data
        .slice(this.state.startValue, this.state.endValue)
        .map((friends, index) => {
          return (
            <FriendListData
              friends={friends}
              splitArrfavouriteValues={splitArrfavouriteValues}
              addFavourite={(val) => this.addFavourite(val)}
              onFriendsDelete={(val) => this.onFriendsDelete(val)}
            />
          );
        });
    } else if (
      this.props.data != undefined &&
      this.props.data != [] &&
      this.props.data != null &&
      this.state.sort === false &&
      this.state.searchValue === true
    ) {
      FriendsList = searchedData.map((friends, index) => {
        return (
          <FriendListData
            friends={friends}
            splitArrfavouriteValues={splitArrfavouriteValues}
            addFavourite={(val) => this.addFavourite(val)}
            onFriendsDelete={(val) => this.onFriendsDelete(val)}
          />
        );
      });
    }

    return (
      <div
        style={{
          marginTop: "5%",
        }}
        className="friends-list-main-div"
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="Friends-list-heading-div">
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <div>
                <text className="friends-list-heading">Friends List</text>
              </div>
              <div
                style={{
                  marginLeft: "25px",
                  marginTop: "-12px",
                }}
              >
                <TextField
                  name="Search"
                  helperText="Mind the case sensitiveness"
                  placeholder="Search.."
                  margin="normal"
                  onKeyPress={this.searchFriend}
                  onChange={this.handleSearchValueChange}
                  value={this.state.searchName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginTop: "12px",
                  marginLeft: "25px",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faFilter}
                  style={{
                    fontSize: "1.2em",
                    color: "#A3A3A3",
                  }}
                  onClick={() => this.handleSort()}
                />
              </div>
            </div>
          </div>
          <div className="search-bar-div">
            <div
              style={{
                padding: "10px",
              }}
            >
              <TextField
                name="fullName"
                placeholder="Enter new friend's name..."
                margin="normal"
                onKeyPress={this.dispatchTheAction}
                onChange={this.handleValueChange}
                value={this.state.newFriendName}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  width: "100%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              width: "100%",
            }}
          >
            {FriendsList}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              pointerEvents: this.state.startValue !== 0 ? "auto" : "none",
            }}
            onClick={() => {
              this.callPrevNext(
                this.state.startValue - 4,
                this.state.endValue - 4
              );
            }}
            className="prev-next-button-div"
          >
            Prev
          </div>
          <div
            onClick={() => {
              this.callPrevNext(
                this.state.startValue + 4,
                this.state.endValue + 4
              );
            }}
            style={{
              marginLeft: "80%",
              pointerEvents:
                this.state.endValue >= dataLength ? "none" : "auto",
            }}
            className="prev-next-button-div"
          >
            Next
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.fetchFriendsDetailsReducer.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (newFriend) => dispatch(addFriend(newFriend)),
    deleteFriend: (removeFriend) => dispatch(deleteFriend(removeFriend)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
