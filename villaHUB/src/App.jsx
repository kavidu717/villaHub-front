
import './App.css'
import { Route } from "react-router-dom";
import UserLayout from './Layout/UserLayout';
import { Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyEmail from './Pages/VerifyEmail';

function App() {
 

  return (
    <>
  
   <Routes>
    <Route path="/" element={<UserLayout />} >
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} /> 
    <Route path="verify/:token" element={<VerifyEmail />} />    

    
    </Route>
   </Routes>

  
    </>
  )
}

export default App
