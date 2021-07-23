import React from "react";
import './Team.css';

const Team = ({name, abbreviation, established}) => {
    return (
        <div className="team" >
            <h1 className="name">{name}</h1>
            <p className="abbreviation">Team Abbreviation: {abbreviation}</p>
            <p className="established">Year Founded: {established}</p>
        </div>
    );
}


export default Team;