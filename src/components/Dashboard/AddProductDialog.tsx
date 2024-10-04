import React,{ useState } from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Product } from '@/types/Product'
import ProductForm from './ProductForm'
import { motion,AnimatePresence } from 'framer-motion'

interface AddProductDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: Product) => void
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen,onClose,onSave }) => {
    const [newProduct,setNewProduct] = useState<Product>({
        id: String(Date.now()),
        name: '',
        price: 0,
        category: '',
        description: '',
        images: [],
        stock: 0,
    })

    const handleSave = () => {
        onSave(newProduct)
        setNewProduct({
            id: String(Date.now()),
            name: '',
            price: 0,
            category: '',
            description: '',
            images: [],
            stock: 0,
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            exit={{ opacity: 0,y: -20 }}
                        >
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm product={newProduct} setProduct={setNewProduct} />
                            <DialogFooter className="flex justify-end">
                                <div className="flex gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={onClose} variant="outline">Cancel</Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={handleSave}>Add</Button>
                                    </motion.div>
                                </div>
                            </DialogFooter>
                        </motion.div>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    )
}

export default AddProductDialog