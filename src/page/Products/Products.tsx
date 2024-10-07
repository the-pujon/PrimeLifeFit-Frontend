import { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { motion,AnimatePresence } from 'framer-motion'
import { X,Filter } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { useGetAllProductsQuery } from '@/redux/features/product/productApi'
import { categories } from '@/utils/Categories'
import { useDebounce } from '@/hooks/useDebounce'
import FilterBar from '@/components/Products/FilterBar'
import { useLocation } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    brand: string;
    description: string;
    photos: string[];
    stock: number;
}

export default function Products() {
    const location = useLocation();
    const [searchTerm,setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm,300)
    const { data,isLoading,error } = useGetAllProductsQuery(debouncedSearchTerm)
    const [filteredProducts,setFilteredProducts] = useState<Product[]>([])
    const [selectedCategories,setSelectedCategories] = useState<string[]>([]);
    const [priceRange,setPriceRange] = useState([0,1000])
    const [sortOrder,setSortOrder] = useState("asc")
    const [isFilterModalOpen,setIsFilterModalOpen] = useState(false)


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryParam = params.get('category');
        if (categoryParam) {
            setSelectedCategories([categoryParam]);
        }
    },[location]);

    const filterProducts = () => {
        if (!data || !data.data) {
            console.log('No data available to filter')
            return
        }

        const filtered = data.data.filter((product: Product) => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

            return categoryMatch && priceMatch
        })

        filtered.sort((a: Product,b: Product) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        )

        setFilteredProducts(filtered)
    }

    useEffect(() => {
        if (data && data.data) {
            filterProducts()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data,selectedCategories,priceRange,sortOrder])

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

    const itemVariants = {
        hidden: { y: 20,opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    }

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
                    className="hidden lg:block w-1/4 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md sticky top-16 self-start"
                    initial={{ opacity: 0,x: -20 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.5,delay: 0.2 }}
                >
                    <FilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategories={selectedCategories}
                        handleCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                        clearFilters={clearFilters}
                        categories={categories}
                    />
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

                                <FilterBar
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    selectedCategories={selectedCategories}
                                    handleCategoryChange={handleCategoryChange}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                    sortOrder={sortOrder}
                                    setSortOrder={setSortOrder}
                                    clearFilters={clearFilters}
                                    categories={categories}
                                />
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
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(6).fill(0).map((_,index) => (
                                <motion.div key={index} variants={itemVariants} >
                                    <Skeleton className="h-[200px] sm:h-[250px] lg:h-[28rem] w-full rounded-lg" />
                                </motion.div>
                            ))}
                        </div>
                    ) : error ? (
                        <p className="text-center text-red-500 mt-8 text-lg">Error loading products: {error.toString()}</p>
                    ) : filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8 text-lg">No products found matching your criteria.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product,index) => (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0,y: 20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    transition={{ duration: 0.5,delay: index * 0.1 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}