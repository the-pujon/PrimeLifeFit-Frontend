import React from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ProductForm from './ProductForm'
import { Product,ProductFormData } from '@/types/Product'
import { motion,AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface UpdateProductDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: Product) => void
    product: Product | null
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({ isOpen,onClose,onSave,product }) => {
    const handleSave = async (updatedProduct: ProductFormData) => {
        try {
            const newPhotos = updatedProduct.photos.filter(photo => photo.file)
            const oldPhotos = updatedProduct.photos.filter(photo => !photo.file)

            const uploadPromises = newPhotos.map(photo => uploadImage(photo.file!))
            const uploadedUrls = await Promise.all(uploadPromises)

            const finalProduct: Product = {
                ...updatedProduct,
                photos: [...oldPhotos.map(photo => photo.preview),...uploadedUrls]
            }

            onSave(finalProduct)
            //toast.success('Product updated successfully')
            onClose()
        } catch (error) {
            console.error('Error updating product:',error)
            toast.error('Failed to update product')
        }
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('image',file)

        const response = await fetch('https://api.imgbb.com/1/upload?key=3771a5eec87b0ec98c5b62855eab4fae',{
            method: 'POST',
            body: formData,
        })

        const data = await response.json()
        return data.data.url
    }

    return (
        <AnimatePresence>
            {isOpen && product && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            exit={{ opacity: 0,y: -20 }}
                        >
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm
                                onSubmit={handleSave}
                                initialData={product}
                            />
                            <DialogFooter className="flex justify-end">
                                <div className="flex gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={onClose} variant="outline">Cancel</Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button type="submit" form="product-form">Update</Button>
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