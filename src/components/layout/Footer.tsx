
import { Facebook,Instagram,Twitter,Mail,Phone,MapPin,Youtube,Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className=" bg-primary mt-10 px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid text-white wrapper grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white">
                        <Dumbbell className="w-8 h-8" />
                        <span className="tracking-wider">PrimeLifeFit</span>
                    </Link>
                    <p className="text-gray-400 mt-2">Empowering your fitness journey with top-quality equipment.</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Facebook</span>
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <span className="sr-only">YouTube</span>
                            <Youtube size={24} />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                        <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                    <ul className="space-y-2">
                        <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                        <li><Link to="/warranty" className="text-gray-400 hover:text-white transition-colors">Warranty</Link></li>
                        <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <Mail size={20} className="mr-2" />
                            <a href="mailto:info@fitgearpro.com" className="text-gray-400 hover:text-white transition-colors">info@fitgearpro.com</a>
                        </li>
                        <li className="flex items-center">
                            <Phone size={20} className="mr-2" />
                            <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">+1 (234) 567-890</a>
                        </li>
                        <li className="flex items-center">
                            <MapPin size={20} className="mr-2" />
                            <span className="text-gray-400">123 Fitness Street, Gym City, SP 12345</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} FitGear Pro. All rights reserved.</p>
            </div>
        </footer >
    )
}