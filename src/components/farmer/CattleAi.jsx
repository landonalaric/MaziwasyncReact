import React, { useState } from 'react'
import api from '../context/api/api'
import ReactMarkdown from "react-markdown"

const CattleAi = () => {
    const [form, setForm] = useState({
        Animal: "cow",
        Temperature: "",
        Age: "",
        Description: ""
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // function to handle changes in the form
    const HandleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setResult(null)

        const payload = {
            ...form,
            Temperature: Number(form.Temperature),
            Age: Number(form.Age)
        }

        try {
            const { data } = await api.post("farmer/predict/", payload)
            setResult(data)
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.detail ||
                "Prediction Failed. Please try again."
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid grid-cols-5 gap-6 p-6 items-start">
            <div className="col-span-2 card">
                <h2 className="text-2xl font-bold mb-4">Cattle AI</h2>
                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-3" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={HandleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="animal" className="block text-sm font-medium mb-1">
                            Animal
                        </label>
                        <select
                            id="animal"
                            className="milk-input"
                            name="Animal"
                            value={form.Animal}
                            onChange={HandleChange}
                        >
                            <option value="cow">Cow</option>
                            <option value="goat">Goat</option>
                            <option value="sheep">Sheep</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="temperature" className="block text-sm font-medium mb-1">
                            Temperature (°F)
                        </label>
                        <input
                            id="temperature"
                            type="number"
                            name="Temperature"
                            placeholder="Temperature °F"
                            required
                            value={form.Temperature}
                            onChange={HandleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium mb-1">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            name="Age"
                            placeholder="Age"
                            required
                            value={form.Age}
                            onChange={HandleChange}
                            className="milk-input"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                            Symptoms
                        </label>
                        <textarea
                            id="description"
                            className="milk-input"
                            name="Description"
                            rows={4}
                            placeholder="Describe the symptoms of your cattle..."
                            value={form.Description}
                            onChange={HandleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="milk-btn w-full" disabled={loading}>
                        {loading ? "Analysing..." : "Predict"}
                    </button>
                </form>
            </div>

            <div className="col-span-3 space-y-4">
                {loading && (
                    <div className="card animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                    </div>
                )}

                {!loading && result && (
                    <>
                        <div className="card">
                            <h3 className="font-semibold">Disease</h3>
                            <p className="text-2xl text-green-500 capitalize font-bold">
                                {result.predicted_disease}
                            </p>
                        </div>

                        <div className="card">
                            <h3 className="font-semibold mb-2">Symptoms</h3>
                            <div className="flex flex-wrap gap-2">
                                {result.extracted_symptoms_by_ai?.map((item, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="font-semibold mb-2">Treatment</h3>
                            <ReactMarkdown>{result.treatment_recommendation}</ReactMarkdown>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CattleAi