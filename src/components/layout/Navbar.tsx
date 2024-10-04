import React,{ useState,useEffect,useRef } from 'react'
import { Search,User,ShoppingCart,Dumbbell,Menu,X,LogOut,LayoutDashboard } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import CartSheet from '../CartSheet/CartSheet'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion,AnimatePresence } from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'

export default function Navbar() {
    const [activeItem,setActiveItem] = useState('home')
    const [isScrolled,setIsScrolled] = useState(false)
    const [isCartOpen,setIsCartOpen] = useState(false)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(true) // Replace with actual auth state
    const cartItemCount = 2 // Replace with actual cart item count
    const navigate = useNavigate()
    const searchInputRef = useRef<HTMLInputElement>(null)

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
    ]

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            if (searchInputRef.current) {
                searchInputRef.current.blur()
            }
        }
    }

    const handleLogout = () => {
        // Implement logout logic here
        setIsLoggedIn(false)
    }

    return (
        <motion.nav
            className={`sticky top-0 z-50 ${isScrolled ? 'py-2 bg-primary/90 backdrop-blur-md' : 'py-4 bg-primary'
                } shadow-lg`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring',stiffness: 120,damping: 20 }}
        >
            <div className="wrapper px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0,x: -20 }}
                        animate={{ opacity: 1,x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
                            <Dumbbell className="w-8 h-8" />
                            <span className="tracking-wider hidden sm:inline">PrimeLifeFit</span>
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-6">
                        <motion.div
                            initial={{ opacity: 0,x: 20 }}
                            animate={{ opacity: 1,x: 0 }}
                            transition={{ duration: 0.5,delay: 0.2 }}
                        >
                            <SearchBar />
                        </motion.div>

                        <ul className="flex space-x-6">
                            {menuItems.map((item,index) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0,y: -20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    transition={{ duration: 0.5,delay: 0.1 * (index + 1) }}
                                >
                                    <Link
                                        to={item.to}
                                        className={`relative text-white hover:text-white transition-colors duration-300 py-2 group`}
                                        onClick={() => setActiveItem(item.name.toLowerCase())}
                                    >
                                        {item.name}
                                        <motion.span
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-white"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: activeItem === item.name.toLowerCase() ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>

                        {isLoggedIn ? (
                            <motion.div
                                className="flex items-center space-x-4"
                                initial={{ opacity: 0,x: 20 }}
                                animate={{ opacity: 1,x: 0 }}
                                transition={{ duration: 0.5,delay: 0.4 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:text-white transition-colors duration-300 transform hover:scale-110">
                                            <User size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem onSelect={() => navigate('/dashboard')} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-white transition-colors duration-300 transform hover:scale-110">
                                    <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                                    <Badge variant="secondary" className="absolute -top-2 -right-2 bg-red-500 text-white">
                                        {cartItemCount}
                                    </Badge>
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0,x: 20 }}
                                animate={{ opacity: 1,x: 0 }}
                                transition={{ duration: 0.5,delay: 0.4 }}
                            >
                                <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold transition-all duration-300">
                                    <Link to="/signin">Sign In</Link>
                                </Button>
                            </motion.div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 md:hidden">
                        {isLoggedIn ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:text-white transition-colors duration-300">
                                            <User size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuItem onSelect={() => navigate('/dashboard')} className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)} className="relative text-white hover:text-white transition-colors duration-300">
                                    <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                                    <Badge variant="secondary" className="absolute -top-2 -right-2 bg-red-500 text-white">
                                        {cartItemCount}
                                    </Badge>
                                </Button>
                            </>
                        ) : (
                            <Button asChild variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90 font-semibold transition-all duration-300">
                                <Link to="/signin">Sign In</Link>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10 transition-colors duration-300"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 pb-4"
                            initial={{ opacity: 0,height: 0 }}
                            animate={{ opacity: 1,height: 'auto' }}
                            exit={{ opacity: 0,height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-4">
                                <SearchBar />
                            </div>

                            <ul className="space-y-2">
                                {menuItems.map((item,index) => (
                                    <motion.li
                                        key={item.name}
                                        initial={{ opacity: 0,x: -20 }}
                                        animate={{ opacity: 1,x: 0 }}
                                        transition={{ duration: 0.3,delay: 0.1 * index }}
                                    >
                                        <Link
                                            to={item.to}
                                            className={`block text-white hover:bg-white/10 transition-colors duration-300 py-2 px-4 rounded-md`}
                                            onClick={() => {
                                                setActiveItem(item.name.toLowerCase())
                                                setIsMenuOpen(false)
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
        </motion.nav>
    )
}