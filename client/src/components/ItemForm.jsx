import { useState, useEffect } from "react";
import axios from "axios";

import { useAppContext } from "../context/AppContext";

const ItemForm = ({ showBlockSubmissionOverlay, onBlockSubmissionChange }) => {
  const [name, setName] = useState("");

  const {
    todayListID,
    todayListItemNames,
    setTodayListItemNames,
    currentCategory,
  } = useAppContext();

  useEffect(() => {
    if (todayListItemNames.includes(name)) {
      onBlockSubmissionChange(true);
    } else {
      onBlockSubmissionChange(false);
    }
  }, [name]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/items/create`, {
        name,
        listID: todayListID,
        category: currentCategory,
      });

      setTodayListItemNames((prevNames) => [...prevNames, name]);
      setName("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <form
      className="w-100 d-flex flex-row justify-content-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-75 form-control me-2 rounded-pill"
        placeholder="Item"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        type="submit"
        className="add-item-button w-25 btn btn-dark rounded-pill"
        disabled={showBlockSubmissionOverlay}
      >
        Add
      </button>
    </form>
  );
};

export default ItemForm;
