import React, { createContext, useContext, useReducer } from "react";

import { snacks } from "../data/Data";

const DataContext = createContext();

const InitialData = {
  snackList: [...snacks],
  weight: "",
  price: "",
  calories: "",
  type: "",
};

const simpleString = (str) => {
  return str.trim().split(" ").join("").toLowerCase();
};

const DataReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_FILTER": {
      return {
        ...state,
        snackList: action.payload
          ? state.snackList.filter((current) => {
              return simpleString(current.product_name).includes(
                simpleString(action.payload)
              );
            })
          : [...snacks],
      };
    }

    case "SORT_PRICE": {
      return {
        ...state,
        price: action.payload,
        type: "SORT_PRICE",
      };
    }
    case "SORT_CALORIES": {
      return {
        ...state,
        calories: action.payload,
        type: "SORT_CALORIES",
      };
    }
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, InitialData);
  // console.log(state.price);

  let sortedData = [...state.snackList];
  if (state.type === "SORT_PRICE") {
    sortedData = state.price
      ? [...state.snackList].sort((a, b) => {
          console.log(a.price, b.price);
          return state.price == "priceLow"
            ? a.price - b.price
            : b.price - a.price;
        })
      : state.snackList;
  } else if (state.type === "SORT_CALORIES") {
    sortedData = state.calories
      ? [...state.snackList].sort((a, b) => {
          return state.calories == "caloriesLow"
            ? a.calories - b.calories
            : b.calories - a.calories;
        })
      : sortPrice;
  }

  return (
    <DataContext.Provider value={{ state, dispatch, sortedData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  return useContext(DataContext);
};

export { useData, DataProvider };
