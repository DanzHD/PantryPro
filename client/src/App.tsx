import "./styles/_index.scss"
import {
   Route, BrowserRouter as Router, Routes
} from "react-router-dom";
import Home from "./pages/Home/Components/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import {AuthContextProvider} from "./Context/AuthContext/AuthContext.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./util/ProtectedRoute.tsx";
import Verify from "./pages/Verify/Verify.tsx";

export const loginRoute: string = "/login"
export const signupRoute: string = "/sign-up"
export const dashboardRoute: string = "/dashboard"
const verifyRoute: string = "/verify"

function App() {


  return (
    <>
      <AuthContextProvider>

        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Dashboard />} path={dashboardRoute} />
            </Route>
            <Route element={<Login loggingIn />} path={loginRoute} />
            <Route element={<Login />} path={signupRoute} />
            <Route element={<Verify />} path={verifyRoute} />
            <Route errorElement={<Home />} element={<Home /> } path={"/"} />

          </Routes>
        </Router>
      </AuthContextProvider>

    </>
  )

}



export default App
