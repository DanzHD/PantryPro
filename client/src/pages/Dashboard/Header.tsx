import "./_header.scss"
import Text from "../../Components/Text/Text.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useRef} from "react";

function Header({
  selectedTab
}: {
  selectedTab?: number
}) {
  const logoutMenuContainerRef = useRef<HTMLDivElement>(null)

  const {open} = useModal(logoutMenuContainerRef)

  return (
    <div className="app__header">
      <div className="left-links ">
        <Text className="app__header__text logo " heading>PantryPro </Text>
        <HeaderLink logo='database' name="Database" link='database' />
        <HeaderLink name="Meal Scheduler" logo="schedule" />
        <HeaderLink name="Setting" logo="settings" />
      </div>

      <div className="right-links" >

        <span ref={logoutMenuContainerRef}  className="material-symbols-outlined profile">
          account_circle
        </span>

        {
          open &&
            <div className="logout-menu-container">
                <div className="logout-menu">
                    <div className="logout-menu__item">
                        <span className="material-symbols-outlined">
                            logout
                        </span>
                        <Text bold>Sign out</Text>

                    </div>
                </div>

            </div>
        }

      </div>

      <div>

      </div>

    </div>
  )
}

function HeaderLink({
  logo,
  name,
  link
}: {
  logo?: string,
  name: string,
  link?: string
}) {

  return (
    <div className="icon-name-pair">
      {
        logo &&
          <span className="material-symbols-outlined">
            {logo}
          </span>
      }
      <Text className="app__header__text link">{name}</Text>

    </div>
  )

}

export default Header