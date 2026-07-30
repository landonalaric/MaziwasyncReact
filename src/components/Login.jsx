import React, { useContext, useState } from 'react'
import api from './context/api/api'
import { AuthContext } from './context/AuthContext'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
    const{setToken,setUser}=useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    // ui hooks 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    // hook to allow programmatic redirects 
    const navigate=useNavigate()
    // function to handle our login request 
    const handleLogin=async(e)=>{
        e.preventDefault()
        setLoading(true)

        // prepare our data to send to backend
        const data={username,password}
        try {
            const res=await api.post("core/auth/login/", data)
            console.log("Response",res)
            setLoading(false)
            // handle incase of wrong credentials 
            if (res.data.error){
                setError(res.data.error)
            }
            // if right credentials 
            const {access,refresh,role,username}=res.data
            // console.log(access_token)

            // create the user object 
            const userData={username,role}
            // save them to our context 
            setToken(access)
            setUser(userData)

            // saving to the localStorage
            localStorage.setItem("access", access)
            localStorage.setItem("refresh",refresh)
            localStorage.setItem("user",JSON.stringify(userData))
            console.log(res.data);

            // role based redirects 
            if(role==="admin"){
                navigate('/admin-dashboard')
            }
            else if(role==='farmer'){
                navigate("/farmer-dashboard")
            }
            else if(role==='porter'){
                navigate("/porter-dashboard")
            }

        } catch (error) {
            setLoading(false)
            setError("Error", error)
        }
    }
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-200' >
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6 text-green-600">Login</h1>
                {/* our hook messages  */}
                {success && (<div className='mb-4 text-green-600 bg-green-100 p-2 rounded text-sm text-center'>{success}</div>)}
                {error && (<div className='mb-4 text-red-600 bg-red-100 p-2 rounded text-sm text-center'>{error}</div>)}
                <input type="text" placeholder='Username' required className="w-full px-4 py-3 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-green-500 focus:border-green-500"
                 value={username} onChange={(e) => setUsername(e.target.value)} />

                <input type="password" placeholder='Password' required className=" mt-5 w-full px-4 py-3 border border-gray-300 rounded-lg transition focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'  disabled={loading} className='w-full bg-green-600 mt-5 text-white p-2 rounded-lg hover:bg-green-800'>
                    {loading ? "Logging in...": "Login"}
                </button>

            </form>

        </div>
    )
}

export default Login