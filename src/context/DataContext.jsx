import React, { createContext, useContext, useReducer } from "react";

import { snacks } from "../data/Data";

const DataContext = createContext();

const InitialData = {
  snackList: [...snacks],
  weight: "",
  price: "",
  calories: "",
  type: "",
  id: "",
  name: "",
  ingredients: "",
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
    case "SORT_WEIGHT": {
      return {
        ...state,
        weight: action.payload,
        type: "SORT_WEIGHT",
      };
    }
    case "SORT_ID": {
      return {
        ...state,
        id: action.payload,
        type: "SORT_ID",
      };
    }
    case "SORT_NAME": {
      return {
        ...state,
        name: action.payload,
        type: "SORT_NAME",
      };
    }
    case "SORT_INGREDIENTS": {
      return {
        ...state,
        ingredients: action.payload,
        type: "SORT_INGREDIENTS",
      };
    }
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, InitialData);

  let sortedData = [...state.snackList];
  if (state.type === "SORT_PRICE") {
    sortedData = state.price
      ? [...state.snackList].sort((a, b) => {
          return state.price == "priceLow"
            ? a.price - b.price
            : b.price - a.price;
        })
      : sortedData;
  } else if (state.type === "SORT_CALORIES") {
    sortedData = state.calories
      ? [...state.snackList].sort((a, b) => {
          return state.calories == "caloriesLow"
            ? a.calories - b.calories
            : b.calories - a.calories;
        })
      : sortedData;
  } else if (state.type === "SORT_WEIGHT") {
    sortedData = state.weight
      ? [...state.snackList].sort((a, b) => {
          return state.weight === "weightLow"
            ? parseInt(a.product_weight.slice(0, -1)) -
                parseInt(b.product_weight.slice(0, -1))
            : parseInt(b.product_weight.slice(0, -1)) -
                parseInt(a.product_weight.slice(0, -1));
        })
      : sortedData;
  } else if (state.type === "SORT_ID") {
    sortedData = state.id
      ? [...state.snackList].sort((a, b) => {
          return state.id == "idLow" ? a.id - b.id : b.id - a.id;
        })
      : sortedData;
  } else if (state.type === "SORT_NAME") {
    sortedData = state.name
      ? state.name === "nameLow"
        ? [...state.snackList].sort((a, b) => {
            if (a.product_name > b.product_name) {
              return -1;
            } else if (a.product_name < b.product_name) {
              return 1;
            } else {
              return 0;
            }
          })
        : [...state.snackList].sort((a, b) => {
            if (a.product_name > b.product_name) {
              return 1;
            } else if (a.product_name < b.product_name) {
              return -1;
            } else {
              return 0;
            }
          })
      : sortedData;
  } else if (state.type === "SORT_INGREDIENTS") {
    const newArr = sortedData.map((current) => {
      return { ...current, ingredients: current.ingredients.join(",") };
    });
    sortedData = state.ingredients
      ? state.ingredients === "ingredientsLow"
        ? [...state.snackList].sort((a, b) => {
            if (a.ingredients > b.ingredients) {
              return -1;
            } else if (a.ingredients < b.ingredients) {
              return 1;
            } else {
              return 0;
            }
          })
        : [...state.snackList].sort((a, b) => {
            if (a.ingredients > b.ingredients) {
              return 1;
            } else if (a.ingredients < b.ingredients) {
              return -1;
            } else {
              return 0;
            }
          })
      : sortedData;
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
