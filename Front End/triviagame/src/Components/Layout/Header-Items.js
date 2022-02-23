import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

const HeaderItems = (props) => {
  const history = useHistory();

  const onClickHandler = () => {
    if (props.page === "Take a quiz") history.push("/quiz/select");
    else if (props.page === "History") history.push("/user/history");
    else if (props.page === "Global Ranks") history.push("/global/history");
    else if (props.page === "Sign up") history.push("/signup");
  };
  return (
    <Button
      key={props.page}
      sx={{ my: 2, color: "white", display: "block" }}
      onClick={onClickHandler}
    >
      {props.page}
    </Button>
  );
};

export default HeaderItems;
