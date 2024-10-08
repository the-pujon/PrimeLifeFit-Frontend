import React,{ useState,useRef } from 'react'
import { Search,Loader2,Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { motion,AnimatePresence } from 'framer-motion'
import { useDebounce } from '@/hooks/useDebounce'
import { useGetAllProductsQuery } from '@/redux/features/product/productApi'
import { Product } from '@/types/Product'
import { useAppDispatch } from '@/redux/hook'
import { addItem } from '@/redux/features/cart/cartSlice'
import { toast } from 'sonner'

export default function SearchBar() {
    const [searchQuery,setSearchQuery] = useState('')
    const [isFocused,setIsFocused] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const debouncedSearchQuery = useDebounce(searchQuery,300)

    const dispatch = useAppDispatch()

    const { data: searchResults,isLoading } = useGetAllProductsQuery(debouncedSearchQuery)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setIsFocused(false)
            if (searchInputRef.current) {
                searchInputRef.current.blur()
            }
        }
    }

    const handleAddToCart = (product: Product) => {
        toast.success("Product added to cart");
        dispatch(addItem(product))
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false),200)}
                    className="pl-12 pr-4 py-3 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 w-full text-base"
                    ref={searchInputRef}
                />
                <motion.div
                    className="absolute left-4 top-1/3 transform -translate-y-1/2 text-white/70"
                    animate={{ rotate: isLoading ? 360 : 0 }}
                    transition={{ duration: 1,repeat: isLoading ? Infinity : 0,ease: "linear" }}
                >
                    {isLoading ? <Loader2 size={20} /> : <Search size={20} />}
                </motion.div>
            </form>
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0,y: 10,scale: 0.95 }}
                        animate={{ opacity: 1,y: 0,scale: 1 }}
                        exit={{ opacity: 0,y: 10,scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-2xl py-2 max-h-[70vh] overflow-auto"
                    >
                        {isLoading ? (
                            <div className="text-center py-6 text-gray-500">
                                <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                                <p className="text-sm">Searching for products...</p>
                            </div>
                        ) : searchQuery && (!searchResults || searchResults.data.length === 0) ? (
                            <div className="text-center py-6 text-gray-500">
                                <Search className="mx-auto mb-2" size={24} />
                                <p className="text-sm">No products found</p>
                                <p className="text-xs mt-1">Try a different search term</p>
                            </div>
                        ) : !searchQuery ? (
                            <div className="text-center py-6 text-gray-500">
                                <Search className="mx-auto mb-2" size={24} />
                                <p className="text-sm">Start typing to search</p>
                                <p className="text-xs mt-1">Find the perfect product for you</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {searchResults.data.map((product: Product) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0,y: 5 }}
                                        animate={{ opacity: 1,y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        <img src={product.photos[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                        <div className="flex-grow min-w-0">
                                            <h3 className="font-medium text-gray-800 text-sm truncate">{product.name}</h3>
                                            <p className="text-primary text-xs font-medium mt-1">${product.price.toFixed(2)}</p>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-primary text-white p-1.5 rounded-full text-xs font-medium ml-2 flex-shrink-0"
                                            aria-label="Add to cart"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <Plus size={14} />
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}