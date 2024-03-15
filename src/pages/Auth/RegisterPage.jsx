import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import API from "./axiosConfig";
import classes from "./Auth.module.css";
import logo from "../../assets/images/logo.png";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(
      API.post('/api/auth/register', { email, username, password })
        .then((response) => {
          navigate('/login');
          return response.data.message; 
        }),
      {
        pending: 'Registering...',
        success: 'Registration successful! Please log in.',
        error: {
          render({data}) {
            let message = 'Registration failed. Please try again.';
            if (data.response && data.response.data && data.response.data.error) {
              message = data.response.data.error;
            }
            return message;
          }
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Address Email"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            <span style={{ marginRight: "0.5em" }}>
              Already have an account?
            </span>
            <Link to="/login" variant="body2">
              Log in
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
}

export default RegisterPage;
