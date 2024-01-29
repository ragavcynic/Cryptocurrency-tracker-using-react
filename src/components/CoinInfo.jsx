import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/api';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress } from '@mui/material';
import {Line} from 'react-chartjs-2';
import { chartDays } from '../Config/data';
import {createTheme} from '@mui/material';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);

import SelectButton from './SelectButton';
const CoinInfo = ({coin}) => {
    const [historicData,setHistoricData] = useState()
    const [days,setDays] = useState(1);
    const {currency}=CryptoState();
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
const fetchHistoricData = async ()=>{
    const {data} = await axios.get(HistoricalChart(coin.id,days,currency))
    setHistoricData(data.prices);
}
useEffect(()=>{
    fetchHistoricData();
},[currency,days])
  return (
    <ThemeProvider theme={darkTheme}>
    <div styles={{width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,}}>
      {
        !historicData?(<CircularProgress style={{color:"green"}} size={250} thickness={1}/>):(
        <>
        <Line
        data = {{
            labels:historicData.map((coin)=>{
                let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days===1?time:date.toLocaleDateString()
            }),
            datasets:[
                {data:historicData.map((coin)=>coin[1]),
                label:`Price(Past ${days} Days) in ${currency}`,
                borderColor:"gold"
            }
            ]
        }}
        options={{
            elements:{
                point:{
                    radius:1,
                }
            }
        }}
        />
        <div style={{display:"flex", marginTop:20, justifyContent:"space-around",width:"100%"}}>
            {chartDays.map((day)=>(
                <SelectButton  key={day.value} selected={day.value===days} onClick={()=>{setDays(day.value)}}>{day.label}</SelectButton>
            ))}
        </div>
        </>
            )
      }
    </div>
    </ThemeProvider>
  )
}

export default CoinInfo
