import React, { useState } from 'react'
import api from '../context/api/api'

const PorterAdd = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        national_id_number: "",
        employee_id: "",
        phone_number: "",
        route_name: ""
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
            await api.post("cooperative/porter/", { ...form, role: "porter" })
            setSuccess("Porter added successfully")
            setForm({
                username: "",
                password: "",
                first_name: "",
                last_name: "",
                national_id_number: "",
                employee_id: "",
                phone_number: "",
                route_name: ""
            })
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to add porter. Please try again."
            )
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="p-6">
            <div className="card max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Add Porter</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-3" role="alert">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 text-green-700 p-2 rounded mb-3" role="status">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            required
                            value={form.username}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            required
                            minLength={8}
                            value={form.password}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium mb-1">
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                required
                                value={form.first_name}
                                onChange={handleChange}
                                className="milk-input"
                            />
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium mb-1">
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                required
                                value={form.last_name}
                                onChange={handleChange}
                                className="milk-input"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="national_id_number" className="block text-sm font-medium mb-1">
                            National ID Number
                        </label>
                        <input
                            id="national_id_number"
                            type="text"
                            name="national_id_number"
                            required
                            value={form.national_id_number}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="employee_id" className="block text-sm font-medium mb-1">
                            Employee ID
                        </label>
                        <input
                            id="employee_id"
                            type="text"
                            name="employee_id"
                            required
                            value={form.employee_id}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            id="phone_number"
                            type="tel"
                            name="phone_number"
                            required
                            value={form.phone_number}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="route_name" className="block text-sm font-medium mb-1">
                            Route Name
                        </label>
                        <input
                            id="route_name"
                            type="text"
                            name="route_name"
                            required
                            value={form.route_name}
                            onChange={handleChange}
                            className="milk-input"
                        />
                    </div>

                    <button type="submit" className="milk-btn w-full" disabled={saving}>
                        {saving ? "Adding..." : "Add Porter"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PorterAdd