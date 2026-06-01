import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Cadastro from './Pages/Cadastro/cadastro'
import { ToastContainer } from 'react-toastify'
function App() {
  

  return (
    <>
    <ToastContainer position='top-right' autoClose={3000}/>
    <BrowserRouter>
    <Routes>
      <Route path='/cadastro' element={<Cadastro/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
