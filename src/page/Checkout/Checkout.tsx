import React,{ useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card,CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { CreditCard,Truck,ShoppingBag } from 'lucide-react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useAppSelector } from '@/redux/hook'
import { CurrentCart } from '@/redux/features/cart/cartSlice'
import { selectCurrentUser } from '@/redux/features/auth/authSlice'
import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle } from "@/components/ui/alert-dialog"

interface FormData {
    name: string
    email: string
    phone: string
    address: string
    city: string
}

const Checkout = () => {
    const { register,handleSubmit,setValue } = useForm<FormData>()
    const cartItems = useAppSelector(CurrentCart)
    const [totalPrice,setTotalPrice] = React.useState(0)
    const [paymentMethod,setPaymentMethod] = React.useState<'COD' | 'Stripe'>('COD')
    const navigate = useNavigate()
    const shippingCost = 120;
    const currentUser = useAppSelector(selectCurrentUser)
    const [showAlert,setShowAlert] = useState(false);

    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum,item) => sum + item.price * item.quantity,0))
    },[cartItems])

    useEffect(() => {
        if (currentUser?.email) {
            setValue('email',currentUser.email)
        }
    },[currentUser,setValue])

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            setShowAlert(true);
            e.returnValue = '';
        };

        window.addEventListener('beforeunload',handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload',handleBeforeUnload);
        };
    },[]);

    const onSubmit = async (data: FormData) => {
        const orderData = {
            totalAmount: totalPrice + shippingCost,
            paymentMethod,
            city: data.city,
            address: data.address,
            phone: data.phone,
            email: data.email,
            products: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        if (paymentMethod === 'Stripe') {
            toast.message("Stripe Payment Method Not Supported",{
                description: "Please select Cash on Delivery.",
            });
            return;
        }

        try {
            navigate('/success',{ state: { orderData } });
        } catch (error) {
            console.error("Error placing order:",error);
            toast.message("Error",{
                description: "There was an issue placing your order. Please try again.",
            });
        }
    }

    return (
        <>
            <div className="wrapper px-4 py-12 max-w-6xl">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary"
                    initial={{ opacity: 0,y: -20 }}
                    animate={{ opacity: 1,y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Complete Your Order
                </motion.h1>
                <div className="grid gap-8 lg:grid-cols-3">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0,x: -20 }}
                        animate={{ opacity: 1,x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-lg rounded-lg">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                                            <ShoppingBag className="w-6 h-6 mr-2 text-primary" />
                                            Your Details
                                        </h2>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div>
                                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                                <Input id="name" {...register('name',{ required: true })} className="mt-1 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...register('email')}
                                                    defaultValue={currentUser?.email || ''}
                                                    readOnly
                                                    className="mt-1 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                                                <Input id="phone" type="tel" {...register('phone',{ required: true })} className="mt-1 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                                            </div>
                                            <div>
                                                <Label htmlFor="address" className="text-sm font-medium text-gray-700">Delivery Address</Label>
                                                <Input id="address" {...register('address',{ required: true })} className="mt-1 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                                            </div>
                                            <div>
                                                <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                                                <Input id="city" {...register('city',{ required: true })} className="mt-1 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary" />
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-8" />
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                                            <CreditCard className="w-6 h-6 mr-2 text-primary" />
                                            Payment Method
                                        </h2>
                                        <RadioGroup defaultValue="COD" onValueChange={(value) => setPaymentMethod(value as "COD" | "Stripe")} className="space-y-4">
                                            <div className="flex items-center space-x-3 bg-white border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                                                <RadioGroupItem value="COD" id="COD" />
                                                <Label htmlFor="COD" className="flex items-center cursor-pointer">
                                                    <Truck className="w-5 h-5 mr-2 text-primary" />
                                                    Cash on Delivery
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-3 bg-white border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                                                <RadioGroupItem value="Stripe" id="Stripe" />
                                                <Label htmlFor="Stripe" className="flex items-center cursor-pointer">
                                                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                                                    Pay with Stripe
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <Button type="submit" className="w-full mt-8 text-lg font-semibold py-6 bg-primary hover:bg-primary/90 transition-colors rounded-lg">
                                        Place Order
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0,x: 20 }}
                        animate={{ opacity: 1,x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-lg rounded-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
                                    <ShoppingBag className="w-6 h-6 mr-2 text-purple-600" />
                                    Order Summary
                                </h2>
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item._id} className="flex justify-between items-center">
                                            <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center text-base sm:text-lg">
                                        <span className="text-gray-600">Shipping:</span>
                                        <span className="font-medium">${shippingCost.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Total:</span>
                                        <span className="text-2xl text-primary">${(totalPrice + shippingCost).toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
                        <AlertDialogDescription>
                            If you refresh or leave this page, all entered data will be lost.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => window.location.reload()}>Refresh</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Checkout