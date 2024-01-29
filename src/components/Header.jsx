import React from 'react'
import { useNavigate} from 'react-router-dom';
import {AppBar, Container, Select,MenuItem, Toolbar, Typography, createTheme, ThemeProvider} from '@mui/material';
import { CryptoState } from '../CryptoContext';
const Header = () => {
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    const { currency,setCurrency} = CryptoState()
    const history = useNavigate()
  /*   console.log(currency) */
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position='static'>
        <Container>
           <Toolbar>
            <Typography sx={{
                
                    flex:1,
                    color:"gold",
                    fontFamily:"Montserrat",
                    fontWeight:"bold",
                    cursor:"pointer",
                
            }} onClick={()=>history("/")} variant='h6'>
                Crypto Hunter
            </Typography>
            <Select variant='outlined' style={{
                width:100,
                height:40,
                marginRight:15,
                
            }} value={currency} onChange={(e)=>{
              setCurrency(e.target.value)
            }
            }>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            </Toolbar> 
        </Container>
    </AppBar>
    </ThemeProvider>
  );
}

export default Header
