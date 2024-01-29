import { Container, Typography } from '@mui/material'
import React from 'react'
import banner2 from "../banner2.jpg"
import Carosel from './Carosel'

const Banner = () => {

  return (
    <div style={{backgroundImage: `url(${banner2})`}} >
        <Container sx={{height:400,display:"flex",flexDirection:"column",paddingTop:10,justifyContent:"space-around"}}>
            <div className='banner' style={{display:'flex',height:"40%" , flexDirection:"column", 
            justifyContent:"center",textAlign:"center"}} >
                <Typography variant='h2' sx={{fontWeight:'bold' ,fontFamily:"Montserrat"}}>
                    Crypto Hunter
                </Typography>
                <Typography variant='subtitle1' sx={{color:"darkgray" , 
            textTransform:"capitalize",fontFamily:"MOntserrat"}}>
                    Get all the info regarding your favorite crypto currency
                </Typography>
            </div>
            <Carosel/>
        </Container>
    </div>
  )
}

export default Banner;
