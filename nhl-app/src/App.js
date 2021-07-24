import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Teams from "./Teams";
import TeamDetail from "./TeamDetail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Teams} />
        <Route path="/moreInfo" exact component={About} />
        <Route path="/moreInfo/:team" component={TeamDetail}/>
      </Switch>
    </Router>
  );
};

const About = () => {
  return <h1>About</h1>;
};

export default App;
