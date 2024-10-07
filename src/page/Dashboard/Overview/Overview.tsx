import React from 'react'
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Bar,BarChart,ResponsiveContainer,XAxis,YAxis,Tooltip,TooltipProps } from "recharts"
import { motion } from 'framer-motion'
import { ShoppingBag,Users,Package,DollarSign } from 'lucide-react'
import { useGetAllOrdersQuery } from '@/redux/features/order/orderApi'
import { useGetAllProductsQuery } from '@/redux/features/product/productApi'
import { useGetAllUsersQuery } from '@/redux/features/auth/authApi'
import Loading from '@/components/ui/Loading'
import { Order } from '@/types/Orders'

interface ChartData {
    name: string;
    total: number;
    orders: number;
}

const Overview: React.FC = () => {
    const { data: orders,isLoading: ordersLoading } = useGetAllOrdersQuery(undefined)
    const { data: products,isLoading: productsLoading } = useGetAllProductsQuery('')
    const { data: users,isLoading: usersLoading } = useGetAllUsersQuery(undefined)

    const isLoading = ordersLoading || productsLoading || usersLoading

    if (isLoading) {
        return <Loading />
    }

    const totalRevenue = orders?.data.reduce((sum: number,order: Order) => sum + order.totalAmount,0) || 0
    const totalOrders = orders?.data.length || 0
    const totalCustomers = users?.data.length || 0
    const totalProducts = products?.data.length || 0

    const monthlySales = orders?.data.reduce((acc: Record<string,number>,order: Order) => {
        const date = new Date(order.createdAt)
        const month = date.toLocaleString('default',{ month: 'short' })
        acc[month] = (acc[month] || 0) + order.totalAmount
        return acc
    },{})

    const chartData: ChartData[] = Object.entries(monthlySales || {}).map(([name,total]) => ({
        name,
        total: total as number,
        orders: orders?.data.filter((order: Order) => {
            const orderMonth = new Date(order.createdAt).toLocaleString('default',{ month: 'short' })
            return orderMonth === name
        }).length || 0
    }))

    const CustomTooltip: React.FC<TooltipProps<number,string>> = ({ active,payload,label }: TooltipProps<number,string>) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as ChartData;
            return (
                <div className="custom-tooltip bg-white p-4 border border-gray-200 rounded shadow">
                    <p className="label font-bold">{`${label}`}</p>
                    <p className="total text-blue-600">{`Total: $${data.total.toFixed(2)}`}</p>
                    <p className="orders text-green-600">{`Orders: ${data.orders}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 bg-gray-50 min-h-screen"
        >
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold mb-6 text-gray-800"
            >
                Dashboard Overview
            </motion.h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Orders
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">
                            +180 since last hour
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalCustomers}</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Products
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">
                            +7% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Sales</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="total"
                                    fill="#111827"
                                    radius={[4,4,0,0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {orders?.data.slice(0,3).map((order: Order) => (
                                <div key={order._id} className="flex items-center">
                                    <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            New order #{order._id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}

export default Overview