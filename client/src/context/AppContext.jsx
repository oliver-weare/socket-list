import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [todayListID, setTodayListID] = useState(null);
  const [todayListItemNames, setTodayListItemNames] = useState([]);
  const [todayListExists, setTodayListExists] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("grocery");

  return (
    <AppContext.Provider
      value={{
        todayListID,
        setTodayListID,
        todayListItemNames,
        setTodayListItemNames,
        todayListExists,
        setTodayListExists,
        currentCategory,
        setCurrentCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
