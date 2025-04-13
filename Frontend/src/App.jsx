import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import GetStarted from "./pages/GetStarted";
import GenerateResponse from "./pages/GenerateResponse";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import SearchUser from "./pages/SearchUser";
import EditProfile from "./pages/EditProfile";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  // const {user} = useContext(UserDataContext);
  // console.log("User in App:", user);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate-response"
          element={
            <ProtectedRoute>
              <GenerateResponse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/get-started"
          element={
            <ProtectedRoute>
              <GetStarted />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search-user"
          element={
            <ProtectedRoute>
              <SearchUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-password"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
