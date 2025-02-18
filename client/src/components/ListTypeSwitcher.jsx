import { useAppContext } from "../context/AppContext";

const ListTypeSwitcher = () => {
  const { currentCategory, setCurrentCategory } = useAppContext();

  const handleSetCategoryToGrocery = () => {
    setCurrentCategory("grocery");
  };

  const handleSetCategoryToTodo = () => {
    setCurrentCategory("todo");
  };

  return (
    <div className="list-type-toggle-container">
      <button
        className={`list-type-button btn  me-1 ${
          currentCategory === "grocery" ? "disabled btn-success" : "btn-dark"
        }`}
        onClick={handleSetCategoryToGrocery}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-bag-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
        </svg>
      </button>
      <button
        className={`list-type-button btn ms-1 ${
          currentCategory === "todo" ? "disabled btn-success" : "btn-dark"
        }`}
        onClick={handleSetCategoryToTodo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-check-all"
          viewBox="0 0 16 16"
        >
          <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
        </svg>
      </button>
    </div>
  );
};

export default ListTypeSwitcher;
