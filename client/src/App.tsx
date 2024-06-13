import "./styles/_index.scss"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./pages/Home/Components/Home.tsx";
import Login from "./pages/Login/Login.tsx";

export const loginRoute: string = "/login"

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
    },
    {
      path: loginRoute,
      element: <Login />
    }
  ])

  return <RouterProvider router={router} />


}

export default App
