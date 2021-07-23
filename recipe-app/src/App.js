import './App.css';
import Team from './Team'
import React, {useEffect, useState} from 'react';
import logo from './logo.png'

const App = () => {

  const exampleReq = `https://statsapi.web.nhl.com/api/v1/teams/`;

  const [teams, setTeams] = useState([]);
  useEffect( async () => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await fetch(exampleReq);
    const data = await resp.json();
    setTeams(data.teams);
  }


  return (
    <div className="App">
      <form className="search-form">
        <img className="logo" src={logo}></img>
        <input className="search-bar" type="text"/>
        <button className="search-button"type="submit">Submit</button>
      </form>
      <div className="teams">
      {teams.map(team => (
        <Team key={team.abbreviation} name={team.name} abbreviation={team.abbreviation} established={team.firstYearOfPlay}/>
      ))}
      </div>
    </div>
  );
}

export default App;
