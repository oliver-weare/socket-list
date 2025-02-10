/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const TodayListContext = createContext();

export const TodayListProvider = ({ children }) => {
  const [todayListID, setTodayListID] = useState(null);
  const [todayListItemNames, setTodayListItemNames] = useState([]);
  const [todayListExists, setTodayListExists] = useState(false);

  return (
    <TodayListContext.Provider
      value={{
        todayListID,
        setTodayListID,
        todayListItemNames,
        setTodayListItemNames,
        todayListExists,
        setTodayListExists,
      }}
    >
      {children}
    </TodayListContext.Provider>
  );
};

export const useTodayList = () => useContext(TodayListContext);
