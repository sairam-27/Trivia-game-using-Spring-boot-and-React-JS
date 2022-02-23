import { Button } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useHttp from "../../Hooks/use-http";
import { getQuestions } from "../../lib/api";
import ResponsiveAppBar from "../Layout/Header";
import Question from "./Question";

const Quiz = () => {
  const category = useSelector((state) => state.quiz.category);
  const difficulty = useSelector((state) => state.quiz.difficulty);

  const [questionList, setQuestionList] = useState([]);
  const history = useHistory();

  const getQuizQuestions = useCallback((questions) => {
    setQuestionList(questions);
  }, []);

  const { sendRequest, status } = useHttp(getQuestions);

  useEffect(() => {
    sendRequest(
      {
        body: {
          category,
          difficulty,
        },
      },
      getQuizQuestions
    );
  }, [sendRequest, category, difficulty, getQuizQuestions]);

  const onNextClickHandler = () => {
    history.push("/quiz/complete");
  };

  return (
    <Fragment>
      <ResponsiveAppBar />
        {status === "pending" && <h2>Loading...</h2>}
        {status === "success" && (
          <div>
            <div className="centerBox" style={{ marginRight: "20rem",maxWidth:"100vh" }}>
              <h2 className="header"> Let the game begin!!</h2>
              <div style={{ overflow: "auto"}}>
                {questionList.map((question) => {
                  return (
                    <Question
                      key={Object.keys(question)[0]}
                      ques={Object.keys(question)[0]}
                      options={question[Object.keys(question)[0]]}
                    />
                  );
                })}
              </div>

              <Button variant="contained" onClick={onNextClickHandler}>
                Next
              </Button>
            </div>
          </div>
        )}
    </Fragment>
  );
};

export default Quiz;
