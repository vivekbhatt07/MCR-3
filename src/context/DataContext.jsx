import React, { createContext, useContext, useReducer } from "react";

import { snacks } from "../data/Data";

const DataContext = createContext();

const InitialData = {
  snackList: [...snacks],
};

const DataReducer = (state, action) => {
  switch (action.type) {
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, InitialData);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { useData, DataProvider };
