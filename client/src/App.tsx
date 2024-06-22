import "./styles/_index.scss"
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./pages/Home/Components/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import {AuthContextProvider} from "./Context/AuthContext/AuthContext.tsx";

export const loginRoute: string = "/login"
export const signupRoute: string = "/sign-up"

function App() {
  return (
    <>
      <AuthContextProvider>

        <Router />
      </AuthContextProvider>

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
      element: <Login loggingIn />
    },
    {
      path: signupRoute,
      element: <Login />
    }
  ])

  return <RouterProvider router={router} />


}

export default App
