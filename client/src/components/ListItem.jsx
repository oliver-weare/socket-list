/* eslint-disable react/prop-types */
import styled from "styled-components";
import axios from "axios";

import { useTodayList } from "../context/TodayListContext";

const ItemNameContainer = styled.button`
  text-align: left;
`;

const ItemText = styled.span`
  text-decoration: ${(props) => (props.pickedUp ? "line-through" : "none")};
  flex-grow: 1;
`;

const ListItem = ({ item, expired }) => {
  const { todayListID } = useTodayList();

  const handleTogglePicked = async () => {
    if (expired) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/items/toggle-picked/${item._id}`
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/items/${item._id}`
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleShift = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/items/shift/${item._id}`,
        { newListID: todayListID }
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <ItemNameContainer
        className={`btn  d-flex align-items-center rounded-pill ${
          expired && !item.pickedUp ? "btn-warning" : "btn-outline-dark"
        } w-100`}
        onClick={handleTogglePicked}
        disabled={expired}
      >
        <ItemText pickedUp={item.pickedUp}>{item.name}</ItemText>
        {item.pickedUp ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag-check-fill"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
        )}
      </ItemNameContainer>
      {!expired && (
        <button
          type="button"
          className="btn btn-outline-danger rounded-pill ms-2"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
          </svg>
        </button>
      )}
      {expired && !item.pickedUp && todayListID && (
        <button
          type="button"
          className="btn btn-outline-dark rounded-pill ms-2 display-flex align-items-center justify-content-center"
          onClick={handleShift}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-shift-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.27 2.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ListItem;
