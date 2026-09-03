import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";

const DoctorProfile = () => {
  const { profileData, getProfileData, doctorToken, updateProfile } =
    useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false)
  const [fees, setFees] = useState('')
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [available, setAvailable] = useState(true)
  const [saving, setSaving] = useState(false)


  useEffect(() => {
    if (doctorToken) {
      getProfileData();
    }
  }, [doctorToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees ?? '')
      setLine1(profileData.address?.line1 ?? '')
      setLine2(profileData.address?.line2 ?? '')
      setAvailable(!!profileData.available)
    }
  }, [profileData, isEdit]);

  const handleCancel = () => {
    setIsEdit(false)
    setFees(profileData.fees ?? '')
    setLine1(profileData.address?.line1 ?? '')
    setLine2(profileData.address?.line2 ?? '')
    setAvailable(!!profileData.available)
  }

  const handleSave = async () => {
    setSaving(true)
    const ok = await updateProfile({
      fees: Number(fees),
      available,
      address: { line1, line2 },
    })
    setSaving(false)
    if (ok) setIsEdit(false)
  }
  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="w-full sm:max-w-64 rounded-lg  bg-primary/80"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-7 py-8 bg-white">
            {/* {Doc Info: name, degree experience} */}
            <p className="flex items-center gap-2 font-medium text-3xl">{profileData.name}</p>

            <div className="flex items-center gap-2 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="text-xs py-0.5 px-2  border rounded-full ">
                {profileData.experience}
              </button>
            </div>

            <div className="">
              <p className="text-md text-neutral-800  mt-3 font-medium flex items-center gap-1">About</p>
              <p className="text-sm text-gray-600 mt-1 max-w-[700px]">{profileData.about}</p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment Fees{' '}
              {isEdit ? (
                <input
                  type="number"
                  min="0"
                  value={fees}
                  onChange={(e) => setFees(e.target.value)}
                  className="border rounded px-2 py-1 text-gray-800 w-28"
                />
              ) : (
                <span className="text-gray-800">{`$${profileData.fees}`}</span>
              )}
            </p>

            <div className="flex gap-2 py-2">
              <p>Address</p>
              {isEdit ? (
                <div className="flex flex-col gap-1">
                  <input
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    placeholder="Address line 1"
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <input
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    placeholder="Address line 2"
                    className="border rounded px-2 py-1 text-sm"
                  />
                </div>
              ) : (
                <p className="text-sm">{profileData.address?.line1}
                  <br />
                  {profileData.address?.line2}
                </p>
              )}
            </div>

            <div className="flex gap-1 pt-2">
              <input
                type="checkbox"
                id="available"
                checked={available}
                disabled={!isEdit}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              <label htmlFor="available">Available</label>
            </div>

            <div className="flex gap-3">
              {isEdit ? (
                <>
                  <button onClick={handleCancel} className="py-1 px-4 text-sm border rounded-full mt-5 border-primary hover:bg-red-400 hover:text-white transition-all ease-in-out duraton-500">Cancel</button>
                  <button onClick={handleSave} disabled={saving} className="py-1 px-4 text-sm border border-primary rounded-full mt-5 hover:bg-primary hover:text-white transition-all ease-in-out duraton-500 disabled:opacity-50">{saving ? "Saving..." : "Save"}</button>
                </>
              ) : (
                <button onClick={() => setIsEdit(true)} className="py-1 px-4 text-sm border rounded-full mt-5 border-primary hover:bg-primary hover:text-white transition-all ease-in-out duraton-500">Edit</button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
