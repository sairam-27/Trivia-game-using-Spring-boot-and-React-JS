import { Button, FormControl, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import ResponsiveAppBar from "../Layout/Header";
import useHttp from "../../Hooks/use-http";
import { signIn } from "../../lib/api";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-store";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest, status } = useHttp(signIn);
  const dispatch = useDispatch();

  const onDataLoad = (data) => {
    dispatch(authActions.login({username,cookie : data.cookie}))
    setUsername("");
    setPassword("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        body: {
          username,
          password,
        },
        credentials: "include",
      },
      onDataLoad
    );
  };

  return (
    <div className="background">
      <ResponsiveAppBar />
      {status === "pending" && <h2>Loading...</h2>}
      {isLoggedIn && <h2 className="header">Logged in successfully!!</h2>}
      <h2 className="header">Sign In</h2>
      <div className="centerBox" >
        <form onSubmit={submitHandler}>
          <FormControl sx={{rowGap:5,p:5}}>
            <TextField
              required
              label="Username"
              style={{ width: 400 }}
              value={username}
              onChange={(v) => setUsername(v.target.value)}
            />
            <TextField
              required
              label="Password"
              type="password"
              value={password}
              onChange={(v) => setPassword(v.target.value)}
            />
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
