import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    appointments,
    getAppointments,
    doctorToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (doctorToken) {
      getAppointments();
    }
  }, [doctorToken]);

  if (!appointments || appointments.length === 0) {
    return (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 font-medium text-lg">All Appointments</p>
        <div className="bg-white border rounded text-sm px-6 py-8 text-gray-500">
          No appointments found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 font-medium text-lg">All Appointments</p>
      <div className="bg-white max-h-[80vh] min-h-[56vh] border rounded text-sm overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] border-b px-6 py-3 gap-1">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-gray-500 border-b px-6 py-3 gap-1 hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt=""
                className="rounded-full w-8 object-cover aspect-square"
              />{" "}
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="border border-gray-600 inline rounded-full px-2">
                {item.payment ? "ONLINE" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>{`$${item.amount}`}</p>

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
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
