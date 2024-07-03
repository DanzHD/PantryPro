import Text from "../../Components/Text/Text.tsx";
import Button from "../../Components/Button/Button.tsx";

function TableSettings() {


  return <div className="table__setting">
    <div className="table__setting__tabs">
      <div className="table__setting__tab selected-tab">
        <Text>Food</Text>
      </div>


      <Text className="table__setting__title" subheading>Food Database</Text>


    </div>

    <div className="add-food">

      <Button id="add-button__override" onClick={() => console.log("Success")}>
        <span className="material-symbols-outlined">
          add
        </span>
        New Food
      </Button>
    </div>
  </div>

}

export default TableSettings