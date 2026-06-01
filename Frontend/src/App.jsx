import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Cadastro from './Pages/Cadastro/cadastro'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'
import Chamados from './Pages/Chamados/chamados'
import Dashboard from './Pages/Dashboard/dashboard'
function App() {
  

  return (
    <>
    <ToastContainer position='top-right' autoClose={3000}/>
    <BrowserRouter>
    <Routes>
      <Route path='/cadastro' element={<Cadastro/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/chamados' element={<Chamados/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
