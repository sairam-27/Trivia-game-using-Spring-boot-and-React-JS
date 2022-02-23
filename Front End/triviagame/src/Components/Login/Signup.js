import { Button, FormControl, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import ResponsiveAppBar from "../Layout/Header";
import useHttp from "../../Hooks/use-http";
import { signup } from "../../lib/api";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { sendRequest, status } = useHttp(signup);
  const history = useHistory();

  const onDataLoad = (data) => {
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
    history.push("/login");
  };

  const submitHandler = (event) => {
    const roles = [];
    role.split(",").map((role) => {
      return roles.push(role);
    });
    event.preventDefault();
    sendRequest(
      {
        body: {
          username,
          password,
          email,
          roles,
        },
        credentials: "include",
      },
      onDataLoad
    );
  };

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="background">
        {status === "pending" && (
          <h2 style={{ position: "absolute" }}>Loading...</h2>
        )}

        <div className="centerBox">
          <h2 className="header">Sign Up</h2>
          <form onSubmit={submitHandler}>
            <FormControl sx={{ rowGap: 5, p: 5 }}>
              <TextField
                required
                label="Username"
                style={{ width: 400, color:"black", border:"1px solid"}}
                value={username}
                onChange={(v) => setUsername(v.target.value)}
              />
              <TextField
                required
                label="Password"
                type="password"
                value={password}
                className = "button"
                onChange={(v) => setPassword(v.target.value)}
              />
              <TextField
                required
                label="Email"
                type="email"
                style={{ width: 400 }}
                value={email}
                onChange={(v) => setEmail(v.target.value)}
              />
              <TextField
                required
                label="Roles"
                style={{ width: 400 }}
                value={role}
                onChange={(v) => setRole(v.target.value)}
              />
              <Button variant="outlined" type="submit" sty>
                Submit
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
