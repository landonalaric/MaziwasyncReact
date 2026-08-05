import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../context/api/api";


const PorterEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        national_id_number: '',
        employee_id: '',
        route_name: '',
        is_active: true,
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchPorter = async () => {
            try {
                const { data } = await api.get(`cooperative/porter/${id}/`);
                setForm({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    national_id_number: data.national_id_number,
                    employee_id: data.employee_id,
                    route_name: data.route_name,
                    is_active: data.is_active,
                });
            } catch (error) {
                toast.error('Failed to fetch porter. Please try again later.');
            } finally {
                setFetching(false);
            }
        };

        fetchPorter();
    }, [id]);

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
}
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.patch(`cooperative/porter/${id}/`, form);
            toast.success('Porter updated successfully');
            navigate('/admin-dashboard/admin/porters');
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                'Failed to update porter. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <p className='p-6 text-gray-700'>Loading porter details...</p>;

    return (
        <div className='p-6 max-w-2xl mx-auto'>
            <div className='flex items-center gap-4 mb-6'>
                <button
                    type='button'
                    className='text-green-600 hover:text-green-800'
                    onClick={() => navigate('/admin-dashboard/admin/porters')}
                >
                    Back
                </button>

                <h2 className='text-2xl font-bold text-gray-800'>Edit Porter</h2>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
                <p className='font-semibold text-gray-700'>Personal Information</p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <label htmlFor='first_name' className='form-label'>First Name</label>
                        <input
                            id='first_name'
                            type='text'
                            name='first_name'
                            className='milk-input'
                            value={form.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='last_name' className='form-label'>Last Name</label>
                        <input
                            id='last_name'
                            type='text'
                            name='last_name'
                            className='milk-input'
                            value={form.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='national_id_number' className='form-label'>National ID Number</label>
                        <input
                            id='national_id_number'
                            type='text'
                            name='national_id_number'
                            className='milk-input'
                            value={form.national_id_number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='employee_id' className='form-label'>Employee ID</label>
                        <input
                            id='employee_id'
                            type='text'
                            name='employee_id'
                            className='milk-input'
                            value={form.employee_id}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                        <label htmlFor='route_name' className='form-label'>Route Name</label>
                        <input
                            id='route_name'
                            type='text'
                            name='route_name'
                            className='milk-input'
                            value={form.route_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex items-center gap-2 md:col-span-2'>
                        <input
                            id='is_active'
                            type='checkbox'
                            name='is_active'
                            checked={form.is_active}
                            onChange={handleChange}
                        />
                        <label htmlFor='is_active' className='form-label'>Active</label>
                    </div>
                </div>

                <button
                    type='submit'
                    className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-60'
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default PorterEdit;