import React, { useEffect, useState } from "react";
import api from "../context/api/api";


const PorterProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get("core/auth/myprofile/");
        setProfile(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl">

        {/* Header */}
        <div className="bg-green-700 text-white p-6 rounded-t-xl flex items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-white text-green-700 flex items-center justify-center text-3xl font-bold">
            {profile.first_name?.charAt(0)}
            {profile.last_name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {profile.first_name} {profile.last_name}
            </h1>

            <p className="text-green-100">{profile.role}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div className="space-y-4">
            <div>
              <h3 className="text-gray-500 text-sm">First Name</h3>
              <p className="font-semibold">{profile.profile.first_name}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Last Name</h3>
              <p className="font-semibold">{profile.profile.last_name}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Username</h3>
              <p className="font-semibold">{profile.username}</p>
            </div>

            


            <div>
              <h3 className="text-gray-500 text-sm">Phone Number</h3>
              <p className="font-semibold">{profile.phone_number}</p>
            </div>
          </div>

          <div className="space-y-4">
            

            

            <div>
              <h3 className="text-gray-500 text-sm">Employee ID</h3>
              <p className="font-semibold">{profile.profile.employee_id}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Route Name</h3>
              <p className="font-semibold">{profile.profile.route_name}</p>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm">Role</h3>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {profile.role}
              </span>
            </div>

            

          </div>

        </div>
      </div>
    </div>
  );
};

export default PorterProfile;