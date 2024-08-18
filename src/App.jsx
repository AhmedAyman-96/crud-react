import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { UserProvider } from "./context/userContext";
function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home></Home>
                </PrivateRoute>
              }></Route>
            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About></About>
                </PrivateRoute>
              }></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route></Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
