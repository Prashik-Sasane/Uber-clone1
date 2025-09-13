import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import './App.css'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  )
}

export default App
