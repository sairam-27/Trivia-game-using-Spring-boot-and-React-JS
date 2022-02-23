import {
  Animation,
  BarSeries,
  Stack,
  ValueAxis,
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  Chart,
  Legend,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Paper } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";
import useHttp from "../../Hooks/use-http";
import { getUserHistory } from "../../lib/api";
import ResponsiveAppBar from "../Layout/Header";

const UserHistory = () => {
  const username = localStorage.getItem("username");
  // const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  const getScore = useCallback((userResults) => {
    // setResults(userResults);
    userResults.map((result) => {
      return setData((prev) => [
        ...prev,
        {
          score: result.score,
          correctAnswers: parseInt(result.correct_answers),
          wrongAnswers: parseInt(result.wrong_answers),
          date: result.date,
        },
      ]);
    });
  }, []);

  const { sendRequest } = useHttp(getUserHistory);
  useEffect(() => {
    sendRequest({ user: username }, getScore);
  }, [sendRequest, getScore, username]);

  const Root = (props) => (
    <Legend.Root
      {...props}
      sx={{ display: "flex", margin: "auto", flexDirection: "row" }}
    />
  );
  const Label = (props) => (
    <Legend.Label {...props} sx={{ whiteSpace: "nowrap" }} />
  );
  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="background">
        <div
          className="centerBox"
          style={{ marginTop: "2rem", maxWidth: "70%", maxHeight: "100%" }}
        >
          <Paper sx={{ maxWidth: "100%" }}>
            <Chart data={data}>
              <ArgumentAxis />
              <ValueAxis max={2400} />

              <BarSeries
                name="Correct Answers"
                valueField="correctAnswers"
                argumentField="date"
              />
              <BarSeries
                name="Wrong Answers"
                valueField="wrongAnswers"
                argumentField="date"
              />
              {/* <BarSeries
            name="Natural gas"
            valueField="gas"
            argumentField="country"
          />
          <BarSeries name="Coal" valueField="coal" argumentField="country" />
          <BarSeries
            name="Nuclear"
            valueField="nuclear"
            argumentField="country"
          /> */}
              <Animation />
              <Legend
                position="bottom"
                rootComponent={Root}
                labelComponent={Label}
              />
              <Title text="Quiz history" />
              <Stack
                stacks={[
                  {
                    series: [
                      "Correct Answers",
                      "Wrong Answers",
                      //   "Natural gas",
                      //   "Coal",
                      //   "Nuclear",
                    ],
                  },
                ]}
              />
            </Chart>
          </Paper>
        </div>
      </div>
    </Fragment>
  );
};

export default UserHistory;
