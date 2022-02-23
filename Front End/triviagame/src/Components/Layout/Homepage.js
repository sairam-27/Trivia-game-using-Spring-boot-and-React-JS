import { Fragment } from "react";
import ResponsiveAppBar from "./Header";
import "../../index.css";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
  const history = useHistory();

  const onLoginClick = () => {
    history.push("/login");
  };

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="background">
        <p
          style={{
            position: "absolute",
            color: "navy",
            fontFamily: "Neucha",
            fontSize: "50px",
            marginLeft: "50rem",
          }}
        >
          Lets get started!!!
        </p>
        <div
          style={{
            marginLeft: "70rem",
            position: "absolute",
            marginTop: "12rem",
          }}
        >
          <Button
            variant="outlined"
            type="submit"
            sx={{
              maxWidth: "300px",
              maxHeight: "300px",
              minWidth: "100px",
              minHeight: "50px",
              color: "black",
              fontSize: "20px",
              border: "3px solid",
              borderColor: "navy",
            }}
            onClick={onLoginClick}
          >
            Login
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
