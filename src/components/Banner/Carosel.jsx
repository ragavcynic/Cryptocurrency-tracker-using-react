import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../Config/api'
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const Carosel = () => {
    const carousel = {
        height:"50%",
        display:"flex",
        alignItems:"center",
    }
    const [trending,setTrending] = useState([])
    const {currency,symbol} = CryptoState()
    const fetchTrendingCoin =async ()=> {
            const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
    console.log(trending)
    useEffect(()=>{
        fetchTrendingCoin()
    },[currency])
function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h >=0;
    return(
        <Link to={`./coins/${coin.id}`} style={{display:'flex',flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",}}>
            <img src={coin?.image} alt={coin.name} height="80" style={{marginBottom:20}}/>
            <span>{coin?.symbol}
            &nbsp;
            <span style={{color:profit>0?"green":"red"}}>{profit && "+"} {coin.price_change_percentage_24h?.toFixed(2)}</span>
            </span>
            <span style={{fontSize:22,fontWeight:500}}>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</span>
        </Link>
    )
})

    const responsive = {
        0:{
            items:2
        },
        512:{
            items:4
        }
    }
  return (
    <div style={carousel}>
      <AliceCarousel disableButtonsControls mouseTracking infinite autoPlayInterval={1000} animationDuration={1500} disableDotsControls responsive={responsive} autoPlay items={items}/>
    </div>
  )
}

export default Carosel
