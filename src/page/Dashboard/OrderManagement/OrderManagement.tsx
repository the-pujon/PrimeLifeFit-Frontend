import React,{ useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { Eye,X,ExternalLink,Package,CreditCard,MapPin,Phone,Mail,Calendar } from "lucide-react"
import { Order,OrderProduct } from '@/types/Orders'
import { motion,AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useGetAllOrdersQuery,useUpdateOrderMutation } from '@/redux/features/order/orderApi'
import { format } from 'date-fns'
import { toast } from 'sonner'

const OrderManagement: React.FC = () => {
    const { data: orders,isLoading,isError } = useGetAllOrdersQuery(undefined)
    const [updateOrder] = useUpdateOrderMutation()
    const [selectedOrder,setSelectedOrder] = useState<Order | null>(null)
    const navigate = useNavigate()

    console.log(orders)

    const handleViewOrderDetails = (order: Order) => {
        setSelectedOrder(order)
    }

    const handleUpdateStatus = async (orderId: string,newStatus: Order['status']) => {
        try {
            await updateOrder({ id: orderId,data: { status: newStatus } }).unwrap()
            if (selectedOrder && selectedOrder._id === orderId) {
                setSelectedOrder({ ...selectedOrder,status: newStatus })
            }
            toast.success('Order status updated successfully')
        } catch (error) {
            console.error('Failed to update order status:',error)
        }
    }

    const handleViewProductDetails = (productId: string) => {
        navigate(`/products/${productId}`)
    }

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800'
            case 'Completed': return 'bg-green-100 text-green-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return format(date,'PPP p')
    }

    return (
        <div className="h-screen flex flex-col lg:flex-row">
            <div className="lg:w-3/5 xl:w-2/3 bg-gray-50 overflow-hidden">
                <div className="p-4 h-full flex flex-col">
                    <motion.h1
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-2xl font-bold mb-4 text-gray-800"
                    >
                        Order Management
                    </motion.h1>

                    {isLoading && <p>Loading orders...</p>}
                    {isError && <p>Error loading orders. Please try again.</p>}

                    {orders && (
                        <div className="overflow-x-auto flex-grow">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Order ID</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead className="hidden sm:table-cell">Payment</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <AnimatePresence>
                                        {orders?.data?.map((order: Order) => (
                                            <motion.tr
                                                key={order._id}
                                                initial={{ opacity: 0,y: 20 }}
                                                animate={{ opacity: 1,y: 0 }}
                                                exit={{ opacity: 0,y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="hover:bg-gray-100"
                                            >
                                                <TableCell className="font-medium">{order._id}</TableCell>
                                                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                                <TableCell className="hidden sm:table-cell">{order.paymentMethod}</TableCell>
                                                <TableCell>
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm" onClick={() => handleViewOrderDetails(order)}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        <span className="hidden sm:inline">View</span>
                                                    </Button>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>

            <div className={`lg:w-2/5 xl:w-1/3 bg-white overflow-y-auto
                ${selectedOrder ? 'fixed top-20 inset-0 lg:static lg:top-20 lg:h-full' : 'hidden lg:block lg:sticky lg:top-0 lg:h-screen'}`}>
                {selectedOrder ? (
                    <div className="p-4 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Order Details</h2>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Order Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4 text-sm">
                                    <div className="flex items-center">
                                        <Package className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Order ID:</span>
                                        <span className="ml-2">{selectedOrder._id}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Created At:</span>
                                        <span className="ml-2">{formatDate(selectedOrder.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Updated At:</span>
                                        <span className="ml-2">{formatDate(selectedOrder.updatedAt)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Total:</span>
                                        <span className="ml-2">${selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Payment:</span>
                                        <span className="ml-2">{selectedOrder.paymentMethod}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Status:</span>
                                        <Select
                                            value={selectedOrder.status}
                                            onValueChange={(value: Order['status']) => handleUpdateStatus(selectedOrder._id,value)}
                                        >
                                            <SelectTrigger className="w-[120px] ml-2">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">Pending</SelectItem>
                                                <SelectItem value="Completed">Completed</SelectItem>
                                                <SelectItem value="Cancelled">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-4 text-sm">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">City:</span>
                                        <span className="ml-2">{selectedOrder.city}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Address:</span>
                                        <span className="ml-2 truncate">{selectedOrder.address}, {selectedOrder.city}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Phone:</span>
                                        <span className="ml-2">{selectedOrder.phone}</span>
                                    </div>
                                    <div className="flex items-center col-span-full">
                                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                                        <span className="font-medium">Email:</span>
                                        <span className="ml-2 truncate">{selectedOrder.email}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <h3 className="text-lg font-semibold mt-6 mb-4">Products</h3>
                        <div className="space-y-4">
                            {selectedOrder.products.map((product: OrderProduct) => (
                                <Card key={product.product._id}>
                                    <CardContent className="p-4">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                            {product.product.photos && product.product.photos.length > 0 && (
                                                <img src={product.product.photos[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                            )}
                                            <div className="flex-grow">
                                                <h4 className="font-semibold text-base">{product.name}</h4>
                                                <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleViewProductDetails(product.product._id as string)}
                                                className="mt-2 sm:mt-0"
                                            >
                                                <ExternalLink className="w-4 h-4 mr-2" /> Details
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Package className="w-12 h-12 mb-4" />
                        <p className="text-lg font-medium">Select an order to view details</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderManagement