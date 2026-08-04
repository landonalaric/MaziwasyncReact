import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const AdminProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: ""
    })
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [passwordForm, setPasswordForm] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    })
    const [passwordError, setPasswordError] = useState("")
    const [passwordSuccess, setPasswordSuccess] = useState("")

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("admin/profile/")
                setProfile({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    role: data.role || ""
                })
            } catch (err) {
                setError("Failed to load profile")
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError("")
        setSuccess("")
        try {
            await api.patch("admin/profile/")
            setSuccess("Profile updated successfully")
            setEditMode(false)
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Failed to update profile. Please try again."
            )
        } finally {
            setSaving(false)
        }
    }

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setPasswordError("")
        setPasswordSuccess("")

        if (passwordForm.new_password !== passwordForm.confirm_password) {
            setPasswordError("New passwords do not match")
            return
        }

        try {
            await api.post("admin/change-password/", {
                current_password: passwordForm.current_password,
                new_password: passwordForm.new_password
            })
            setPasswordSuccess("Password changed successfully")
            setPasswordForm({ current_password: "", new_password: "", confirm_password: "" })
        } catch (err) {
            setPasswordError(
                err?.response?.data?.message ||
                "Failed to change password"
            )
        }
    }

    if (loading) {
        return (
            <div className="p-6">
                <div className="card animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-5 gap-6 p-6 items-start">
            <div className="col-span-3 card">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Admin Profile</h2>
                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="milk-btn"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

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

                {editMode ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                value={profile.name}
                                onChange={handleChange}
                                className="milk-input"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                value={profile.email}
                                onChange={handleChange}
                                className="milk-input"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                className="milk-input"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button type="submit" className="milk-btn" disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <dl className="space-y-3">
                        <div>
                            <dt className="text-sm text-gray-500">Full Name</dt>
                            <dd className="text-base font-medium">{profile.name || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Email</dt>
                            <dd className="text-base font-medium">{profile.email || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Phone Number</dt>
                            <dd className="text-base font-medium">{profile.phone || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm text-gray-500">Role</dt>
                            <dd className="text-base font-medium capitalize">{profile.role || "Admin"}</dd>
                        </div>
                    </dl>
                )}
            </div>

            <div className="col-span-2 card">
                <h3 className="text-lg font-semibold mb-4">Change Password</h3>

                {passwordError && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-3" role="alert">
                        {passwordError}
                    </div>
                )}
                {passwordSuccess && (
                    <div className="bg-green-100 text-green-700 p-2 rounded mb-3" role="status">
                        {passwordSuccess}
                    </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="current_password" className="block text-sm font-medium mb-1">
                            Current Password
                        </label>
                        <input
                            id="current_password"
                            type="password"
                            name="current_password"
                            required
                            value={passwordForm.current_password}
                            onChange={handlePasswordChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="new_password" className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <input
                            id="new_password"
                            type="password"
                            name="new_password"
                            required
                            minLength={8}
                            value={passwordForm.new_password}
                            onChange={handlePasswordChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium mb-1">
                            Confirm New Password
                        </label>
                        <input
                            id="confirm_password"
                            type="password"
                            name="confirm_password"
                            required
                            minLength={8}
                            value={passwordForm.confirm_password}
                            onChange={handlePasswordChange}
                            className="milk-input"
                        />
                    </div>

                    <button type="submit" className="milk-btn w-full">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminProfile