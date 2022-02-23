import { Button, Stack } from "@mui/material";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import QuizOptions from "../Data/QuizOptions";
import ResponsiveAppBar from "../Layout/Header";
import QuizOption from "./QuizOption";
import { useDispatch } from "react-redux";
import { quizActions } from "../../Store/quiz-store";

const SelectOptions = () => {
  const { categories, difficulty } = QuizOptions();
  const history = useHistory();
  const dispatch = useDispatch();

  const onNextClickHandler = () => {
    dispatch(quizActions.clearSelectedOptions());
    history.push("/quiz/start");
  };

  const selects = [];
  selects.push({
    name: "Category",
    options: categories,
  });
  selects.push({
    name: "Difficulty",
    options: difficulty,
  });

  const selectedOptions = [];
  const optionSelectHandler = (name, option) => {
    selectedOptions.push({ name, option });
    if (name === "Category")
      dispatch(quizActions.setCategory({ category: option }));
    else dispatch(quizActions.setDifficulty({ difficulty: option }));
  };

  const menuItems = [];
  selects.map((select) => {
    return menuItems.push(
      <QuizOption
        key={Math.random()}
        name={select.name}
        options={select.options}
        onOptionSelect={optionSelectHandler}
      />
    );
  });

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="background">
        <div className="centerBox">
          <h2 className="header">Select Category and Difficulty</h2>
          {menuItems}
          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <Button variant="contained" sx={{ ml: "5%", mr: 50 }}>
              Prev
            </Button>
            <Button variant="contained" onClick={onNextClickHandler}>
              Next
            </Button>
          </Stack>
        </div>
      </div>
    </Fragment>
  );
};

export default SelectOptions;
