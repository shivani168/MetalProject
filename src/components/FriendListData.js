import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

export default function FriendListData(props) {
  const [state, setState] = React.useState({
    deleteModalOpen: false,
  });

  const openDeleteModal = () => {
    setState({
      ...state,
      deleteModalOpen: true,
    });
  };

  const closeDeleteModal = () => {
    setState({
      ...state,
      deleteModalOpen: false,
    });
  };

  const addFavourite = (val) => {
    props.addFavourite(val);
  };

  const onFriendsDelete = (val) => {
    props.onFriendsDelete(val);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          borderTop: "1px solid #d1c7c7e6",
          width: "100%",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "65%",
            }}
          >
            <text
              style={{
                fontSize: "17px",
                fontWeight: "600",
                letterSpacing: "0.4px",
              }}
            >
              {props.friends.name}
            </text>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display:
                  props.splitArrfavouriteValues != undefined &&
                  props.splitArrfavouriteValues.includes(props.friends.name) ===
                    false
                    ? "block"
                    : "none",
                width: "40px",
                border: "1px solid #A3A3A3",
                cursor: "pointer",
              }}
              onClick={() => {
                addFavourite(props.friends.name);
              }}
            >
              <StarBorderIcon
                style={{
                  marginLeft: "22%",
                  marginTop: "2px",
                }}
              />
            </div>
            <div
              style={{
                display:
                  props.splitArrfavouriteValues != undefined &&
                  props.splitArrfavouriteValues.includes(props.friends.name) ===
                    true
                    ? "block"
                    : "none",
                width: "40px",
                border: "1px solid #A3A3A3",
                cursor: "pointer",
              }}
            >
              <StarIcon
                style={{
                  marginLeft: "22%",
                  marginTop: "2px",
                  color: "#fcad03",
                }}
              />
            </div>
            <div
              style={{
                marginLeft: "20px",
                width: "40px",
                border: "1px solid #A3A3A3",
                cursor: "pointer",
              }}
              onClick={() => {
                openDeleteModal();
              }}
            >
              <DeleteOutlineIcon
                style={{
                  marginLeft: "22%",
                  marginTop: "2px",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "-10px",
          }}
        >
          <text
            style={{
              color: "#A3A3A3",
              fontSize: "15px",
              fontWeight: "500",
              letterSpacing: "0.4px",
            }}
          >
            is your friend
          </text>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={state.deleteModalOpen}
        onClose={closeDeleteModal}
        BackdropComponent="false"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            height: "30vh",
            width: "35vw",
            border: "1px solid #A3A3A3",
            backgroundColor: "#dcdcdc",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <text
              style={{
                fontSize: "16px",
                fontWeight: "500",
                letterSpacing: "0.8px",
              }}
            >
              Are you sure? You want to delete your friend for real?
            </text>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "25px",
            }}
          >
            <div>
              <Button
                type="submit"
                style={{
                  borderRadius: "50px",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onFriendsDelete(props.friends.name);
                  closeDeleteModal();
                }}
              >
                Delete
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                style={{
                  borderRadius: "50px",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
                onClick={() => {
                  closeDeleteModal();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
