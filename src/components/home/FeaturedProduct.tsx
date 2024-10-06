
import ProductCard from '../ui/ProductCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { useGetAllProductsQuery } from "@/redux/features/product/productApi"
import { Product } from "@/types/Product"
import Loading from '../ui/Loading'


const FeaturedProduct = () => {

    const { data,isLoading } = useGetAllProductsQuery(undefined)

    return (
        <div className='wrapper'>
            <div className='flex justify-between items-center'>
                <div>
                    <h2 className="text-3xl font-bold mb-2">Shop by Equipment Category</h2>
                    <p className="text-lg text-gray-600 mb-8 font-serif">Explore our wide range of fitness gear to find exactly what you need</p>
                </div>
                <Button asChild>
                    <Link to={'/'}>View All</Link>
                </Button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>

                {isLoading ? <Loading /> :
                    data?.data?.slice(0,4).map((product: Product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }</div>
        </div>
    )
}

export default FeaturedProduct