import Header from "./Header/Header.tsx";
import Table from "./Table/Table.tsx";
import "./_dashboard.scss"


function Dashboard() {

  return (
    <>
      <div id="dashboard">

        <Header />
        <Table />
      </div>
    </>
  )
}

export default Dashboard