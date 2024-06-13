import "../Styles/_header.scss"
import cx from "classnames";
import Text from "../../../Components/Text/Text.tsx";
import Button from "../../../Components/Button/Button.tsx";
import useScroll, {ScrollDirection} from "../../../hooks/useScrollPosition/useScroll.tsx";
import {Link, useNavigate} from "react-router-dom";
import {loginRoute} from "../../../App.tsx";

function Header({
  classNames,
  sticky
}: {
  classNames?: string,
  sticky?: boolean
}) {

  const navigate = useNavigate()

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
        <Text heading><Link to={"/"}>PantryPro</Link></Text>

      </div>
      <div className="header__right-items">
        <Text styles={{color: 'white'}}><Link to={loginRoute}>Log in</Link></Text>
        <Button small onClick={() => navigate(loginRoute)}>Sign up</Button>
      </div>

    </div>
  </>
}




export default Header