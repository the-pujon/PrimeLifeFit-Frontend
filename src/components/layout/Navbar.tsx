import { useState,useEffect } from 'react'
import { Search,User,ShoppingCart,Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'
//import CartSheet fr'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CartSheet from '../CartSheet/CartSheet'

export default function Navbar() {
    const [activeItem,setActiveItem] = useState('cardio')
    const [isScrolled,setIsScrolled] = useState(false)
    const [isCartOpen,setIsCartOpen] = useState(false)
    const cartItemCount = 2 // Replace with actual cart item count

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll',handleScroll)
        return () => window.removeEventListener('scroll',handleScroll)
    },[])

    const menuItems = [
        { name: 'Home',to: '/' },
        { name: 'Our Products',to: '/products' },
        { name: 'About us',to: '/about-us' },
        //{ name: 'ACCESSORIES',to: '/accessories' },
        //{ name: 'OUTLET',to: '/outlet' },
        //{ name: 'TOOLS',to: '/tools' },
        //{ name: 'FOR FACILITY',to: '/for-facility' },
    ]

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
            } bg-primary shadow-lg`}>
            <div className="wrapper px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
                        <Dumbbell className="w-8 h-8" />
                        <span className="tracking-wider">PrimeLifeFit</span>
                    </Link>

                    <ul className="hidden md:flex space-x-6">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.to}
                                    className={`relative text-white hover:text-white transition-colors duration-300 py-2 group`}
                                    onClick={() => setActiveItem(item.name.toLowerCase())}
                                >
                                    {item.name}
                                    <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${activeItem === item.name.toLowerCase() ? 'scale-x-100' : ''
                                        }`} />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center space-x-6">
                        <button aria-label="Search" className="text-white hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <Search size={20} />
                        </button>
                        <button aria-label="User account" className="text-white hover:text-white transition-colors duration-300 transform hover:scale-110">
                            <User size={20} />
                        </button>
                        <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-primary">
                            <ShoppingCart className="h-[1.2rem] w-[1.2rem] " />
                            <Badge variant="secondary" className="absolute -top-2 -right-2">
                                {cartItemCount}
                            </Badge>
                        </Button>
                    </div>
                </div>
            </div>

            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
        </nav>
    )
}