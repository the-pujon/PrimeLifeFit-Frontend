import React from 'react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Product,ProductFormData } from '@/types/Product'
import ProductForm from './ProductForm'
import { motion,AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface AddProductDialogProps {
    isOpen: boolean
    onClose: () => void
    onSave: (product: Product) => void
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen,onClose,onSave }) => {
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

    const handleSave = async (productData: ProductFormData) => {
        try {
            const uploadPromises = productData.photos
                .filter(photo => photo.file)
                .map(photo => uploadImage(photo.file!))
            const uploadedUrls = await Promise.all(uploadPromises)

            const productWithUrls: Product = {
                ...productData,
                photos: uploadedUrls,
            }

            onSave(productWithUrls)
            onClose()
        } catch (error) {
            console.error('Error uploading images:',error)
            toast.error('Failed to upload images')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={onClose}>
                    <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
                        <motion.div
                            initial={{ opacity: 0,y: 20 }}
                            animate={{ opacity: 1,y: 0 }}
                            exit={{ opacity: 0,y: -20 }}
                        >
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>
                            <ProductForm onSubmit={handleSave} />
                            <DialogFooter className="flex justify-end">
                                <div className="flex gap-3">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button onClick={onClose} variant="outline">Cancel</Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button type="submit" form="product-form">Add</Button>
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