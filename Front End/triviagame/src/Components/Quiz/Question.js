import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { quizActions } from "../../Store/quiz-store";

const Question = (props) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      quizActions.setOptionSelectedForQuestion({data : {
        question: props.ques,
        optionSelected: event.target.value,
      }})
    );
  };

  return (
    <div
      style={{
        borderBottom: "1px solid",
        borderBottomColor: "red",
        margin: 40,
      }}
    >
      <FormControl>
        <FormLabel id="question" sx={{ textAlign: "left" }}>
          {props.ques}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="question"
          name="question"
          onChange={handleChange}
        >
          {props.options.map((option) => {
            return (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                sx={{ margin: 1 }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default Question;
