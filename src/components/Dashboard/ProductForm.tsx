import React,{ useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Product } from '@/types/Product'

interface ProductFormProps {
    product: Product
    setProduct: React.Dispatch<React.SetStateAction<Product>>
}

const ProductForm: React.FC<ProductFormProps> = ({ product,setProduct }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file))
            setProduct(prev => ({
                ...prev,
                images: [...prev.images,...newImages]
            }))
        }
    }

    const handleRemoveImage = (index: number) => {
        setProduct(prev => ({
            ...prev,
            images: prev.images.filter((_,i) => i !== index)
        }))
    }

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="sm:text-right">Name</Label>
                <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => setProduct(prev => ({ ...prev,name: e.target.value }))}
                    className="col-span-1 sm:col-span-3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="sm:text-right">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct(prev => ({ ...prev,price: Number(e.target.value) }))}
                    className="col-span-1 sm:col-span-3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="sm:text-right">Category</Label>
                <Input
                    id="category"
                    value={product.category}
                    onChange={(e) => setProduct(prev => ({ ...prev,category: e.target.value }))}
                    className="col-span-1 sm:col-span-3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="sm:text-right">Description</Label>
                <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => setProduct(prev => ({ ...prev,description: e.target.value }))}
                    className="col-span-1 sm:col-span-3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="sm:text-right">Stock</Label>
                <Input
                    id="stock"
                    type="number"
                    value={product.stock}
                    onChange={(e) => setProduct(prev => ({ ...prev,stock: Number(e.target.value) }))}
                    className="col-span-1 sm:col-span-3"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="sm:text-right">Images</Label>
                <div className="col-span-1 sm:col-span-3">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button type="button" onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto">
                        Upload Images
                    </Button>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {product.images.map((image,index) => (
                            <div key={index} className="relative">
                                <img src={image} alt={`Preview ${index}`} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded" />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductForm