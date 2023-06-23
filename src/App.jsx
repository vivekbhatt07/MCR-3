import { useState } from "react";
import "./App.css";
import { useData } from "./context/DataContext";

function App() {
  const { state, dispatch, sortedData } = useData();
  const [] = useState();

  const [searchText, setSearchText] = useState("");

  return (
    <div className="mx-auto flex flex-col gap-4 p-6">
      <h1 className="text-4xl">Snack Table</h1>
      <div>
        <input
          name="search_input"
          type="search"
          placeholder="Search with Products or Ingredients"
          className="border border-b-blue-950 w-96"
          onChange={(event) => {
            setSearchText(event.target.value);
            dispatch({ type: "SEARCH_FILTER", payload: event.target.value });
          }}
          value={searchText}
        />
      </div>
      <div>
        <table className="border">
          <thead>
            <tr className="border">
              <th className="w-40 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.id == "") {
                      dispatch({ type: "SORT_ID", payload: "idLow" });
                    } else if (state.id == "idHigh") {
                      dispatch({ type: "SORT_ID", payload: "idLow" });
                    } else if (state.id == "idLow") {
                      dispatch({ type: "SORT_ID", payload: "idHigh" });
                    }
                  }}
                >
                  Id
                </button>
              </th>
              <th className="w-40 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.name == "") {
                      dispatch({ type: "SORT_NAME", payload: "nameLow" });
                    } else if (state.name == "nameHigh") {
                      dispatch({ type: "SORT_NAME", payload: "nameLow" });
                    } else if (state.name == "nameLow") {
                      dispatch({ type: "SORT_NAME", payload: "nameHigh" });
                    }
                  }}
                >
                  Product Name
                </button>
              </th>
              <th className="w-40 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.weight == "") {
                      dispatch({ type: "SORT_WEIGHT", payload: "weightLow" });
                    } else if (state.weight == "weightHigh") {
                      dispatch({ type: "SORT_WEIGHT", payload: "weightLow" });
                    } else if (state.weight == "weightLow") {
                      dispatch({ type: "SORT_WEIGHT", payload: "weightHigh" });
                    }
                  }}
                >
                  Product Weight
                </button>
              </th>
              <th className="w-40 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.price == "") {
                      dispatch({ type: "SORT_PRICE", payload: "priceLow" });
                    } else if (state.price == "priceHigh") {
                      dispatch({ type: "SORT_PRICE", payload: "priceLow" });
                    } else if (state.price == "priceLow") {
                      dispatch({ type: "SORT_PRICE", payload: "priceHigh" });
                    }
                  }}
                >
                  Price INR
                </button>
              </th>
              <th className="w-40 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.calories == "") {
                      dispatch({
                        type: "SORT_CALORIES",
                        payload: "caloriesLow",
                      });
                    } else if (state.calories == "caloriesHigh") {
                      dispatch({
                        type: "SORT_CALORIES",
                        payload: "caloriesLow",
                      });
                    } else if (state.calories == "caloriesLow") {
                      dispatch({
                        type: "SORT_CALORIES",
                        payload: "caloriesHigh",
                      });
                    }
                  }}
                >
                  Calories
                </button>
              </th>
              <th className="w-100 border p-2">
                <button
                  className="cursor-pointer w-full h-full"
                  onClick={() => {
                    if (state.ingredients == "") {
                      dispatch({
                        type: "SORT_INGREDIENTS",
                        payload: "ingredientsLow",
                      });
                    } else if (state.ingredients == "ingredientsHigh") {
                      dispatch({
                        type: "SORT_INGREDIENTS",
                        payload: "ingredientsLow",
                      });
                    } else if (state.ingredients == "ingredientsLow") {
                      dispatch({
                        type: "SORT_INGREDIENTS",
                        payload: "ingredientsHigh",
                      });
                    }
                  }}
                >
                  Ingredients
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((currentRow) => {
              return (
                <tr key={currentRow.id} className="border">
                  <td className="border text-center p-2">{currentRow.id}</td>
                  <td className="border text-center p-2">
                    {currentRow.product_name}
                  </td>
                  <td className="border text-center p-2">
                    {currentRow.product_weight}
                  </td>
                  <td className="border text-center p-2">{currentRow.price}</td>
                  <td className="border text-center p-2">
                    {currentRow.calories}
                  </td>
                  <td className="border text-center p-2">
                    {currentRow.ingredients.join(", ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
