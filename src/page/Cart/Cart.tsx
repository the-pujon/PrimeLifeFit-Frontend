import React,{ useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Plus,Minus,Trash2,ShoppingCart,Info } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card,CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useAppDispatch,useAppSelector } from '@/redux/hook'
import { CurrentCart,removeItem,updateItemQuantity } from '@/redux/features/cart/cartSlice'

const Cart = () => {
    const [itemToDelete,setItemToDelete] = useState<string | null>(null)
    const [totalPrice,setTotalPrice] = useState(0)
    const [isOutOfStock,setIsOutOfStock] = useState(false)
    const cartItems = useAppSelector(CurrentCart);
    const dispatch = useAppDispatch();
    const shippingCost = 120;

    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum,item) => sum + item.price * item.quantity,0))
        setIsOutOfStock(cartItems.some(item => item.quantity > item.stock))
    },[cartItems])

    const updateQuantity = (id: string,newQuantity: number) => {
        dispatch(updateItemQuantity({ id,quantity: newQuantity }))
    }

    const removeCartItem = (id: string) => {
        dispatch(removeItem(id))
        setItemToDelete(null)
    }

    return (
        <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
            <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-primary"
                initial={{ opacity: 0,y: -20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Your Cart
            </motion.h1>
            {cartItems.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0,scale: 0.9 }}
                    animate={{ opacity: 1,scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="text-center p-8 sm:p-12 shadow-lg">
                        <ShoppingCart className="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-gray-400 mb-4 sm:mb-6" />
                        <p className="text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-600">Your cart is empty</p>
                        <Button asChild size="lg" className="font-semibold">
                            <Link to="/products">Continue Shopping</Link>
                        </Button>
                    </Card>
                </motion.div>
            ) : (
                <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                        {cartItems.map((item,index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ duration: 0.3,delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-none">
                                    <CardContent className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                            <img src={item.photos[0]} alt={item.name} className="w-full sm:w-32 md:w-48 h-32 sm:h-32 md:h-48 object-cover rounded-none shadow-md" />
                                            <div className="flex-grow space-y-2 sm:space-y-4">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                                    <h3 className="font-semibold text-xl sm:text-2xl text-gray-800">{item.name}</h3>
                                                    <Badge variant="secondary" className="text-base sm:text-lg px-2 py-1 sm:px-3 sm:py-1 mt-2 sm:mt-0 w-fit">
                                                        ${item.price.toFixed(2)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                                    <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 w-fit">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item._id!,item.quantity - 1)}
                                                            disabled={item.quantity === 1}
                                                            className="rounded-full h-8 w-8"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="font-medium text-lg w-8 text-center">{item.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item._id!,item.quantity + 1)}
                                                            disabled={item.quantity === item.stock}
                                                            className="rounded-full h-8 w-8"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="space-x-2 flex sm:flex-none justify-between sm:justify-start">
                                                        <Button variant="outline" size="sm" asChild className="font-medium rounded-none flex-grow sm:flex-grow-0">
                                                            <Link to={`/products/${item._id!}`}>
                                                                <Info className="h-4 w-4 mr-2" />
                                                                Details
                                                            </Link>
                                                        </Button>
                                                        <Button variant="destructive" size="sm" onClick={() => setItemToDelete(item._id!)} className="font-medium rounded-none flex-grow sm:flex-grow-0">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <div className="lg:relative">
                        <motion.div
                            initial={{ opacity: 0,x: 20 }}
                            animate={{ opacity: 1,x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="sticky top-20"
                        >
                            <Card className="shadow-lg rounded-none">
                                <CardContent className="p-6 sm:p-8">
                                    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-gray-800">Order Summary</h2>
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="flex justify-between items-center text-base sm:text-lg">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-base sm:text-lg">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span className="font-medium">${shippingCost.toFixed(2)}</span>
                                        </div>
                                        <Separator className="my-3 sm:my-4" />
                                        <div className="flex justify-between items-center text-xl sm:text-2xl font-bold text-gray-800">
                                            <span>Total:</span>
                                            <span>${(totalPrice + shippingCost).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="w-full mt-6 sm:mt-8 text-base sm:text-lg font-semibold py-4 sm:py-6 rounded-none"
                                        size="lg"
                                        disabled={isOutOfStock}
                                        asChild
                                    >
                                        <Link to="/checkout">
                                            {isOutOfStock ? 'Some items are out of stock' : 'Proceed to Checkout'}
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            )}
            <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove item from cart</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove this item from your cart?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => itemToDelete && removeCartItem(itemToDelete)}>
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Cart