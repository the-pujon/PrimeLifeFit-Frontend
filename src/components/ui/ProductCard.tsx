
import { Card,CardContent,CardHeader,CardTitle } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { ArrowRight,Eye,ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Product } from '@/types/Product'
import { useAppDispatch } from '@/redux/hook'
import { addItem } from '@/redux/features/cart/cartSlice'
import { toast } from 'sonner'

const ProductCard = ({ product }: { product: Product }) => {

    const dispatch = useAppDispatch();


    const handleAddToCart = (selectedProduct: Product) => {
        dispatch(addItem(selectedProduct));
        toast.success("Product added to cart");
    }

    return (
        <div>
            <Card className="group relative flex flex-col overflow-hidden rounded-none transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                        <img
                            src={product.photos[0]}
                            alt={product.name}
                            className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {product.stock === 0 && (
                            <Badge variant="destructive" className="absolute top-4 right-4 text-sm px-3 py-1 bg-red-500 text-white">
                                Out of Stock
                            </Badge>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <Button
                                    asChild
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Link to={`/products/${product._id}`}>
                                        <Eye className="w-6 h-6" />
                                        <span className="sr-only">View Details</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock <= 0}
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    <span className="sr-only">Add to Cart</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                    <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="default">{product.category}</Badge>
                        <Badge variant="outline">{product.brand ? product.brand : "N/A"}</Badge>
                    </div>
                    <CardTitle className="text-xl font-medium mb-2 transition-colors duration-300 group-hover:text-primary">{product.name}</CardTitle>
                    <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <Badge variant="outline" className="text-sm px-2 py-1">
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors duration-300"
                            asChild
                        >
                            <Link
                                //to={`/products/${product.id}`}
                                to="/product-details"
                            >
                                View Details
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCard