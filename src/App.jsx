import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import NotAuthorized from './components/NotAuthorized'
import NotFound from './components/NotFound'
import { AuthProvider } from './components/context/AuthContext'
import Login from './components/Login'
import ProtectedRoute from './components/context/ProtectedRoute'
import PorterDashboard from './components/porter/PorterDashboard'
import PorterLayout from './components/porter/PorterLayout'
import CollectMilk from './components/porter/CollectMilk'
import MyCollections from './components/porter/MyCollections'
import PorterNotices from './components/porter/PorterNotices'
import PorterProfile from './components/porter/PorterProfile'
import FarmerDashboard from './components/farmer/FarmerDashboard'
import FarmerLayout from './components/farmer/FarmerLayout'
import FarmerNotice from './components/farmer/FarmerNotice'
import FarmerProfile from './components/farmer/FarmerProfile'
import MilkCollection from './components/farmer/MilkCollection'
import FarmerFeedback from './components/farmer/FarmerFeedback'
import CattleAi from './components/farmer/CattleAi'
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminLayout from './components/Admin/AdminLayout'
import AdminProfile from './components/Admin/AdminProfile'
import PortersList from './components/Admin/PortersList'
import { ToastContainer } from 'react-toastify'
import PorterAdd from './components/Admin/PorterAdd'
import PorterEdit from './components/Admin/PorterEdit'
import FarmerList from './components/Admin/FarmerList'
import FarmerEdit from './components/Admin/FarmerEdit'
import FarmerAdd from './components/Admin/FarmerAdd'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
      <AuthProvider>
        <ToastContainer 
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        />
        <Routes>
          {/* porter role routes */}
          <Route path='/porter-dashboard' element={
            <ProtectedRoute allowedRoles={["porter"]}>
              <PorterLayout />
            </ProtectedRoute>
          }>
            <Route path='' element={<PorterDashboard />} />
            <Route path='porter/collect-milk' element={<CollectMilk />} />
            <Route path='porter/collections' element={<MyCollections />} />
            <Route path='porter/profile' element={<PorterProfile />} />
            <Route path='porter/notices' element={<PorterNotices />} />
          </Route>

          {/* farmer role routes */}
          <Route path='/farmer-dashboard' element={
            <ProtectedRoute allowedRoles={["farmer"]}>
              <FarmerLayout />
            </ProtectedRoute>
          }>
            <Route path='' element={<FarmerDashboard />} />
            <Route path='farmer/notice' element={<FarmerNotice />} />
            <Route path='farmer/profile' element={<FarmerProfile />} />
            <Route path='farmer/collections' element={<MilkCollection />} />
            <Route path='farmer/feedback' element={<FarmerFeedback />} />
            <Route path='farmer/cattle-ai' element={<CattleAi />} />
          </Route>

          {/* Admin role routes */}
          <Route path='/admin-dashboard' element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path='' element={<AdminDashboard />} />
            <Route path='admin/profile' element={<AdminProfile />} />
            <Route path='admin/porters' element={<PortersList />} />
            <Route path='admin/porters/add' element={<PorterAdd />} />
            <Route path='admin/porters/edit/:id' element={<PorterEdit />} />
            <Route path='admin/farmers' element={<FarmerList />} />
            <Route path='admin/farmers/add' element={<FarmerAdd />} />
            <Route path='admin/farmers/edit/:id' element={<FarmerEdit />} />
          </Route>

          <Route path='' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/not-authorized' element={<NotAuthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </AuthProvider>
    </Router>
  )
}

export default App
