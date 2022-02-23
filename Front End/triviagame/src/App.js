import "./App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import SelectOptions from "./Components/Quiz/SelectCriteria";
import Quiz from "./Components/Quiz/Quiz";
import QuizComplete from "./Components/Quiz/QuizComplete";
import Signup from "./Components/Login/Signup";
import UserHistory from "./Components/History/UserHistory";
import EnhancedTable from "./Components/History/GlobalHistory";
import HomePage from "./Components/Layout/Homepage";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Switch>
      {isLoggedIn && (
        <Route path="/quiz/select">
          <SelectOptions />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/quiz/start">
          <Quiz />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/quiz/complete">
          <QuizComplete />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/user/history">
          <UserHistory />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/global/history">
          <EnhancedTable />
        </Route>
      )}
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/" exact>
        <HomePage/>
      </Route>
      <Route path="*">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
