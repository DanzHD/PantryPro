import Header from "./Header/Header.tsx";
import Table from "./Table/Table.tsx";
import "./_dashboard.scss"
import {Page} from "../../enum/Pages.tsx";


function Dashboard() {

  return (
    <>
      <div id="dashboard">

        <Header pageSelected={Page.DATABASE} />
        <Table />
      </div>
    </>
  )
}

export default Dashboard