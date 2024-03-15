import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { setAuthToken } from "./pages/Auth/axiosConfig";
import API from "./pages/Auth/axiosConfig";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth(); 

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token") || undefined;
    setAuthToken(token);


    if (!user && token) {
      API.get("/api/user/profile")
        .then(response => setUser(response.data.user)) 
        .catch(error => console.error("Error fetching user profile:", error));
    }

    if (
      token &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate("/");
    } else if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [user, navigate, location.pathname, setUser]);

  return null;
};

export default AuthRedirect;
