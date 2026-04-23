
import './App.css'
import { Route } from "react-router-dom";
import UserLayout from './Layout/UserLayout';
import { Routes } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerifyEmail from './Pages/VerifyEmail';
import AdminLayout from './Layout/AdminLayout';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import AdminVillas from './Pages/Admin/AdminVillas';
import AdminUsers from './Pages/Admin/AdminUsers';
import AddVilla from './Pages/Admin/AddVilla';
import Contact from './Pages/Contact';
import Villas from './Pages/Villas';
import VillaDetails from './Components/VillaDetails';



function App() {
 

  return (
    <>
  
   <Routes>
    <Route path="/" element={<UserLayout />} >
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} /> 
    <Route path="verify/:token" element={<VerifyEmail />} /> 
    <Route path="contact" element={<Contact />} />
     <Route path="villas" element={<Villas />} />
     <Route path="villa/:id" element={<VillaDetails />} />
    

    
    </Route>

<Route path="/admin" element={
  <ProtectedRoute>
    <AdminLayout />
  </ProtectedRoute>
}>
  <Route index element={<AdminDashboard />} />
  <Route path="villas" element={<AdminVillas />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="add-villa" element={<AddVilla />} />
</Route>

   </Routes>

  
    </>
  )
}

export default App
