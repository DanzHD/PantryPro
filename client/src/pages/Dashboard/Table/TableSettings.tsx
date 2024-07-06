import Text from "../../../Components/Text/Text.tsx";
import Button from "../../../Components/Button/Button.tsx";
import {useRef} from "react";
import Modal from "../../../Components/Modal/Modal.tsx";
import AddFoodModal from "../AddFoodContainer/AddFoodModal.tsx";
import {FoodRequestDto} from "../../../dto/FoodRequestDto.tsx";

function TableSettings({
  addFood
}: {
  addFood: ({ newFoods }: { newFoods: FoodRequestDto[]}) => void
}) {


  const addFoodModalRef = useRef<HTMLDialogElement>(null)

  function handleModalOpen() {
    if (!addFoodModalRef.current) {
      return
    }
    addFoodModalRef.current.showModal()
  }




  return <div className="table__setting">
    <Modal modalRef={addFoodModalRef} >
      <AddFoodModal addFood={addFood} modalRef={addFoodModalRef} />

    </Modal>


    <div className="table__setting__tabs">
      <div className="table__setting__tab selected-tab">
        <Text>Food</Text>
      </div>


      <Text className="table__setting__title" subheading>Food Database</Text>


    </div>

    <div className="add-food">

      <Button id="add-button__override" onClick={handleModalOpen}>
        <span className="material-symbols-outlined">
          add
        </span>
        New Food
      </Button>
    </div>
  </div>

}

export default TableSettings