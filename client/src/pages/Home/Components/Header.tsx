import "../Styles/_header.scss"
import cx from "classnames";
import Text from "../../../Components/Text/Text.tsx";
import Button from "../../../Components/Button/Button.tsx";
import useScroll, {ScrollDirection} from "../../../hooks/useScrollPosition/useScroll.tsx";

function Header({
  classNames,
  sticky
}: {
  classNames?: string,
  sticky?: boolean
}) {
  const {scrollDirection} = useScroll()
  const computedClasses = cx(
    "header",
    {
      "header--sticky": sticky,
      "header--hidden": scrollDirection == ScrollDirection.DOWN
    },
    classNames
  )

  return <>
    <div className={computedClasses}>
      <div className="header__logo">
        <Text heading><a>PantryPro</a></Text>

      </div>
      <div className="header__right-items">
        <Text styles={{color: 'white'}}><a>Log in</a></Text>
        <Button small>Sign up</Button>
      </div>

    </div>
  </>
}




export default Header