import "./styles/_index.scss"
import {
   Route, BrowserRouter as Router, Routes
} from "react-router-dom";
import Home from "./pages/Home/Components/Home.tsx";
import {AuthContextProvider} from "./Context/AuthContext/AuthContext.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./util/ProtectedRoute.tsx";
import Verify from "./pages/Verify/Verify.tsx";
import Settings from "./pages/Settings/Settings.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MealPlanner from "./pages/MealPlanner/MealPlanner.tsx";
import Login from "./pages/Authentication/Login.tsx";
import Signup from "./pages/Authentication/Signup.tsx";
import {MealGenerator} from "./pages/MealGenerator/MealGenerator.tsx";

export const loginRoute: string = "/login"
export const signupRoute: string = "/sign-up"
export const dashboardRoute: string = "/dashboard"
const verifyRoute: string = "/verify"
export const settingsRoute: string = "/settings"
export const mealRoute: string = "/meal-schedule"
export const mealGeneratorRoute: string = "/meal-generator"

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
                            <Route element={<MealPlanner />} path={mealRoute} />
                            <Route element={<MealGenerator />} path={mealGeneratorRoute} />
                        </Route>
                        <Route element={<Login />} path={loginRoute} />
                        <Route element={<Signup />} path={signupRoute} />
                        <Route element={<Verify />} path={verifyRoute} />
                        <Route errorElement={<Home />} element={<Home /> } path={"/"} />


                    </Routes>
                </Router>
            </AuthContextProvider>


        </>
    )

}



export default App
