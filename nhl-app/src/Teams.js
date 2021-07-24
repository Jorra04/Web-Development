import "./Teams.css";
import Team from "./Team";
import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const Teams = () => {
  const exampleReq = `https://statsapi.web.nhl.com/api/v1/teams/`;
  const [teams, setTeams] = useState([]);

  const [teamsOriginal, setTeamsOriginal] = useState([]);

  const [searchText, setSearchText] = useState("");

  const updateSearch = (e) => {
    setSearchText(e.target.value);
    let newTeams = teamsOriginal.filter((team) => {
      return team.name.toLowerCase().includes(e.target.value);
    });

    setTeams(newTeams);
  };

  useEffect(async () => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await fetch(exampleReq);
    const data = await resp.json();
    setTeams(data.teams);
    setTeamsOriginal(data.teams);
  };

  return (
    <div className="App">
      <form className="search-form">
        <img className="logo" src={logo}></img>
        <input
          className="search-bar"
          type="text"
          value={searchText}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Submit
        </button>
      </form>
      <br></br>
      <div className="teams">
        {teams.map((team) => (
          <Link to={`/moreInfo/${team.abbreviation}`}>
            <Team key={team.abbreviation}
            name={team.name}
            abbreviation={team.abbreviation}
            established={team.firstYearOfPlay}/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Teams;