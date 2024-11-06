import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'
import ResetPassword from './components/auth/ResetPassword.jsx';
import SentEmail from './components/auth/SentEmail.jsx';
import OtpVerification from './components/auth/OtpVerification.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     

        {/* For user Authentication */}
        <Route path='' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/resetPassword' element={<ResetPassword />} />
        <Route path='/sent/email' element={<SentEmail />} />
        <Route path='/otp/verification' element={<OtpVerification />} />
        <Route path='/reset/password' element={<ResetPassword />} />

      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
 
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
