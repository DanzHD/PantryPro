import "./_table.scss"
import Text from "../../Components/Text/Text.tsx";
import SearchBar from "../../Components/SearchBar/SearchBar.tsx";
import Select from "../../Components/SelectInput/Select.tsx";
import foodGroup from "../../enum/foodGroups.tsx";
import TableSettings from "./TableSettings.tsx";

function Table() {

  return (
    <div className="table">
      <TableSettings />

      <div className="table__filter">
        <SearchBar placeholder={"Search"}/>
        <Select options={Object.values(foodGroup)}/>
        <div className="search-icon__container">
          <span className="material-symbols-outlined">
            search
          </span>
        </div>
      </div>

      <table className="table__data">


        <thead>
          <tr>
            <th className="th__checkbox"><input type="checkbox"/></th>
            <th><Text bold>Name</Text></th>
            <th><Text bold>Quantity</Text></th>
            <th><Text bold>Food Group</Text> </th>
            <th><Text bold>Expiry Date</Text></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox"/></td>
            <td><Text>Potato</Text></td>
            <td><Text>500 Grams</Text></td>
            <td><Text>Vegetable</Text></td>
            <td><Text>27th of July</Text></td>
          </tr>
          <tr>
            <td><input type="checkbox"/></td>
            <td><Text>Potato</Text></td>
            <td><Text>500 Grams</Text></td>
            <td><Text>Vegetable</Text></td>

            <td><Text>27th of July</Text></td>
          </tr>
          <tr>
            <td><input type="checkbox"/></td>
            <td><Text>Potato</Text></td>
            <td><Text>500 Grams</Text></td>
            <td><Text>Vegetable</Text></td>

            <td><Text>27th of July</Text></td>
          </tr>
        </tbody>

      </table>

    </div>
  )

}

export default Table