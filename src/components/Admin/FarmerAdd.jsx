import React, { useState } from 'react'
import api from '../../services/api'



const FarmerAdd = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    national_id_number: "",
    phone_number: "",
    role: "farmer",
    employee_id: "",

   
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")
     
    try {
      await api.post("cooperative/farmer/" , { ...form, role: "farmer" }) 
      setSuccess("Farmer added successfully")
      setForm({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        national_id_number: "",
        employee_id: "",
        phone_number: "",
        role: "farmer",
      })
      } catch (error) {
        setError(
          error?.response?.data?.message ||
          "Failed to add farmer. Please try again."
        )
      } finally {
        setSaving(false)
      }
  }

        

  return (
    <div  className="p-6">
      <div className="card max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Add Farmer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="national_id_number">
              National ID Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="national_id_number"
              name="national_id_number"
              type="text"
              placeholder="National ID Number"
              value={form.national_id_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={handleChange}
            />
          </div>
          <button 
            className="bg-red-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={saving}
          >
            {saving ? "Adding..." : "Add Farmer"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default FarmerAdd