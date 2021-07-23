import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './YorkuLogoLion.png'

function App() {
  return (
    <Router>
      <div>
      <div className="header">

      
      <div className="imagecontainer">
          <img className="logo" src={logo} draggable="false" alt="York University logo"/>
        </div>
        
        <div className="nav-bar-div">
          <a className="nav-bar"><Link className="nav-bar-element" to="/">Home</Link></a>
          <a className="nav-bar"><Link className="nav-bar-element" to="/about">About</Link></a>
          <a className="nav-bar"><Link className="nav-bar-element" to="/dashboard">Dashboard</Link></a>
        </div>

        </div>

        <hr className="horizontal-break"/>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      
      </div>
    </Router>

  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
