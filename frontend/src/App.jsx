import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Login from './page/Login'
import SignUp from './page/SignUp'
import './App.css'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
