import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API, { setAuthToken } from "./axiosConfig";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/features/auth/authSlice";

import classes from "./Auth.module.css";
import logo from "../../assets/images/logo.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      API.post("/api/auth/login", { email, password }).then((response) => {
        const { token, user } = response.data;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        dispatch(setUser(user));
        setAuthToken(token);
        navigate("/");
      }),
      {
        pending: "Logging in...",
        success: "Logged in successfully!",
        error: {
          render({ data }) {
            let message = "Login failed. Please check your credentials.";
            if (
              data.response &&
              data.response.data &&
              data.response.data.error
            ) {
              message = data.response.data.error;
            }
            return message;
          },
        },
      }
    );
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.box} elevation={2}>
        <div className={classes.logoContainer}>
          <img src={logo} alt="Logo" />
        </div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            <span style={{ marginRight: "0.5em" }}>Don't have an account?</span>
            <Link to="/register" variant="body2">
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default LoginPage;
