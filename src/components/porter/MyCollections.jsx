import React, { useEffect, useState } from 'react'
import api from '../context/api/api'

const MyCollections = () => {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  const FetchCollections = async () => {
    try {
      const {data} =await api.get("collector/collection/my/")
      console.log(data)
      setCollections(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
useEffect(()=>{
  FetchCollections()
},[])

const totallitres = collections.reduce((sum, col) => sum + Number(col.litres), 0)

const totalAmount = collections.reduce((sum, col) => sum + Number(col.total_amount), 0)

  return (
    <div className='space-y-6 p-5'>
      <div>
        <h1 className='text-3xl font-bold'>My collections</h1>
        <p className='text-gray-500'>View your milk collection history </p>
      </div>
      <div className='grid grid-cols md:grid-cols-3 gap-4'>
        <div className='stat-card'>
          <p className='stat-label'>Collections</p>
          <p className='stat-value'>{collections?.length}</p>
        </div>

          <div className='stat-card'>
          <p className='stat-label'>Total Litres</p>
          <p className='stat-value'>{totallitres}</p>
        </div>

         <div className='stat-card'>
          <p className='stat-label'>Total Amount</p>
          <p className='stat-value'>{totalAmount}</p>
        </div>

      </div>

      <div className='card'>
        <h2 className='text-xl font-semibold mb-4'>Collections Records</h2>

        {loading ? (
          <p>Loading collections....</p>
        ) : collections.length === 0 ? (
          <p className='text-gray-500'>No collections found</p>
        ) : null}

      </div>

    <div className='overflow-x-auto'>
      <table className='w-full p-5'>
        <thead className='bg-gradient-to-r from-green-100 to-green-300 p-5'>
          <tr className='border-b text-left p-5'>
            <th className='py-3 pl-3'>Date</th>
            <th className='py-3 pl-3'>Session</th>
            <th className='py-3 pl-3'>Litres</th>
            <th className='py-3 pl-3'>Price</th>
            <th className='py-3 pl-3'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((col) => (
            <tr key={col.id} className='border-b hover:bg-green-50 p-3'>
              <td className='py-3'>{col.collection_date}</td>
              <td className='py-3'>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    col.session === 'MORNING'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700'
                    }`}
                    >
                  {col.session}
                </span>
              </td>
              <td className='py-3'>{col.litres}</td>
              <td className='py-3'>Ksh: {col.price_per_litre}</td>
              <td className='py-3'>{col.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  )
}

export default MyCollections