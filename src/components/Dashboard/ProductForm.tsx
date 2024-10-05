import React,{ useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useForm,Controller } from "react-hook-form"
import { Product } from '@/types/Product'
import { categories } from '@/utils/Categories'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from "@/components/ui/select"

interface ProductFormProps {
    onSubmit: (data: Product) => void
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
    const { control,handleSubmit,setValue,watch } = useForm<Product>({
        defaultValues: {
            name: '',
            price: 0,
            category: '',
            brand: '',
            description: '',
            photos: [],
            stock: 0,
        }
    })
    const fileInputRef = useRef<HTMLInputElement>(null)
    const photos = watch('photos')

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const newPhotos = Array.from(files).map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))
            setValue('photos',[...photos,...newPhotos])
        }
    }

    const handleRemoveImage = (index: number) => {
        setValue('photos',photos.filter((_,i) => i !== index))
    }

    const onSubmitForm = (data: Product) => {
        // Convert price and stock to numbers
        const formattedData = {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock)
        }
        onSubmit(formattedData)
    }

    return (
        <form id="product-form" onSubmit={handleSubmit(onSubmitForm)} className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="sm:text-right">Name</Label>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} className="col-span-1 sm:col-span-3" />}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="sm:text-right">Price</Label>
                <Controller
                    name="price"
                    control={control}
                    render={({ field }) => <Input {...field} type="number" step="0.01" className="col-span-1 sm:col-span-3" />}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="sm:text-right">Category</Label>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="col-span-1 sm:col-span-3">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.title}>
                                        {category.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="sm:text-right">brand</Label>
                <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => <Input {...field} className="col-span-1 sm:col-span-3" />}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="sm:text-right">Description</Label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <Textarea {...field} className="col-span-1 sm:col-span-3" />}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="sm:text-right">Stock</Label>
                <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => <Input {...field} type="number" className="col-span-1 sm:col-span-3" />}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label className="sm:text-right">Images</Label>
                <div className="col-span-1 sm:col-span-3">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <Button type="button" onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto">
                        Select Images
                    </Button>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {photos.map((photo,index) => (
                            <div key={index} className="relative">
                                <img src={photo.preview} alt={`Preview ${index}`} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded" />
                                <button
                                    type="button"
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
        </form>
    )
}

export default ProductForm