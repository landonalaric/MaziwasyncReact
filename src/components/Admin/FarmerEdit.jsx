import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../context/api/api';

const FarmerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    national_id_number: '',
    phone_number: '',
    role: 'farmer',
    employee_id: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const { data } = await api.get(`cooperative/farmer/${id}/`);
        setForm({
          username: data.username ?? '',
          password: '',
          first_name: data.first_name ?? '',
          last_name: data.last_name ?? '',
          national_id_number: data.national_id_number ?? '',
          phone_number: data.phone_number ?? '',
          role: data.role ?? 'farmer',
          employee_id: data.employee_id ?? '',
        });
      } catch (error) {
        console.error('Error fetching farmer:', error);

        console.log('Status:', error.response?.status);
        console.log('Response:', error.response?.data);
        console.log('Payload:', form);
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchFarmer();
  }, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await api.patch(`cooperative/farmer/${id}/`, form);
    navigate('/admin-dashboard/admin/farmers');
  } catch (error) {
    console.error('Error updating farmer:', error);

  } finally {
    setLoading(false);
  }
};

if (fetching) {
  return <div className="p-6">Fetching farmer details...</div>;
}

return (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Edit Farmer</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">First Name</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">National ID Number</label>
        <input
          type="text"
          name="national_id_number"
          value={form.national_id_number}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Employee ID</label>
        <input
          type="text"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loading ? 'Updating...' : 'Update Farmer'}
      </button>
    </form>

  </div>
)
}

export default FarmerEdit