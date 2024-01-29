import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { SingleCoin } from '../Config/api'
import CoinInfo from '../components/CoinInfo'
import axios from 'axios'
import { LinearProgress, Typography } from '@mui/material'
/* import createTheme from '@mui/material' */

const CoinPage = () => {
  const {currency,symbol}=CryptoState();
  const {id} = useParams()
  const [coin,setCoin] = useState()
  const fetchCoin = async() =>{
    const {data} = await axios.get(SingleCoin(id));
    setCoin(data);
  };
console.log(coin)
useEffect(()=>{
  fetchCoin();
},[])
function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
if (!coin) return <LinearProgress style={{backgroundColor:"gold"}}/>;
  return (
    <div style={{display:"flex",flexDirection:"row",/* [theme.breakpoint.down("md")]:{
      flexDirection:"column",
      alignItems:"center"
    } */}}>
      <div style={{width:"30%",display:"flex",flexDirection:"column",
    alignItems:"center",marginTop:25,borderRight:"2px solid grey"
    }}>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{marginBottom:20}}/>
        <Typography variant='h3' sx={{fontWeight:"bold",marginBottom:20,fontFamily:'Montserrat'}}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' sx={{
          width:"100%",
          fontFamily:"Montserrat",
          padding:25,
          paddingBottom:15,
          paddingTop:0,
          textAlign:"justify"
        }}>{coin?.description.en.split(".")[0]}</Typography>
        <div style={{alignSelf:"start",
            padding:25,
            paddingTop:10,
            width:"100%"
      }}>
          <span style={{display:"flex"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",marginBottom:20,fontFamily:'Montserrat'}}>
              Rank : 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{fontFamily:"Montserrat"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",marginBottom:20,fontFamily:'Montserrat'}}>
              Current Price : 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {numberWithCommas(coin.current_price?.toFixed(2))}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' sx={{fontWeight:"bold",marginBottom:20,fontFamily:'Montserrat'}}>
              Market cap :
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0,-6))}M
            </Typography>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage;
