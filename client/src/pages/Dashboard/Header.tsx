import "./_header.scss"
import Text from "../../Components/Text/Text.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useRef} from "react";
import {Link} from "react-router-dom";
import cx from "classnames";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";

function Header() {
  const logoutMenuContainerRef = useRef<HTMLDivElement>(null)
  const modalContainer = useRef<HTMLDivElement>(null)

  const {open} = useModal(logoutMenuContainerRef, modalContainer)
  const {logout} = useAuthContext();






  return (
    <div className="app__header">
      <div className="left-links ">
        <Text className="app__header__text logo \" heading>PantryPro </Text>
        <HeaderLink logo='database' name="Database" link='/dashboard' selected />
        <HeaderLink name="Meal Scheduler" logo="schedule" link="/" />
        <HeaderLink name="Setting" logo="settings" link="/" />
      </div>

      <div className="right-links" >

        <span ref={logoutMenuContainerRef}  className="material-symbols-outlined profile">
          account_circle
        </span>


        <div className={cx("logout-menu-container", {"logout-container--invisible": !open})} ref={modalContainer}>
            <div className="logout-menu">
                <div onClick={logout} className="logout-menu__item">
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    <Text bold>Sign out</Text>

                </div>
            </div>

        </div>


      </div>

      <div>

      </div>

    </div>
  )
}

function HeaderLink({
  logo,
  name,
  link,
  selected
}: {
  logo?: string,
  name: string,
  link: string,
  selected?: boolean
}) {

  const computedClasses = cx(
    "app__header__text",
    "link",
    {
      "selected": selected
    }
  )

  return (
    <div className="icon-name-pair">
      {
        logo &&
          <span className="material-symbols-outlined">
            {logo}
          </span>
      }
      <Text><Link className={computedClasses} to={link}>{name}</Link></Text>

    </div>
  )

}

export default Header