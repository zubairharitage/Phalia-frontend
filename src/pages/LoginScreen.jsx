import React, { useState, useEffect } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bcrypt from "bcryptjs";

import ErrorMessage from "../components/ErrorMessage";
import { getUserAction } from "../actions/invoiceAction";

const LoginScreen = () => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.getUser);
  const [error, setError] = useState(false);

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const user = users.filter((val) => val.userName === input.username);
  const handleClick = () => {
    const pass = user.length !== 0 ? user[0].password : "";
    if (bcrypt.compareSync(input.password, pass)) {
      nevigate("/create");
      localStorage.setItem("isLoged", "login");
    }
    setError(true);
    setInput({
      username: "",
      password: "",
    });
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
          height: "400px",
        }}
      >
        {error && <ErrorMessage error="Invalid Username or Password" />}
        <TextField
          label="username"
          placeholder="Enter User Name"
          type="text"
          required
          name="username"
          value={input.username}
          onChange={handleChange}
          sx={{ margin: "5px", width: "70%" }}
        />
        <TextField
          label="password"
          placeholder="Enter Password"
          type="password"
          required
          name="password"
          value={input.password}
          onChange={handleChange}
          sx={{ margin: "5px", width: "70%" }}
        />
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ margin: "5px", width: "40%", padding: "8px" }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
export default LoginScreen;
