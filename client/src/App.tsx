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
import Settings from "./pages/Settings/Settings.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const loginRoute: string = "/login"
export const signupRoute: string = "/sign-up"
export const dashboardRoute: string = "/dashboard"
const verifyRoute: string = "/verify"
export const settingsRoute: string = "/settings"

function App() {


  return (
    <>
      <ToastContainer />

      <AuthContextProvider>

        <Router>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<Dashboard />} path={dashboardRoute} />
              <Route element={<Settings />} path={settingsRoute} />
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
