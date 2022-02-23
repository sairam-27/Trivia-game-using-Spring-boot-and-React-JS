import {
  Chart,
  Legend,
  PieSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Paper } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../Hooks/use-http";
import { sendSelectedOptions } from "../../lib/api";
import ResponsiveAppBar from "../Layout/Header";

const QuizComplete = () => {
  const options = useSelector((state) => state.quiz.selectedOptions);
  const user = localStorage.getItem("username")
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(10);

  const getResults = useCallback((results) => {
    setScore(parseInt(results.score)); 
    setCorrectAnswers(parseInt(results.correctAnswers));
    setWrongAnswers(parseInt(results.wrongAnswers));
  }, []);

  const { sendRequest } = useHttp(sendSelectedOptions);

  useEffect(() => {
    sendRequest(
      {
        body: {
          user,
          options,
        },
      },
      getResults
    );
  }, [sendRequest, options, getResults, user]);

  const data = [
    { argument: "Correct Answers", value: correctAnswers },
    { argument: "Wrong Answers", value: wrongAnswers },
  ];

  const Label = (props) => (
    <Legend.Label {...props} sx={{ textAlign: "center" }} />
  );

  return (
    <Fragment>
      <ResponsiveAppBar />
      <h2 className="header">
        Quiz Result: Correct: {correctAnswers}, Wrong: {wrongAnswers}
      </h2>
      <h2 className="header">Score: {score}</h2>
      <div style={{ maxWidth: "75%", marginLeft: "17rem", marginTop: "2rem" }}>
        <Paper sx={{ textAlign: "center" }}>
          <Chart data={data}>
            <PieSeries valueField="value" argumentField="argument" />
            <Legend labelComponent={Label} />
          </Chart>
        </Paper>
      </div>
    </Fragment>
  );
};

export default QuizComplete;
