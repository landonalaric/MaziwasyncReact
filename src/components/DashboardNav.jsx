import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

function DashboardNav  ({onMenuClick})  {
    const {user,Logout}=useContext(AuthContext)
  return (
    <nav className='w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-4 md:px-6 py-3'>
        <div className="flex items-center justify-between">
            {/* left side  */}
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className='md:hidden text-2xl text-gray-700 active:scale-95 transition'>
                    <i className='bi-bi-list'></i>
                </button>
                {/* brand  */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">M</div>
                    <span className="text-lg md:text-xl font-bold text-green-600">MaziwaSync</span>
                </div>
            </div>
            {/* right side  */}
            <div className="flex items-center gap-3 md:gap-4">
                {/* user card hidden on small devices  */}
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-15 rounded-full">
                    <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center text-sm font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className='text-sm font-semibold text-gray-800'>
                            {user?.username}
                        </span>
                        <span className='teext-xs text-green-600 font-medium'>
                            {user?.role}
                        </span>
                    </div>
                </div>
                {/* logout  */}
                <button onClick={Logout} className='px-3 md:px-4 py-1.5 text-sm rounded-lg border border-red text-red-600 hover:bg-red-500 hover:text-white transition active:scale-95'>
                    Logout
                </button>
            </div>
        </div>

    </nav>
  )
}

export default DashboardNav