import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import SplashScreen from '@/components/SplashScreen'
import Home from '@/pages/Home'
import Conferences from '@/pages/Conferences'
import CorporateAds from '@/pages/CorporateAds'
import Designs from '@/pages/Designs'
import OurWork from '@/pages/OurWork'
import Contact from '@/pages/Contact'
import Quote from '@/pages/Quote'
import AdminLogin from '@/pages/admin/AdminLogin'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminProjects from '@/pages/admin/AdminProjects'
import AdminRequests from '@/pages/admin/AdminRequests'
import AdminSettings from '@/pages/admin/AdminSettings'
import AdminVideos from '@/pages/admin/AdminVideos'

export default function App() {
  return (
    <LanguageProvider>
      <SplashScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conferences" element={<Conferences />} />
          <Route path="/corporate-ads" element={<CorporateAds />} />
          <Route path="/designs" element={<Designs />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="videos" element={<AdminVideos />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
