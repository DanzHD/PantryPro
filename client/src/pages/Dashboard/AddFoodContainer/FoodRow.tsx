import FoodGroups from "../../../enum/foodGroups.tsx";
import "./_foodrow.scss"
import Text from "../../../Components/Text/Text.tsx";
import useModal from "../../../hooks/useModal/useModal.tsx";
import {useRef} from "react";

function FoodRow({
  name,
  foodGroup,
  expiryDate,
  removeRow
}: {
  name: string,
  foodGroup: FoodGroups,
  expiryDate: Date,
  removeRow: () => void
}) {
  const optionsRowRef = useRef<HTMLDivElement>(null)
  const {open} = useModal(optionsRowRef)

  return (
    <>
      <div className="food-row" >

        <div>
          <div>

            <div><Text bold>{`${name} - ${foodGroup}`}</Text> </div>
            <Text small className="food-row__expiry-date">{expiryDate.toDateString()}</Text>
          </div>
          <div>

            <div className="material-symbols-outlined" ref={optionsRowRef}>more_vert</div>
              {
                open &&
                  <div className="delete-row-container">
                      <div className="delete-row-menu">
                          <div onClick={removeRow} className="delete-row-menu__option">
                              <Text danger centered>Delete</Text>
                          </div>
                      </div>
                  </div>
              }
            </div>
          </div>


      </div>
    </>
  )

}

export default FoodRow