import "./_header.scss"
import Text from "../../../Components/Text/Text.tsx";
import useModal from "../../../hooks/useModal/useModal.tsx";
import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import cx from "classnames";
import {useAuthContext} from "../../../Context/AuthContext/useAuthContext.tsx";
import {dashboardRoute, settingsRoute} from "../../../App.tsx";
import {Page} from "../../../enum/Pages.tsx";


function Header({
  pageSelected
}: {
  pageSelected: Page
}) {
  const logoutMenuContainerRef = useRef<HTMLDivElement>(null)
  const modalContainer = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const mobileHamburgerMenuRef = useRef<HTMLDivElement>(null)
  const {open: logoutContainerOpen} = useModal(logoutMenuContainerRef)
  const {open: hamburgerMenuOpen} = useModal(mobileHamburgerMenuRef)
  const {logout} = useAuthContext();

  return (
    <div className="app__header">
      <div className="left-links ">
        <Text className="app__header__text " heading>PantryPro </Text>
        <HeaderLink logo='database' name="Database" link='/dashboard' selected={pageSelected === Page.DATABASE} />
        <HeaderLink name="Meal Scheduler" logo="schedule" link="/" selected={pageSelected === Page.MEAL} />
        <HeaderLink name="Settings" logo="settings" link={settingsRoute} selected={pageSelected === Page.SETTINGS} />
      </div>

      <div className="right-links" >

        <span ref={logoutMenuContainerRef}  className="material-symbols-outlined profile">
          account_circle
        </span>


        <div className={cx("logout-menu-container", {"logout-container--invisible": !logoutContainerOpen})} ref={modalContainer}>
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

      <div className="mobile-header">
          <Text heading>PantryPro</Text>
          <div ref={mobileHamburgerMenuRef} className="material-symbols-outlined menu-icon">menu</div>

      </div>
      <div className={cx("mobile-menu", {"invisible": !hamburgerMenuOpen})}>
        <div className="mobile-menu__header">
          <Text bold subheading>Menu</Text>
          <div className="line-horizontal" />
        </div>
        <div className="mobile-menu__items">
          <div onClick={() => navigate(dashboardRoute)} className={cx({
            "selected": pageSelected === Page.DATABASE
          })}>
            <span className="material-symbols-outlined se">Database</span>
            <div>Database</div>

          </div>
          <div className={cx({
              "selected": pageSelected === Page.MEAL
            })}>
            <span className="material-symbols-outlined">schedule</span>
            <div>Meal Scheduler</div>
          </div>

          <div onClick={() => navigate(settingsRoute)} className={cx({
            "selected": pageSelected === Page.SETTINGS
          })}>
            <span className="material-symbols-outlined">settings</span>
            <div>Settings</div>
          </div>
          <div onClick={logout} className="logout-menu__item">
            <span className="material-symbols-outlined">logout</span>
            <div>Logout</div>
          </div>
        </div>
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