import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fragment, useCallback, useEffect, useState } from "react";
import useHttp from "../../Hooks/use-http";
import { getGlobalHistory } from "../../lib/api";
import ResponsiveAppBar from "../Layout/Header";

function EnhancedTableHead(props) {
  const { sendRequest } = useHttp(getGlobalHistory);
  const [data, setData] = useState([]);

  const getData = useCallback((globalData) => {
    globalData.map((result) => {
      return setData((prev) => [
        ...prev,
        {
          user: result.user.username,
          score: result.score,
          correctAnswers: result.correctAnswers,
          wrongAnswers: result.wrongAnswers,
          time: result.quizTime,
        },
      ]);
    });
  }, []);

  useEffect(() => {
    sendRequest({}, getData);
  }, [sendRequest, getData]);

  return (
    <Fragment>
      <ResponsiveAppBar />
      <div className="background">
        <div className="centerBox">
          <h2 className="header">Global ranks</h2>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>USERNAME</TableCell>
                    <TableCell align="right">SCORE</TableCell>
                    <TableCell align="right">CORRECT ANSWERS</TableCell>
                    <TableCell align="right">WRONG ANSWERS</TableCell>
                    <TableCell align="right">DATE & Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.user}
                      </TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align="right">{row.correctAnswers}</TableCell>
                      <TableCell align="right">{row.wrongAnswers}</TableCell>
                      <TableCell align="right">{row.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EnhancedTableHead;
