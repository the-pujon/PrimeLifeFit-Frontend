import React,{ useState,useCallback,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '@/redux/features/product/productApi';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from "@/components/ui/button";
import { Card,CardContent } from "@/components/ui/card";
import { ChevronLeft,ChevronRight,ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Loading from '@/components/ui/Loading';
import { useAppDispatch } from '@/redux/hook';
import { addItem,selectProductStock } from '@/redux/features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { CurrentCart } from '@/redux/features/cart/cartSlice';
import { RootState } from '@/redux/store';

const ProductDetails: React.FC = () => {
    const { id } = useParams();
    const { data,error,isLoading } = useGetSingleProductQuery(id);
    const dispatch = useAppDispatch();
    const cartItems = useSelector(CurrentCart);
    const productData = data?.data;

    const currentStock = useSelector((state: RootState) =>
        selectProductStock(state,id,productData?.stock ?? 0)
    );

    console.log(currentStock)

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: true });
    const [isZoomed,setIsZoomed] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
    },[emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select',onSelect);
        return () => {
            emblaApi.off('select',onSelect);
        };
    },[emblaApi,onSelect]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(),[emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(),[emblaApi]);

    const isMaxQuantityReached = () => {
        if (!productData) return false;
        const cartItem = cartItems.find(item => item._id === productData._id);
        return cartItem && cartItem.quantity >= productData.stock;
    };

    const handleAddToCart = () => {
        if (productData && !isMaxQuantityReached()) {
            dispatch(addItem(productData));
        }
    };

    if (error) return <div>Error loading product details</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="wrapper py-12"
        >
            {isLoading && <Loading />}
            <motion.div
                initial={{ opacity: 0,y: 20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ duration: 0.5,delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
                <motion.div
                    className="space-y-6"
                    initial={{ x: -50,opacity: 0 }}
                    animate={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5,delay: 0.4 }}
                >
                    <div className="relative rounded-none overflow-hidden shadow-2xl bg-white">
                        <div className="aspect-w-16 aspect-h-9 cursor-zoom-in" ref={emblaRef} onClick={() => setIsZoomed(!isZoomed)}>
                            <div className="flex">
                                {productData?.photos?.map((photo: string,index: number) => (
                                    <motion.div
                                        className="flex-[0_0_100%] min-w-0"
                                        key={index}
                                        whileHover={{ scale: isZoomed ? 2 : 1 }}
                                        transition={{ type: "tween" }}
                                    >
                                        <img src={photo} alt={`${productData?.name} - View ${index + 1}`} className="w-full h-full object-cover" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white transition-all duration-200 rounded-full shadow-lg"
                            onClick={scrollPrev}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white transition-all duration-200 rounded-full shadow-lg"
                            onClick={scrollNext}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    className="space-y-8"
                    initial={{ x: 50,opacity: 0 }}
                    animate={{ x: 0,opacity: 1 }}
                    transition={{ duration: 0.5,delay: 0.4 }}
                >
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold mb-2">{productData?.name}</h1>
                        <p className="text-lg text-gray-600">by <span className="font-semibold">{productData?.brand}</span></p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.8 }}
                    >
                        <Card className="bg-gray-50 rounded-none">
                            <CardContent className="p-6 space-y-4">
                                <p className="text-3xl font-bold text-green-600">${productData?.price?.toFixed(2)}</p>
                                <p className="text-lg">
                                    Availability:
                                    <span className={`font-semibold ${!productData || productData.stock <= 0 || isMaxQuantityReached() ? 'text-red-600' : 'text-green-600'}`}>
                                        {!productData || productData.stock <= 0 || isMaxQuantityReached() ? ' Out of Stock' : ' In Stock'}
                                    </span>
                                </p>
                                <Button
                                    className="w-full rounded-none outline-none"
                                    size="lg"
                                    onClick={handleAddToCart}
                                    disabled={!productData || productData.stock <= 0 || isMaxQuantityReached()}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-3">About this item</h2>
                        <p className="text-gray-700 leading-relaxed">{productData?.description}</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 20,opacity: 0 }}
                        animate={{ y: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 1.2 }}
                    >
                        <h2 className="text-2xl font-semibold mb-3">Product Details</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Category: {productData?.category}</li>
                            <li>Brand: {productData?.brand}</li>
                            <li>In Stock: {currentStock} units</li>
                        </ul>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ProductDetails;