import React,{ useEffect,useState } from 'react'
import { useLocation,useNavigate,Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useCreateOrderMutation } from '@/redux/features/order/orderApi'
import { Button } from "@/components/ui/button"
import { useAppDispatch } from '@/redux/hook'
import { clearCart } from '@/redux/features/cart/cartSlice'

const Success = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [createOrder] = useCreateOrderMutation()
    const [isProcessing,setIsProcessing] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const createOrderAndRedirect = async () => {
            if (location.state?.orderData) {
                try {
                    const res = await createOrder(location.state.orderData)
                    console.log('Order response:',res)
                    dispatch(clearCart());
                    toast.message("Order Placed Successfully",{
                        description: "Your order will be delivered soon.",
                    })
                    // Redirect to product page after a short delay
                    setTimeout(() => {
                        navigate('/products')
                    },3000)
                } catch (error) {
                    console.error("Error creating order:",error)
                    toast.message("Error",{
                        description: "There was an issue creating your order. Please try again.",
                    })
                    setIsProcessing(false)
                }
            } else {
                // No order data, probably accessed directly
                setIsProcessing(false)
            }
        }

        createOrderAndRedirect()
    },[location.state,createOrder,navigate])

    if (isProcessing) {
        return (
            <div className="wrapper px-4 py-12 max-w-6xl text-center">
                <h1 className="text-4xl font-bold mb-6">Processing Your Order</h1>
                <p className="text-xl mb-4">Please wait while we confirm your order...</p>
            </div>
        )
    }

    return (
        <div className="wrapper px-4 py-12 max-w-6xl text-center">
            <h1 className="text-4xl font-bold mb-6">Order Status</h1>
            {location.state?.orderData ? (
                <>
                    <p className="text-xl mb-4">Thank you for your purchase!</p>
                    <p>You will be redirected to the product page shortly...</p>
                </>
            ) : (
                <>
                    <p className="text-xl mb-4">No order information found.</p>
                    <p className="mb-6">It seems you've accessed this page directly without placing an order.</p>
                    <Button asChild>
                        <Link to="/products">Browse Products</Link>
                    </Button>
                </>
            )}
        </div>
    )
}

export default Success