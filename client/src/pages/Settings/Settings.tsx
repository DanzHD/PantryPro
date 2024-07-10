import Header from "../Dashboard/Header/Header.tsx";
import {Page} from "../../enum/Pages.tsx";
import Body from "./Body.tsx";


function Settings() {


  
  return (
    <>
      <div className="settings">

        <Header pageSelected={Page.SETTINGS} />
        <Body />
      </div>
    </>
  )
}

export default Settings