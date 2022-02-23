// import { Button } from "@mui/material";
// import { useEffect } from "react";
// import { useEffect } from "react";
// import useHttp from "../../Hooks/use-http";
// import { getAllUsers, signIn } from "../../lib/api";
// import { getQuestions } from "../../lib/api";
// import QuizOptions from "../Data/QuizOptions";
import ResponsiveAppBar from "../Layout/Header";

const Test = () => {
  // const { sendRequest } = useHttp(getQuestions);
//   const { sendRequest: sendRequest1} = useHttp(getAllUsers);
  // useEffect(() => {
  //   sendRequest({
  //     body: {
  //       username: "user",
  //       password: "Sairam@2799",
  //     },
  //     credentials: "include",
  //   });
  // }, [sendRequest]);
  // useEffect(() => {
  //   sendRequest1();
  // }, [sendRequest1]);

  // useEffect(() =>{
  //   sendRequest();
  // },[sendRequest])
  // const {categories,difficulty} = QuizOptions();
  // console.log(categories);
  return <ResponsiveAppBar/>
};

export default Test;