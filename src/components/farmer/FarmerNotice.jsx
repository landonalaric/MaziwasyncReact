import { useEffect, useState } from "react";
import api from "../context/api/api";


const FarmerNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("farmer/notice/");
        setNotices(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notices</h1>
        <p className="text-gray-500 mt-2">
          Updates and announcements from your cooperative.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-6">{error}</div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading notices…</p>
      ) : notices.length === 0 ? (
        <div className="card bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No notices yet.
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {notices.map((notice) => (
            <div key={notice.id} className="card bg-white rounded-lg shadow p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {formatDate(notice.created_at)}
                </span>
              </div>
              <p className="text-gray-600 mt-2 whitespace-pre-line">{notice.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerNotice;