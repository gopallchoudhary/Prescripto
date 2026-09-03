import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import Cookies from 'js-cookie'


export const DoctorContext = createContext()

const getErrorMessage = (error, fallback) => error?.response?.data?.message || error?.message || fallback

const DoctorContextProvider = ({ children }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [doctorToken, setDoctorTokenState] = useState(Cookies.get('doctorToken') || '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const setDoctorToken = (token) => {
        setDoctorTokenState(token || '')
        if (token) {
            Cookies.set('doctorToken', token, { expires: 7 })
        } else {
            Cookies.remove('doctorToken')
        }
    }

    //. get appointments 
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/appointments`, { withCredentials: true })

            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to fetch appointments"))
        }
    }

    //. complete appointment 
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/doctor/appointment-completed`, { appointmentId }, { withCredentials: true })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getDoctorDashboard()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to complete appointment"))
        }
    }

    //. cancel appointment 
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/doctor/appointment-cancelled`, { appointmentId }, { withCredentials: true })

            if (data.success) {
                toast.success(data.message)
                getAppointments()
                getDoctorDashboard()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to cancel appointment"))
        }
    }


    //. dashboard data 
    const getDoctorDashboard = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/dashboard`, { withCredentials: true })
            if (data.success) {
                setDashData(data.docData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to fetch dashboard"))
        }
    }

    //. get profile data 
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/profile`, { withCredentials: true })
            if (data.success) {
                setProfileData(data.doctorProfileData)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to fetch profile"))
        }
    }

    //. update profile data
    const updateProfile = async ({ fees, available, address }) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/doctor/update-profile`, { fees, available, address }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                await getProfileData()
                return true
            }
            toast.error(data.message)
            return false
        } catch (error) {
            toast.error(getErrorMessage(error, "Failed to update profile"))
            return false
        }
    }


    //, Values 
    const value = {
        doctorToken, setDoctorToken, backendURL,
        appointments, getAppointments,
        completeAppointment, cancelAppointment,
        dashData, setDashData, getDoctorDashboard, getProfileData, updateProfile,
        profileData, setProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider