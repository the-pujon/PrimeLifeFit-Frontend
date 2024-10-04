import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card,CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
//import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { CreditCard,Truck } from 'lucide-react'

interface CheckoutItem {
    id: number
    name: string
    price: number
    quantity: number
}

const Checkout = () => {
    const [cartItems,setCartItems] = useState<CheckoutItem[]>([])
    const [totalPrice,setTotalPrice] = useState(0)
    const [paymentMethod,setPaymentMethod] = useState('cash')
    const navigate = useNavigate()
    //const { toast } = useToast()

    useEffect(() => {
        // Fetch cart items from your state management solution or API
        // For this example, we'll use dummy data
        const dummyCartItems = [
            { id: 1,name: 'Premium Dumbbell Set',price: 199.99,quantity: 1 },
            { id: 2,name: 'Yoga Mat',price: 29.99,quantity: 2 },
        ]
        setCartItems(dummyCartItems)
        setTotalPrice(dummyCartItems.reduce((sum,item) => sum + item.price * item.quantity,0))
    },[])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        if (paymentMethod === 'cash') {
            // Process cash on delivery order
            // Here you would typically send this data to your backend
            console.log('Processing cash on delivery order:',{ userData,cartItems })
            //toast({
            //    title: "Order Placed Successfully",
            //    description: "Your order will be delivered soon.",
            //})
            navigate('/success')
        } else if (paymentMethod === 'stripe') {
            // Redirect to Stripe payment
            // In a real application, you would create a Stripe session here
            console.log('Redirecting to Stripe payment')
            //toast({
            //    title: "Redirecting to Stripe",
            //    description: "You will be redirected to complete your payment.",
            //})
            // For this example, we'll just navigate to a success page
            navigate('/success')
        }
    }

    return (
        <div className="wrapper px-4 py-12 max-w-6xl">
            <motion.h1
                className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary"
                initial={{ opacity: 0,y: -20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Checkout
            </motion.h1>
            <div className="grid gap-8 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0,x: -20 }}
                    animate={{ opacity: 1,x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Details</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                                        <Input id="name" name="name" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                                        <Input id="email" name="email" type="email" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                                        <Input id="phone" name="phone" type="tel" required className="mt-1" />
                                    </div>
                                    <div>
                                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">Delivery Address</Label>
                                        <Input id="address" name="address" required className="mt-1" />
                                    </div>
                                </div>
                                <Separator className="my-8" />
                                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Method</h2>
                                <RadioGroup defaultValue="cash" onValueChange={setPaymentMethod} className="space-y-4">
                                    <div className="flex items-center space-x-3 bg-white border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="cash" id="cash" />
                                        <Label htmlFor="cash" className="flex items-center cursor-pointer">
                                            <Truck className="w-5 h-5 mr-2 text-primary" />
                                            Cash on Delivery
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-white border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <RadioGroupItem value="stripe" id="stripe" />
                                        <Label htmlFor="stripe" className="flex items-center cursor-pointer">
                                            <CreditCard className="w-5 h-5 mr-2 text-primary" />
                                            Pay with Stripe
                                        </Label>
                                    </div>
                                </RadioGroup>
                                <Button type="submit" className="w-full mt-8 text-lg font-semibold py-6">
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
                    <Card className="shadow-lg">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <span className="text-gray-600">{item.name} x {item.quantity}</span>
                                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator className="my-4" />
                                <div className="flex justify-between items-center text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default Checkout