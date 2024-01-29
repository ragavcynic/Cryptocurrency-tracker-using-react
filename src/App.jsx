
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './Pages/HomePage'
import CoinPage from './Pages/CoinPage'

function App() {


  return (
    <BrowserRouter>
    <div style={{backgroundColor:"#14161a",color:"white",minHeight:"100vh",}}>
    <Header/>
    <Routes>
    <Route path='/' element={<HomePage/>} exact/>
    <Route path='/coins/:id' element={<CoinPage/>} exact/>
    </Routes>
    </div>
    </BrowserRouter>

  )
}

export default App
