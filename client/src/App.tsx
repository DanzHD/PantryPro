import "./styles/_index.scss"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./pages/Home/Components/Home.tsx";

function App() {
  return (
    <>
      <Router />

    </>
  )

}

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Home />
    }
  ])

  return <RouterProvider router={router} />


}

export default App
