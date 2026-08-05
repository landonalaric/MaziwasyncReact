import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import api from '../context/api/api'

const FarmerList = () => {
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const FetchFarmers = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('cooperative/farmer/')
      setFarmers(data)
    } catch (error) {
      toast.error('Failed to fetch farmers. Please try again later.')
      console.error('Error fetching farmers:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    FetchFarmers()
  }, [])

  const handleEdit = (farmer) => {
    navigate(`/admin-dashboard/admin/farmers/edit/${farmer.id}`)
  }

  const handleDelete = async (farmer) => {
    if (!window.confirm(`Remove ${farmer.first_name} ${farmer.last_name}?`)) return
    try {
      await api.delete(`cooperative/farmer/${farmer.id}/`)
      setFarmers((prev) => prev.filter((f) => f.id !== farmer.id))
      toast.success('Farmer removed')
    } catch (error) {
      toast.error('Failed to delete farmer. Please try again later.')
      console.error('Error deleting farmer:', error)
    }
  }

  return (
    <div className='p-5'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='text-xl font-bold'>Farmers List</h2>
        <button
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          onClick={() => navigate('/admin-dashboard/admin/farmers/add')}
        >
          Add Farmer
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

      {!loading && farmers.length === 0 && (
        <div className="card text-center py-10 text-gray-500">
          No farmers found.
        </div>
      )}

      {!loading && farmers.length > 0 && (
        <div className='flex flex-col gap-3 mb-5'>

          {/* desktop */}
          <div className='hidden md:block card overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='border-b text-gray-700'>
                <tr>
                  <th className='p-3 text-left'>Farmer</th>
                  <th className='p-3 text-left'>Contact</th>
                  <th className='p-3 text-left'>Farm</th>
                  <th className='p-3 text-left'>Performance</th>
                  <th className='p-3 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((f) => (
                  <tr className='border-b' key={f.id}>
                    <td className='p-3'>
                      <b>{f.first_name} {f.last_name}</b>
                      <br />{f.membership_number}
                    </td>
                    <td className='p-3'>
                      {f.phone_number} <br /> {f.national_id_number}
                    </td>
                    <td className='p-3'>
                      {f.farm_name} <br /> {f.number_of_cows ?? 0} cows
                    </td>
                    <td className='p-3'>
                      {f.total_milk_delivered ?? 0} litres
                      <br /> KSh {f.total_earnings ?? 0}
                    </td>
                    <td className='p-3'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleEdit(f)}
                          className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                        >
                          <i className='bi bi-pencil'></i> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(f)}
                          className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
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
            {farmers.map((f) => (
              <div className='card p-3' key={f.id}>
                <div className='flex justify-between'>
                  <div>
                    <h3 className='font-bold'>{f.first_name} {f.last_name}</h3>
                    <small>{f.membership_number}</small>
                  </div>
                </div>
                <div>
                  <p><i className='bi bi-telephone-fill text-blue-500'></i> {f.phone_number}</p>
                  <p><i className='bi bi-id-card-fill text-blue-500'></i> {f.national_id_number}</p>
                  <p><i className='bi bi-houses-fill text-blue-500'></i> {f.farm_name} ({f.number_of_cows ?? 0} cows)</p>
                  <p><i className='bi bi-droplet-fill text-blue-500'></i> {f.total_milk_delivered ?? 0} litres</p>
                  <p><i className='bi bi-cash-coin text-blue-500'></i> KSh {f.total_earnings ?? 0}</p>
                </div>
                <div className='flex gap-2 mt-3'>
                  <button
                    onClick={() => handleEdit(f)}
                    className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700'
                  >
                    <i className='bi bi-pencil'></i> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f)}
                    className='bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700'
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

export default FarmerList