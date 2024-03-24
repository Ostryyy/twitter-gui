import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthToken } from "./pages/Auth/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "./store/features/auth/authSlice"
import API from "./pages/Auth/axiosConfig";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      undefined;
    setAuthToken(token);

    if (!user && token) {
      API.get("/api/user/profile")
        .then((response) => dispatch(setUser(response.data.user)))
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          dispatch(logoutUser())
          navigate("/login");
        });
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
  }, [user, navigate, location.pathname, dispatch]);

  return null;
};

export default AuthRedirect;
