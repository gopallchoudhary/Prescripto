import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminContext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";
import { DoctorContext } from "../contexts/DoctorContext.jsx";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState("Doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { backendURL, setDoctorToken } = useContext(DoctorContext)
  const navigate = useNavigate()


  //? submit handler
  const submitHandler = async (e) => {
    e.preventDefault()
    setEmail('')
    setPassword('')


    try {

      if (state == "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password }, { withCredentials: true })

        if (data.success) {
          setAdminToken(data?.adminToken);
          navigate("/admin-dashboard")
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(`${backendURL}/api/doctor/login`, { email, password }, { withCredentials: true })

        if (data.success) {
          setDoctorToken(data?.doctorToken)
          navigate("/doctor-dashboard")
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 items-start m-auto border p-8 text-sm text-[#5E5E5E] rounded-xl min-w-[340px] sm:min-w-96 shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border rounded-md mt-1 p-2 w-full border-[#DADADA]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="email"
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              className="border rounded-md mt-1 p-2 w-full border-[#DADADA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="password"
            />
          </div>

          <button className="w-full bg-primary text-white text-base rounded p-2 mt-2">
            Login
          </button>

          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-primary underline cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-primary underline cursor-pointer "
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
