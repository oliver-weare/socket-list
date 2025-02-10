/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import styled from "styled-components";

import ListItem from "./ListItem";

const ListContainer = styled.div`
  margin-bottom: 1em;
`;

const List = ({ date, items = [], expired }) => {
  const [listItems, setListItems] = useState(items);
  const [itemsPickedUp, setItemsPickedUp] = useState(0);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  useEffect(() => {
    const pickedUpItems = listItems.filter((item) => item.pickedUp).length;
    setItemsPickedUp(pickedUpItems);
  }, [listItems]);

  return (
    <ListContainer className="w-100 d-flex flex-column align-items-center">
      <h5>{date}</h5>
      {itemsPickedUp === items.length && items.length > 0 ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="green"
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
          className="bi bi-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        </svg>
      )}
      <p>
        {items.length === 0
          ? "No items"
          : `${itemsPickedUp} of ${items.length}`}
      </p>
      <ul className="list-group w-100">
        {listItems.map((item) => (
          <ListItem key={item._id} item={item} expired={expired} />
        ))}
      </ul>
    </ListContainer>
  );
};

export default List;
