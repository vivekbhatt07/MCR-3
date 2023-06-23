import "./App.css";
import { useData } from "./context/DataContext";

function App() {
  const { state, dispatch } = useData();
  return (
    <div className="mx-auto flex flex-col gap-4">
      <h1 className="text-4xl">Snack Table</h1>
      <div>
        <input
          name="search_input"
          type="search"
          placeholder="Search with Products or Ingredients"
          className="border border-b-blue-950 w-96"
        />
      </div>
      <div>
        <table className="border">
          <tr className="border">
            <th className="w-60 border p-2">Id</th>
            <th className="w-60 border p-2">Product Name</th>
            <th className="w-60 border p-2">Product Weight</th>
            <th className="w-60 border p-2">Price INR</th>
            <th className="w-60 border p-2">Calories</th>
            <th className="w-60 border p-2">Ingredients</th>
          </tr>

          {state.snackList.map((currentRow) => {
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
                  {currentRow.ingredients}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
