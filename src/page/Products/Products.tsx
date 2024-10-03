'use client'

import React,{ useState,useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion,AnimatePresence } from 'framer-motion'
import { Search,X,Filter } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import Image from "@/assets/hero1.jpg"

// Mock data for demonstration
const mockProducts = [
    { id: 1,name: "Treadmill Pro",price: 999.99,category: "Cardio",image: Image,inStock: true },
    { id: 2,name: "Dumbbell Set",price: 149.99,category: "Strength",image: Image,inStock: true },
    { id: 3,name: "Yoga Mat",price: 29.99,category: "Yoga",image: Image,inStock: false },
    { id: 4,name: "Exercise Bike",price: 499.99,category: "Cardio",image: Image,inStock: true },
    { id: 5,name: "Resistance Bands",price: 19.99,category: "Strength",image: Image,inStock: true },
]

const categories = ["Cardio","Strength","Yoga"]

export default function Products() {
    const [products,setProducts] = useState(mockProducts)
    const [searchTerm,setSearchTerm] = useState("")
    const [selectedCategories,setSelectedCategories] = useState<string[]>([]);
    const [priceRange,setPriceRange] = useState([0,1000])
    const [sortOrder,setSortOrder] = useState("asc")
    const [isFilterModalOpen,setIsFilterModalOpen] = useState(false)

    const filterProducts = () => {
        const filteredProducts = mockProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )

        // Sort products
        filteredProducts.sort((a,b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        )

        setProducts(filteredProducts)
    }

    useEffect(() => {
        filterProducts()
    },[searchTerm,selectedCategories,priceRange,sortOrder])

    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev,category]
        )
    }

    const clearFilters = () => {
        setSearchTerm("")
        setSelectedCategories([])
        setPriceRange([0,1000])
        setSortOrder("asc")
    }

    const toggleFilterModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen)
    }

    const FilterContent = () => (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-2">Search</h2>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Categories</h2>
                {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={category}>{category}</Label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Price Range</h2>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Low to High</SelectItem>
                        <SelectItem value="desc">High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={clearFilters} variant="outline" className="w-full hover:bg-gray-200 transition-colors">
                Clear Filters
                <X className="ml-2 h-4 w-4" />
            </Button>
        </>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0,y: -20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Fitness Equipment
            </motion.h1>

            <div className="lg:hidden mb-4">
                <Button onClick={toggleFilterModal} className="w-full">
                    <Filter className="mr-2 h-4 w-4" /> Filter Products
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                {/* Filter section for large screens */}
                <motion.div
                    className="hidden lg:block w-1/4 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                    initial={{ opacity: 0,x: -20 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.5,delay: 0.2 }}
                >
                    <FilterContent />
                </motion.div>

                {/* Filter modal for small screens */}
                <AnimatePresence>
                    {isFilterModalOpen && (
                        <motion.div
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="w-10/12 lg:w-1/4 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md fixed lg:static top-0 left-0 h-full lg:h-auto z-50 overflow-y-auto"
                                initial={{ opacity: 0,x: "-100%" }}
                                animate={{ opacity: 1,x: 0 }}
                                exit={{ opacity: 0,x: "-100%" }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Filters</h2>
                                    <Button variant="ghost" onClick={toggleFilterModal}>
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                                <FilterContent />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    className="w-full lg:w-3/4"
                    initial={{ opacity: 0,x: 20 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.5,delay: 0.4 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product,index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ duration: 0.5,delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                    {products.length === 0 && (
                        <p className="text-center text-gray-500 mt-8 text-lg">No products found matching your criteria.</p>
                    )}
                </motion.div>
            </div>
        </div>
    )
}