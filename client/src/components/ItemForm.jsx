/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const ItemForm = ({
  listID,
  itemNames = [],
  showBlockSubmissionOverlay,
  onBlockSubmissionChange,
}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (itemNames.includes(name)) {
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
        quantity: Number(quantity),
        listID: listID,
      });

      setName("");
      setQuantity(1);
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
        className="w-25 btn btn-dark rounded-pill"
        disabled={showBlockSubmissionOverlay}
      >
        Add
      </button>
    </form>
  );
};

export default ItemForm;
