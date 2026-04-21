
import './App.css'
import { BrowserRouter, Route } from "react-router-dom";
import UserLayout from './Layout/UserLayout';
import { Routes } from "react-router-dom";
import Home from './Pages/Home';

function App() {
 

  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<UserLayout />} >
    <Route index element={<Home />} />

    
    </Route>
   </Routes>

   </BrowserRouter>
    </>
  )
}

export default App
