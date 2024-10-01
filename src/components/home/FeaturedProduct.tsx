
//import { toast } from 'sonner'
import Image from "@/assets/hero1.jpg"
import ProductCard from '../ui/ProductCard'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const featuredProducts = [
    {
        id: 1,
        name: "Premium Dumbbell Set",
        price: 299.99,
        image: Image,
        inStock: true
    },
    {
        id: 2,
        name: "Adjustable Bench",
        price: 199.99,
        image: Image,
        inStock: true
    },
    {
        id: 3,
        name: "Olympic Barbell",
        price: 249.99,
        image: Image,
        inStock: false
    },
    {
        id: 4,
        name: "Olympic Barbell",
        price: 249.99,
        image: Image,
        inStock: false
    }
]

const FeaturedProduct = () => {

    //const [products] = useState(featuredProducts)

    //const handleAddToCart = (productId: number) => {
    //    const product = products.find(p => p.id === productId)
    //    if (product) {
    //        //toast({
    //        //    //title: "Added to Cart",
    //        //    //description: `${product.name} has been added to your cart.`,
    //        //})
    //    }
    //}
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
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>{
                featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }</div>
        </div>
    )
}

export default FeaturedProduct