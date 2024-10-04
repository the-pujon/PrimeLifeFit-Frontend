import React,{ useState } from 'react'
import { Link,useLocation } from 'react-router-dom'
import { ShoppingBasket,Users,ShoppingBag,PanelsTopLeft,Menu,X } from 'lucide-react'

const Sidebar: React.FC = () => {
    const location = useLocation()
    const [isOpen,setIsOpen] = useState(false)

    const menuItems = [
        { icon: PanelsTopLeft,name: 'Overview',path: '/dashboard' },
        //{ icon: BarChart2, name: 'Analytics', path: '/dashboard/analytics' },
        { icon: Users,name: 'Customers',path: '/dashboard/customer-management' },
        { icon: ShoppingBasket,name: 'Products',path: '/dashboard/product-management' },
        { icon: ShoppingBag,name: 'Orders',path: '/dashboard/order-management' },
        //{ icon: Settings, name: 'Settings', path: '/dashboard/settings' },
        //{ icon: HelpCircle, name: 'Help', path: '/dashboard/help' },
    ]

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-20 bg-gray-900 text-white p-2 rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className={`pt-20 bg-gray-900 text-gray-100 w-64 min-h-screen p-4 fixed left-0 top-0 z-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
                <div className="flex items-center justify-center mb-8">
                    <span className="text-2xl font-bold">PrimeLifeFit</span>
                </div>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.name} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${location.pathname === item.path
                                    ? 'bg-white/10 text-white'
                                    : 'hover:bg-gray-800'
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    )
}

export default Sidebar