import React, { useState, useEffect } from "react";
import api from "../context/api/api";

const MilkCollection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const { data } = await api.get("farmer/collection/");
      console.log(data);
      setCollections(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const totalLitres = collections.reduce((sum, c) => sum + Number(c.litres), 0);
  const totalAmount = collections.reduce((sum, c) => sum + Number(c.total_amount), 0);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="space-y-6 p-5">
      <div>
        <h1 className="text-3xl font-bold">Milk Collection Summary</h1>
        <p className="text-gray-500">View your milk collection statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="stat-label">Total Collections</p>
          <p className="stat-value">{collections.length}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Total Litres</p>
          <p className="stat-value">{totalLitres} L</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Total Amount</p>
          <p className="stat-value">Ksh {totalAmount}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Collections Records</h2>

        {collections.length === 0 ? (
          <p className="text-gray-500">No collections found</p>
        ) : (
          
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Session</th>
                <th className="py-2">Litres</th>
                <th className="py-2">Price/L</th>
                <th className="py-2">Amount (Ksh)</th>
                <th className="py-2">Porter</th>
              </tr>
            </thead>

            <tbody>
              {collections.map((c) => (
                <tr key={c.id} className="border-b">
                  <td className="py-2">{c.collection_date}</td>
                  <td className="py-2">{c.session}</td>
                  <td className="py-2">{c.litres} L</td>
                  <td className="py-2">Ksh {c.price_per_litre}</td>
                  <td className="py-2">Ksh {c.total_amount}</td>
                  <td className="py-2">{c.porter_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MilkCollection;