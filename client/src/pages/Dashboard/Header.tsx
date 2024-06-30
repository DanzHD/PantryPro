import "./_header.scss"
import Text from "../../Components/Text/Text.tsx";

function Header({
  selectedTab
}: {
  selectedTab: number
}) {

  return (
    <div className="app__header">
      <div className="left-links ">
        <Text className="app__header__text logo " heading>PantryPro </Text>
        <HeaderLink logo='database' name="Database" link='database' />
        <HeaderLink name="Meal Scheduler" logo="schedule" />
        <HeaderLink name="Setting" logo="settings" />
      </div>

      <div className="right-links">
        <span className="material-symbols-outlined">
          account_circle
        </span>
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