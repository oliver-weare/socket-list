import { useState, useEffect } from "react";

import ListItem from "./ListItem";

const List = ({ date, items = [], expired }) => {
  const [listItems, setListItems] = useState(items);

  const [groceryItems, setGroceryItems] = useState([]);
  const [toDoItems, setToDoItems] = useState([]);
  const [groceryItemsPickedUp, setGroceryItemsPickedUp] = useState(0);
  const [toDoItemsDone, setToDoItemsDone] = useState(0);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  useEffect(() => {
    setGroceryItems(listItems.filter((item) => item.category === "grocery"));
  }, [listItems]);

  useEffect(() => {
    setToDoItems(listItems.filter((item) => item.category === "todo"));
  }, [listItems]);

  useEffect(() => {
    setGroceryItemsPickedUp(
      groceryItems.filter((item) => item.pickedUp).length
    );
  }, [groceryItems]);

  useEffect(() => {
    setToDoItemsDone(toDoItems.filter((item) => item.pickedUp).length);
  }, [toDoItems]);

  return (
    <div className="w-100 d-flex flex-column align-items-center mb-4">
      <h5>{date}</h5>
      <div className="list-tracking-container">
        <div className="grocery-items-tracking-container">
          {groceryItemsPickedUp === groceryItems.length &&
          groceryItems.length > 0 ? (
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
          <p>
            {items.length === 0
              ? "No groceries"
              : `${groceryItemsPickedUp} of ${groceryItems.length}`}
          </p>
        </div>
        <div className="todo-items-tracking-container">
          {toDoItemsDone === toDoItems.length && toDoItems.length > 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-check-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
            </svg>
          )}
          <p>
            {items.length === 0
              ? "No groceries"
              : `${toDoItemsDone} of ${toDoItems.length}`}
          </p>
        </div>
      </div>
      <ul className="list-group w-100">
        {listItems.map((item) => (
          <ListItem key={item._id} item={item} expired={expired} />
        ))}
      </ul>
    </div>
  );
};

export default List;
