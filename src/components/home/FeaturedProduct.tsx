import ProductCard from '../ui/ProductCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useGetAllProductsQuery } from "@/redux/features/product/productApi"
import { Product } from "@/types/Product"
import { motion } from 'framer-motion' // Add this import
import { Skeleton } from '../ui/skeleton' // Add this import

const FeaturedProduct = () => {

    const { data,isLoading } = useGetAllProductsQuery(undefined)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
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
        <div className='wrapper px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8'>
                <div className='mb-4 sm:mb-0'>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2">Shop by Equipment Category</h2>
                    <p className="text-base sm:text-lg text-gray-600 font-serif">Explore our wide range of fitness gear</p>
                </div>
                <Button asChild className='mt-4 sm:mt-0'>
                    <Link to={'/'}>View All</Link>
                </Button>
            </div>
            <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {isLoading
                    ? Array(4).fill(0).map((_,index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Skeleton className="h-[200px] sm:h-[250px] lg:h-[28rem] w-full rounded-lg" />
                        </motion.div>
                    ))
                    : data?.data?.slice(0,4).map((product: Product) => (
                        <motion.div key={product._id} variants={itemVariants}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export default FeaturedProduct