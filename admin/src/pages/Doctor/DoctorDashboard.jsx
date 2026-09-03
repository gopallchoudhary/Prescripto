import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../contexts/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import DashInfo from '../../components/DashInfo'
import { AppContext } from '../../contexts/AppContext'

const DoctorDashboard = () => {
  const { dashData, getDoctorDashboard, doctorToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat } = useContext(AppContext)
  useEffect(() => {
    if (doctorToken) {
      getDoctorDashboard()
    }
  }, [doctorToken])

  if (!dashData) {
    return <div className='m-5 text-gray-500'>Loading dashboard...</div>
  }

  const latestAppointments = dashData.latestAppointments || []

  return (
    <div className='m-5'>
      <div>
        <div className='flex gap-6'>
          <DashInfo text={`Earnings`} icon={assets.earning_icon} number={`$${dashData.earnings}`} />
          <DashInfo text={`Appointments`} icon={assets.appointments_icon} number={dashData.appointments} />
          <DashInfo text={`Patients`} icon={assets.patients_icon} number={dashData.patients} />
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 mt-10 p-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {latestAppointments.length === 0 && (
            <p className='px-6 py-4 text-sm text-gray-500'>No bookings yet.</p>
          )}
          {
            latestAppointments.map((item, index) => (
              <div key={index} className='flex items-center gap-3 px-6 py-3 hover:bg-gray-100'>
                <img className='rounded-full w-8 object-cover aspect-square' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                    ? <p className="text-xs font-medium text-red-400">Cancelled</p>
                    : item.isCompleted
                      ? <p className="text-xs font-medium text-green-500">Completed</p>
                      : <div className="flex"> <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                        <img
                          onClick={() => completeAppointment(item._id)}
                          className="w-10 cursor-pointer"
                          src={assets.tick_icon}
                          alt=""
                        />
                      </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard