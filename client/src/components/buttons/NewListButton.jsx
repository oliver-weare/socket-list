import axios from "axios";
import moment from "moment";

const NewListButton = () => {
  const createNewList = async () => {
    const today = moment().format("DD-MM-YYYY");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/lists/create/${today}`,
        {
          items: [],
        }
      );
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  return (
    <button
      className={`w-100 btn btn-dark rounded-pill`}
      onClick={createNewList}
    >
      Start List
    </button>
  );
};

export default NewListButton;
