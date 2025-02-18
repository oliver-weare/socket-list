import axios from "axios";

import { useAppContext } from "../context/AppContext";

import DeleteItemButton from "./buttons/DeleteItemButton";
import ShiftItemButton from "./buttons/ShiftItemButton";

const ListItem = ({ item, expired }) => {
  const { todayListID } = useAppContext();

  const handleTogglePicked = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/items/toggle-picked/${item._id}`
      );
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-between mb-2">
      <button
        className={`toggle-item-button btn d-flex align-items-center rounded-pill ${
          expired && !item.pickedUp ? "btn-warning" : "btn-outline-dark"
        }`}
        onClick={handleTogglePicked}
        disabled={expired}
      >
        <span className={`${item.pickedUp ? "item-text-picked" : "item-text"}`}>
          {item.name}
        </span>
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
      </button>
      {!expired && <DeleteItemButton item={item} />}
      {expired && !item.pickedUp && todayListID && (
        <ShiftItemButton item={item} todayListID={todayListID} />
      )}
    </div>
  );
};

export default ListItem;
