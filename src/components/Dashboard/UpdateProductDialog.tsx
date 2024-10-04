import React,{ useState,useEffect } from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ProductForm from './ProductForm'
import { Product } from '@/types/Product'
import { motion,AnimatePresence } from 'framer-motion'

interface UpdateProductDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: Product) => void
    product: Product | null
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({ isOpen,onClose,onSave,product }) => {
    const [editedProduct,setEditedProduct] = useState<Product | null>(null)

    useEffect(() => {
        if (product) {
            setEditedProduct({ ...product })
        }
    },[product])

    if (!editedProduct) return null

    const handleSave = () => {
        if (editedProduct) {
            onSave(editedProduct)
        }
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && editedProduct && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            exit={{ opacity: 0,y: -20 }}
                        >
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm
                                product={editedProduct}
                                setProduct={(updatedProduct) => setEditedProduct(updatedProduct as Product)}
                            />
                            <DialogFooter className="flex justify-end">
                                <div className="flex gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={onClose} variant="outline">Cancel</Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={handleSave}>Update</Button>
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

export default UpdateProductDialog