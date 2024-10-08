import React,{ useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye,Plus,Edit,Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddProductDialog from "@/components/Dashboard/AddProductDialog";
import UpdateProductDialog from "@/components/Dashboard/UpdateProductDialog";
import { Product } from "@/types/Product";
import { motion,AnimatePresence } from "framer-motion";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    useGetAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} from "@/redux/features/product/productApi";
import { toast } from "sonner";
import Loading from "@/components/ui/Loading";

const ProductManagement: React.FC = () => {
    const {
        data: products,
        isLoading,
        isError,
    } = useGetAllProductsQuery(undefined);
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const [isAddDialogOpen,setIsAddDialogOpen] = useState(false);
    const [isUpdateDialogOpen,setIsUpdateDialogOpen] = useState(false);
    const [isDeleteDialogOpen,setIsDeleteDialogOpen] = useState(false);
    const [currentProduct,setCurrentProduct] = useState<Product | null>(null);
    const [productToDelete,setProductToDelete] = useState<string | null>(null);


    const navigate = useNavigate();

    const handleDeleteProduct = (id: string) => {
        setProductToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteProduct(productToDelete).unwrap();
                toast.success("Product deleted successfully");
                setIsDeleteDialogOpen(false);
                setProductToDelete(null);
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    const handleViewProductDetails = (productId: string) => {
        navigate(`/products/${productId}`);
    };

    const handleAddProduct = async (newProduct: Product) => {
        const toastId = toast.loading("Adding product...");
        try {
            await createProduct(newProduct).unwrap();
            toast.success("Product added successfully",{ id: toastId });
            setIsAddDialogOpen(false);
        } catch (error) {
            console.error("Error adding product:",error);
            toast.error("Failed to add product",{ id: toastId });
        }
    };

    const handleUpdateProduct = async (updatedProduct: Product) => {
        const toastId = toast.loading("Updating product...");
        try {
            await updateProduct({
                id: updatedProduct._id,
                data: updatedProduct,
            }).unwrap();
            toast.success("Product updated successfully",{ id: toastId });
            setIsUpdateDialogOpen(false);
            setCurrentProduct(null);
        } catch (error) {
            toast.error("Failed to update product",{ id: toastId });
        }
    };

    const handleOpenUpdateDialog = (product: Product) => {
        setCurrentProduct(product);
        setIsUpdateDialogOpen(true);
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 bg-gray-50 min-h-screen wrapper"
        >
            {isLoading && <Loading />}
            <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-3xl font-bold mb-6 text-gray-800"
            >
                Product Management
            </motion.h1>
            <div>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="mb-6 hover:scale-105 transition-transform duration-200"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
            </div>

            {isError ? (
                <div>Product Data not found</div>
            ) : products && products.data.length <= 0 ? (
                <div>Product Data not found</div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {products?.data.map((product: Product) => (
                                <motion.tr
                                    key={product._id}
                                    initial={{ opacity: 0,y: 20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    exit={{ opacity: 0,y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TableCell>
                                        {product.photos.length > 0 && (
                                            <img
                                                src={product.photos[0]}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <motion.div className="flex space-x-2">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleViewProductDetails(product._id as string)}
                                                >
                                                    <Eye className="w-4 h-4 mr-2" /> View
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleOpenUpdateDialog(product)}
                                                >
                                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => handleDeleteProduct(product._id as string)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            )}

            <AddProductDialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSave={handleAddProduct}
            />

            <UpdateProductDialog
                isOpen={isUpdateDialogOpen}
                onClose={() => {
                    setIsUpdateDialogOpen(false);
                    setCurrentProduct(null);
                }}
                onSave={handleUpdateProduct}
                product={currentProduct}
            />

            <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            product from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setProductToDelete(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
};

export default ProductManagement;
