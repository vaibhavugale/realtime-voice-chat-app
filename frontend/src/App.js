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

  
  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          index 
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        ></Route>
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        ></Route>
        <Route
          path="/activate"
          element={
            <SemiProtected>
              <Activate />
            </SemiProtected>
          }
        ></Route>
        <Route
          path="/rooms"
          element={
            <Protected>
              <Room />
            </Protected>
          }
        ></Route>

      </Routes>
    </div>
  );
}

// Creating Protected Route Component

const GuestRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { user, isAuth } = useSelector((state) => state.authSlice);
  console.log(isAuth);
  return isAuth ? (
    <Navigate to="/rooms" state={{ from: location }} replace />
  ) : (
    children
  );
};
const SemiProtected = ({ children, ...rest }) => {
  const location = useLocation();
  const { user, isAuth } = useSelector((state) => state.authSlice);
  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    isAuth && !user.activate ? (children) : (<Navigate to="/rooms" state={{ from: location }} replace />)
  );
};
const Protected = ({ children, ...rest }) => {
  const location = useLocation();
  const { user, isAuth } = useSelector((state) => state.authSlice);
  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    isAuth && !user.activate ? (<Navigate to="/activate" state={{ from: location }} replace />) 
    :
     (children)
  );
};
export default App;
