import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useSelector } from "react-redux";
import Navigation from "./components/shared/navigation/Navigation";
// import Register from "./pages/register/Register"
// import Login from "./pages/Login/Login"
import Room from "./pages/Rooms/Room"
import Authenticate from "./pages/authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";



function App() {


  const { user, isAuth } = useSelector((state) => state.authSlice);
  console.log("app.",user,isAuth)
  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          index 
          element={
            <GuestRoute user={user} isAuth={isAuth}>
              <Home />
            </GuestRoute>
          }
        ></Route>
        <Route
          path="/authenticate"
          element={
            <GuestRoute user={user} isAuth={isAuth}>
              <Authenticate />
            </GuestRoute>
          }
        ></Route>
        <Route
          path="/activate"
          element={
            <SemiProtected user={user} isAuth={isAuth}>
              <Activate />
            </SemiProtected>
          }
        ></Route>
        <Route
          path="/rooms"
          element={
            <Protected user={user} isAuth={isAuth}>
              <Room />
            </Protected>
          }
        ></Route>

      </Routes>
    </div>
  );
}

// Creating Protected Route Component

const GuestRoute = ({ children ,user, isAuth }) => {
  const location = useLocation();
  console.log("Guest")

  console.log(isAuth);
  return isAuth ? (
    <Navigate to="/rooms" state={{ from: location }} replace />
  ) : (
    children
  );
};
const SemiProtected = ({ children ,user, isAuth }) => {
  const location = useLocation();
  console.log("semi")

  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    isAuth && !user.activated ? (children) : (<Navigate to="/rooms" state={{ from: location }} replace />)
  );
};
const Protected = ({ children,user, isAuth }) => {
  const location = useLocation();
  console.log("pro")

  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    isAuth && !user.activated ? (<Navigate to="/activate" state={{ from: location }} replace />) 
    :
     (children)
  );
};
export default App;
