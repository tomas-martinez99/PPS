import React from 'react'
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import {
    getStatisticsSevenDaysAgo,
    getStatisticsSevenDaysAgo,
} from "../../../services/statisticsServices";
import { useNavigate } from "react-router-dom";


const Statistics = () => {

    const [error, setError] = useState(null);
    const [statistics, setStatistics] = useState([]);
    const navigate = useNavigate();
  
    const [url, setUrl] = useState(window.location.pathname);
  
    console.log(url);
  
    useEffect(() => {
      
      const fetchAllSevenDaysAgo = async () => {
        try {
          const result = await getStatisticsSevenDaysAgo();
          setMovies(result);
          console.log(result);
        } catch (error) {
          setError(error);
          console.error("There was a problem with the fetch operation:", error);
        }
      };
  
      const fetchAllPorcentage = async () => {
        try {
          const result = await getStatisticsPorcentage();
          setSeries(result);
          console.log(result);
        } catch (error) {
          setError(error);
          console.error("There was a problem with the fetch operation:", error);
        }
      };
  
      fetchAllSevenDaysAgo();
      fetchAllPorcentage();
    }, []);

  return (
    <div></div>
  )
}

export default Statistics