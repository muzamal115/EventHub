import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'
import { Menu } from 'lucide-react'

const AdminLayout = () => {
    const[sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <div className='min-h-screen bg-gray-50'>
  <AdminSidebar 
  isOpen={sidebarOpen}
  onClose={()=>setSidebarOpen(false)}
   />
   <div className="lg:pl-72">
     <header className="sticky top-0 z-30 flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
            aria-label="Open admin menu"
          >
            <Menu size={24} />
          </button>

          <span className="ml-4 text-lg font-bold text-gray-900">
            Admin Panel
          </span>
        </header>
    <main className='min-h-screen'>
        <Outlet/>
    </main>
    </div>
    </div>
  )
}

export default AdminLayout