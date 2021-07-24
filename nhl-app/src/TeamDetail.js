import React, {useState, useEffect} from 'react';
import './App.css'

const TeamDetail = () => {
    useEffect( () => {
        getTeamDetail();
    }, []);

    const [details, setDetails] = useState({});

    const getTeamDetail = async () => {
    
    }





    return (
        <div>
            <h1>Team detail</h1>
        </div>
    );
}


export default TeamDetail;
