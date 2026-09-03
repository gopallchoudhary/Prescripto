import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(Cookies.get('adminToken') || null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)



    //. get all doctors 
    const getAllDoctors = async () => {
        const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`)
        setDoctors(data.doctors)
        console.log(data.doctors);
    }

    //. change availability 
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/change-availability`, { docId }, { headers: { adminToken } })

            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    //. get appointments 
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, { withCredentials: true })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(appointments);

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    //. cancel appointments 
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/cancel-appointment`, { appointmentId }, { withCredentials: true })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //. admin dashboard 
    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { withCredentials: true })

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }


    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        appointments, setAppointments,
        cancelAppointment,
        dashData,
        getDashboardData
    };

    return (
        <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    );
};

export default AdminContextProvider;
