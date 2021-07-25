import React, { useState, useEffect } from "react";
import "./TeamDetails.css";

const TeamDictionary = {
  NJD: 1,
  NYI: 2,
  NYR: 3,
  PHI: 4,
  PIT: 5,
  BOS: 6,
  BUF: 7,
  MTL: 8,
  OTT: 9,
  TOR: 10,
  CAR: 12,
  FLA: 13,
  TBL: 14,
  WSH: 15,
  CHI: 16,
  DET: 17,
  NSH: 18,
  STL: 19,
  CGY: 20,
  COL: 21,
  EDM: 22,
  VAN: 23,
  ANA: 24,
  DAL: 25,
  LAK: 26,
  SJS: 28,
  CBJ: 29,
  MIN: 30,
  WPG: 52,
  ARI: 53,
  VGK: 54,
  SEA: 55,
};

function TeamDetail({ match }) {
  useEffect(() => {
    fetchTeam();
  }, []);

  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState({});

  const fetchTeam = async () => {
    const fetchedTeam = await fetch(
      `https://statsapi.web.nhl.com/api/v1/teams/${
        TeamDictionary[match.params.team]
      }`
    );
    const team = await fetchedTeam.json();
    setTeam(team);
    setLoading(false);
  };
  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <TeamInfo
          name={team.teams[0].name}
          abbreviation={team.teams[0].abbreviation}
          established={team.teams[0].firstYearOfPlay}
        />
      )}
    </div>
  );
}

const TeamInfo = ({ name, abbreviation, established }) => {
  return (
    <>
      <div className="header">
        <div>
          <h1>{name}</h1>
        </div>
        <div className="otherStuff">
          <h3 id="abbreviation">{abbreviation}</h3>
          <h3 id="established">Est. {established}</h3>
        </div>
      </div>
    </>
  );
};

const LoadingPage = () => {
  return <div>Loading Page</div>;
};

export default TeamDetail;

/*
<div>{name}</div>
      <div>{abbreviation}</div>
      <div>{established}</div>
*/
