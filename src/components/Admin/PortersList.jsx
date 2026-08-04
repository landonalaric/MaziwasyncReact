import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../context/api/api'
import { useNavigate } from 'react-router-dom'

const PortersList = () => {
    const [porters, setPorters] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const FetchPorters = async () => {
        setLoading(true)
        try {
            const { data } = await api.get('cooperative/porter/')
            setPorters(data)
            console.log(data)
        } catch (error) {
            toast.error('Failed to fetch porters. Please try again later.')
            console.log('Error fetching porters:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        FetchPorters()
    }, [])

    const handleEdit = (porter) => {
        navigate(`/admin-dashboard/admin/porters/${porter.id}/edit`)
    }

    const handleDelete = async (porter) => {
        if (!window.confirm(`Remove ${porter.first_name} ${porter.last_name}?`)) return
        try {
            await api.delete(`cooperative/porter/${porter.id}/`)
            setPorters((prev) => prev.filter((p) => p.id !== porter.id))
            toast.success('Porter removed')
        } catch (error) {
            toast.error('Failed to delete porter. Please try again later.')
            console.log('Error deleting porter:', error)
        }
    }

    return (
        <div className='p-5'>
            <div className='flex justify-between items-center mb-5'>
                <h2 className='text-xl font-bold'>Porters List</h2>
                <button
                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
                    onClick={() => navigate('/admin-dashboard/admin/porters/add')}
                >
                    Add Porter
                </button>
            </div>

            {loading && (
                <div className="card animate-pulse space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
            )}

            {!loading && porters.length === 0 && (
                <div className="card text-center py-10 text-gray-500">
                    No porters found.
                </div>
            )}

            {!loading && porters.length > 0 && (
                <div className='flex flex-col gap-3 mb-5'>

                    {/* desktop */}
                    <div className='hidden md:block card overflow-x-auto'>
                        <table className='w-full text-sm'>
                            <thead className='border-b text-gray-700'>
                                <tr>
                                    <th className='p-3 text-left'>Employee</th>
                                    <th className='p-3 text-left'>Contact</th>
                                    <th className='p-3 text-left'>Route</th>
                                    <th className='p-3 text-left'>Performance</th>
                                    <th className='p-3 text-left'>Status</th>
                                    <th className='p-3 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {porters.map((p) => (
                                    <tr className='border-b' key={p.id}>
                                        <td className='p-3'>
                                            <b>{p.first_name} {p.last_name}</b>
                                            <br />{p.employee_id}
                                        </td>
                                        <td className='p-3'>
                                            {p.phone_number} <br /> {p.national_id_number}
                                        </td>
                                        <td className='p-3'>
                                            {p.route_name}
                                        </td>
                                        <td className='p-3'>
                                            collection: {p.total_collections ?? 0}
                                            <br /> {p.total_litres_collected ?? 0} litres
                                        </td>
                                        <td className='p-3'>
                                            <span className={p.is_active ? 'bg-green-100 text-green-800 px-2 py-1 rounded' : 'bg-red-100 text-red-800 px-3 py-1 rounded'}>
                                                {p.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className='p-3'>
                                            <div className='flex gap-2'>
                                                <button
                                                    onClick={() => navigate(`/admin-dashboard/admin/porters/edit/${p.id}`)}
                                                    className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'

                                                    
                                                >
                                                    <i className='bi bi-pencil'></i> Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin-dashboard/admin/porters/${p.id}/delete`)}
                                                    className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                                                    onClick={() => handleDelete(p)}
                                                >
                                                    <i className='bi bi-trash'></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* mobile */}
                    <div className='md:hidden space-y-3'>
                        {porters.map((p) => (
                            <div className='card p-3' key={p.id}>
                                <div className='flex justify-between'>
                                    <div>
                                        <h3 className='font-bold'>{p.first_name} {p.last_name}</h3>
                                        <small>{p.employee_id}</small>
                                    </div>
                                    <i className={p.is_active ? 'bi bi-check-circle-fill text-green-600' : 'bi bi-x-circle-fill text-red-600'}></i>
                                </div>
                                <div>
                                    <p><i className='bi bi-telephone-fill text-blue-500'></i> {p.phone_number}</p>
                                    <p><i className='bi bi-id-card-fill text-blue-500'></i> {p.national_id_number}</p>
                                    <p><i className='bi bi-geo-alt-fill text-blue-500'></i> {p.route_name}</p>
                                    <p><i className='bi bi-droplet-fill text-blue-500'></i> {p.total_litres_collected ?? 0} litres</p>
                                    <p><i className='bi bi-calendar-event-fill text-blue-500'></i> {p.hired_date}</p>
                                </div>
                                <div className='flex gap-2 mt-3'>
                                    <button
                                                    onClick={() => navigate(`/admin-dashboard/admin/porters/edit/${p.id}`)}
                                                    className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'

                                                    
                                                >
                                                    <i className='bi bi-pencil'></i> Edit
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin-dashboard/admin/porters/${p.id}/delete`)}
                                                    className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
                                                    onClick={() => handleDelete(p)}
                                                >
                                                    <i className='bi bi-trash'></i> Delete
                                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PortersList