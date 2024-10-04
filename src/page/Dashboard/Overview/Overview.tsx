import React from 'react'
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Bar,BarChart,ResponsiveContainer,XAxis,YAxis } from "recharts"
import { motion } from 'framer-motion'
import { ShoppingBag,Users,Package,DollarSign } from 'lucide-react'

// Mock data for charts
const monthlySales = [
    { name: "Jan",total: 1200 },
    { name: "Feb",total: 2100 },
    { name: "Mar",total: 1800 },
    { name: "Apr",total: 2400 },
    { name: "May",total: 2800 },
    { name: "Jun",total: 3200 },
]

const Overview: React.FC = () => {
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
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Orders
                        </CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
                        <p className="text-xs text-muted-foreground">
                            +201 since last hour
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            New Customers
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">
                            +180.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Inventory Stock
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
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
                            <BarChart data={monthlySales}>
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
                            <div className="flex items-center">
                                <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        New order #1234
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        5 minutes ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        New customer registered
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        15 minutes ago
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Product "XYZ" is low in stock
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        1 hour ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}

export default Overview