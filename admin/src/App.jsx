import React, { useContext, useState } from 'react'
import Login from './pages/Login'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import { AdminContext } from './contexts/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Appointments from './pages/Admin/AllAppointments';
import AddDoctors from './pages/Admin/AddDoctors';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './contexts/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

function App() {

  const { adminToken } = useContext(AdminContext)
  const { doctorToken } = useContext(DoctorContext)


  return adminToken || doctorToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Default landing by role */}
          <Route path='/' element={adminToken ? <Navigate to="/admin-dashboard" replace /> : <Navigate to="/doctor-dashboard" replace />} />

          {/* Admin Routes */}
          <Route path='/admin-dashboard' element={adminToken ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path='/all-appointments' element={adminToken ? <Appointments /> : <Navigate to="/" replace />} />
          <Route path='/add-doctor' element={adminToken ? <AddDoctors /> : <Navigate to="/" replace />} />
          <Route path='/doctors-list' element={adminToken ? <DoctorsList /> : <Navigate to="/" replace />} />

          {/* Doctor Routes */}
          <Route path='/doctor-dashboard' element={doctorToken ? <DoctorDashboard/> : <Navigate to="/" replace />}/>
          <Route path='/doctor-appointments' element={doctorToken ? <DoctorAppointments/> : <Navigate to="/" replace />}/>
          <Route path='/doctor-profile' element={doctorToken ? <DoctorProfile/> : <Navigate to="/" replace />}/>

          {/* Unknown paths fall back to role landing */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App