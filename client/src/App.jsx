import { useState, useEffect } from "react";

import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";

import { useAppContext } from "./context/AppContext";

import ListTypeSwitcher from "./components/ListTypeSwitcher";
import ListView from "./components/ListView";
import NewListButton from "./components/buttons/NewListButton";
import ItemForm from "./components/forms/ItemForm";

const socket = io(`${import.meta.env.VITE_API_URL}`);

const App = () => {
  const [lists, setLists] = useState([]);
  const [showBlockSubmissionOverlay, setShowBlockSubmissionOverlay] =
    useState(false);

  const {
    todayListID,
    setTodayListID,
    todayListItemNames,
    setTodayListItemNames,
    todayListExists,
    setTodayListExists,
  } = useAppContext();

  const fetchLists = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/lists/all`
      );
      setLists(response.data);

      const today = moment().format("DD-MM-YYYY");

      const todayList = response.data.find(
        (list) => moment(list.date).format("DD-MM-YYYY") === today
      );
      if (todayList) {
        setTodayListID(todayList._id);
        setTodayListItemNames(todayList.items.map((item) => item.name));
        setTodayListExists(true);
      }
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();

    socket.on("listAdded", (newList) => {
      console.log("New list added:", newList);
      fetchLists();
      setTodayListID(newList._id);
    });

    socket.on("itemAdded", (item) => {
      console.log("New item added:", item);
      fetchLists();
    });

    socket.on("itemToggled", ({ listID, item }) => {
      console.log("Item toggled:", item);
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listID
            ? {
                ...list,
                items: list.items.map((i) =>
                  i._id === item._id ? { ...i, pickedUp: item.pickedUp } : i
                ),
              }
            : list
        )
      );
    });

    socket.on("itemDeleted", ({ listID, itemID }) => {
      console.log("Received itemDeleted event with:", { listID, itemID });
      setLists((prevLists) =>
        prevLists.map((list) =>
          list._id === listID
            ? {
                ...list,
                items: list.items.filter((i) => i._id !== itemID),
              }
            : list
        )
      );
    });

    socket.on("itemShifted", (item, originalItemListID, newListID) => {
      console.log(
        `Item shifted:, ${item._id} from ${originalItemListID} to ${newListID}`
      );
      fetchLists();
    });

    return () => {
      socket.off("itemAdded");
      socket.off("itemToggled");
      socket.off("listAdded");
      socket.off("itemDeleted");
    };
  }, []);

  const handleBlockSubmissionChange = (isBlocked) => {
    setShowBlockSubmissionOverlay(isBlocked);
  };

  return (
    <div>
      <ListTypeSwitcher />
      <ListView
        todayListID={todayListID}
        lists={lists}
        showBlockSubmissionOverlay={showBlockSubmissionOverlay}
      />
      {todayListExists ? (
        <ItemForm
          itemNames={todayListItemNames}
          showBlockSubmissionOverlay={showBlockSubmissionOverlay}
          onBlockSubmissionChange={handleBlockSubmissionChange}
        />
      ) : (
        <NewListButton />
      )}
    </div>
  );
};

export default App;
