import axios from "axios";

const ShiftItemButton = ({ item, todayListID }) => {
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
    <button
      type="button"
      className="shift-item-button btn btn-outline-dark rounded-pill ms-2 display-flex align-items-center justify-content-center"
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
  );
};

export default ShiftItemButton;
