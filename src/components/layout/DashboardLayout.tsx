import React from 'react'
import Sidebar from './Sidebar'
import DashboardNavbar from './DashboardNavbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <DashboardNavbar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout