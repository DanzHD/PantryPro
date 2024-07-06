import cx from "classnames";
import Text from "../Text/Text.tsx";
import "./_pagination.scss"

function Pagination({
  handlePageChange,
  numberOfPages,
  pageSelected,
  totalItems
}: {
  handlePageChange: (page: number) => void,
  numberOfPages: number,
  pageSelected: number,
  totalItems: number
}) {

  return (
    <>
      <div className="pagination">

        <div
          onClick={() => handlePageChange(pageSelected - 1)}
          className={cx(
            "material-symbols-outlined",
            "pagination__index",
            {

              "pagination__index--invisible": pageSelected === 0
            }
          )}
        >
            arrow_back
        </div>


        {
          [...Array(Math.ceil(numberOfPages)).keys()].map(i => {
            return (
              <div key={i} onClick={() => handlePageChange(i)}
                   className={cx("pagination__index", {"selected": pageSelected === i})}>
                <Text>{i + 1}</Text>
              </div>
            )
          })
        }


        <div
            onClick={() => handlePageChange(pageSelected + 1)}
            className={cx(
              "material-symbols-outlined",
              "pagination__index",
              {
                "pagination__index--invisible": !(pageSelected !== (numberOfPages - 1) && totalItems !== 0)
              }
            )}>
            chevron_right
        </div>

      </div>
    </>
  )
}

export default Pagination