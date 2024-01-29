import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@emotion/react';
import { Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CoinTable = () => {
const [coins,setCoins] = useState([]);
const [loading,setLoading] = useState(false);
const [search,setSearch] = useState("")
const {currency,symbol} = CryptoState();
const [page,setPage] = useState(1);
const history = useNavigate();
const fetchCoins =async() =>{
    setLoading(true)
    const {data} = await axios.get(CoinList(currency));
    setCoins(data)
    setLoading(false)
    
}
function numberWithCommas(x) {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

useEffect(()=>{
    fetchCoins()
},[currency])
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const handleSearch= ()=>{
    return coins.filter((coin)=>(coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)))
  }
  return (

    <ThemeProvider theme={darkTheme}>
        <Container style={{textAlign:"center"}}>
            <Typography variant='h4' style={{margin:18,fontFamily:"Montserrat"}}>
                CryptoCurrency price by market cap
            </Typography>
            <TextField sx={ { marginBottom:20,width:"100%"}}variant='outlined'
             label="Search for a crypto currency" onChange={(e)=>{
                setSearch(e.target.value)
             }}/>
             <TableContainer>
                {
                    loading?(<LinearProgress style={{backgroundColor:"gold"}}/>):(
                        <Table>
                            <TableHead sx={{backgroundColor:"#EEBC1D"}}>
                                <TableRow >
                                    {["Coin","Price","24h change","Market cap"].map((head)=>(
                                        <TableCell sx={{color:"black",fontWeight:"700",fontFamily:"Montserrat"}} key={head} align={head==="Coin"?"":"right"}>
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                        {handleSearch()
                                        .slice(((page-1)*10,(page-1)*10+10))
                                        .map((row)=>{
                                            const profit = row.price_cahnge_percentage_24h>0;
                                            return(
                                                <TableRow sx={{backgroundColor:"#16171a",
                                                cursor:"pointer",fontFamily:"Montserrat", "&.hover":{
                                                    backgroundColor:"#131111",
                                                }}} onClick={()=>(
                                                    history.push(`/coins/${row.id}`)
                                            )}
                                            key={row.name}

                                            >
                                                    <TableCell component="th" scope='row' style={{display:"flex",gap:15}}>
                                                        <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}/>
                                                        <div style={{display:"flex" , flexDirection:"column"}}>
                                                            <span style={{textTransform:"uppercase",fontSize:22}}>{row.symbol}</span>
                                                            <span style={{color:"darkgrey"}}>{row.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                    {symbol}{" "}
                                                    {console.log((row.current_price))}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell align='right' style={{color:profit>0?"green":"red",fontWeight:500}}>
                                                    {profit && "+"} {row.price_change_percentage_24h?.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {symbol}{""}
                                                        {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                                    </TableCell>

                                                    
                                                </TableRow>
                                            )
                                        })}
                            </TableBody>
                        </Table>
                    )
                }
             </TableContainer>
             <Pagination
             sx={{
                padding:20,
                width:"100%",
                display:"flex",
                justifyContent:"center",
                color:"gold",  
             }} onClick={(_,value)=>{
                setPage(value);
                window.scroll(0,450);
             }}
             count={(handleSearch()?.length/10).toFixed(0)}
             />
        </Container>
    </ThemeProvider>
  )
}

export default CoinTable
