import React,{ useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table"
import { ShieldAlert,ShieldCheck } from "lucide-react"
import { motion,AnimatePresence } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface Customer {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    totalBuy: number;
}

const demoCustomers: Customer[] = [
    { id: "1",name: "John Doe",email: "john@example.com",role: "user",totalBuy: 5 },
    { id: "2",name: "Jane Smith",email: "jane@example.com",role: "admin",totalBuy: 10 },
    { id: "3",name: "Alice Johnson",email: "alice@example.com",role: "user",totalBuy: 3 },
    // Add more mock customers as needed
]

const CustomerManagement: React.FC = () => {
    const [customers,setCustomers] = useState<Customer[]>(demoCustomers)
    const [isChangeRoleDialogOpen,setIsChangeRoleDialogOpen] = useState(false)
    const [customerToChangeRole,setCustomerToChangeRole] = useState<Customer | null>(null)

    const handleChangeRole = (customer: Customer) => {
        setCustomerToChangeRole(customer)
        setIsChangeRoleDialogOpen(true)
    }

    const confirmChangeRole = () => {
        if (customerToChangeRole) {
            setCustomers(prev => prev.map(c =>
                c.id === customerToChangeRole.id
                    ? { ...c,role: c.role === 'user' ? 'admin' : 'user' }
                    : c
            ))
            setIsChangeRoleDialogOpen(false)
            setCustomerToChangeRole(null)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 bg-gray-50 min-h-screen wrapper"
        >
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold mb-6 text-gray-800"
            >
                Customer Management
            </motion.h1>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Total Purchases</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence>
                        {customers.map((customer) => (
                            <motion.tr
                                key={customer.id}
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                exit={{ opacity: 0,y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>
                                    <Badge variant={customer.role === "admin" ? "default" : "secondary"}>
                                        {customer.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>{customer.totalBuy}</TableCell>
                                <TableCell>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant={customer.role === 'admin' ? "secondary" : "default"}
                                                    onClick={() => handleChangeRole(customer)}
                                                    disabled={customer.role === 'admin'}
                                                    className="w-full sm:w-auto"
                                                >
                                                    {customer.role === 'admin' ? (
                                                        <>
                                                            <ShieldCheck className="w-4 h-4 mr-2" />
                                                            Admin
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldAlert className="w-4 h-4 mr-2" />
                                                            Make Admin
                                                        </>
                                                    )}
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {customer.role === 'admin'
                                                    ? "This user is already an admin"
                                                    : "Change this user's role to admin"}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>

            <AlertDialog open={isChangeRoleDialogOpen} onOpenChange={setIsChangeRoleDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Change User Role to Admin</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the role of {customerToChangeRole?.name} to admin? This will give them full access to the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setCustomerToChangeRole(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmChangeRole}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    )
}

export default CustomerManagement