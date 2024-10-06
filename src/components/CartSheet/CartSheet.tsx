import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus,Minus,Trash2 } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
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
import { useAppDispatch,useAppSelector } from '@/redux/hook'
import { CurrentCart,removeItem,updateItemQuantity } from '@/redux/features/cart/cartSlice'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CartSheet: React.FC<CartSheetProps> = ({ open,onOpenChange }) => {

  const cartItems = useAppSelector(CurrentCart);
  const dispatch = useAppDispatch();
  const [itemToDelete,setItemToDelete] = useState<string | null>(null)

  const updateQuantity = (id: string,newQuantity: number) => {
    dispatch(updateItemQuantity({ id,quantity: newQuantity }))
  }

  const removeCartItem = (id: string) => {
    dispatch(removeItem(id))
    setItemToDelete(null)
  }

  const totalPrice = cartItems.reduce((sum,item) => sum + item.price * item.quantity,0)
  const isOutOfStock = cartItems.some(item => item.quantity > item.stock)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-10/12 h-screen sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Your Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl font-semibold mb-4">Your cart is empty</p>
            <Button asChild>
              <Link to="/products" onClick={() => onOpenChange(false)}>
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea
              //className="flex-grow mt-6 mb-4"
              className="max-h-[75vh] h-full flex-grow mt-6 mb-4 p-4"
            >
              {cartItems.map(item => (
                <div key={item._id} className="flex items-center space-x-4 py-4">
                  <img src={item.photos[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item._id!,item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 min-w-[2ch] text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item._id!,item.quantity + 1)}
                        disabled={item.quantity === item.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setItemToDelete(item._id!)} className="text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
            <Separator className="my-4" />
            <SheetFooter>
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full rounded-none"
                  disabled={isOutOfStock}
                  asChild
                >
                  <Link to="/cart" onClick={() => !isOutOfStock && onOpenChange(false)}>
                    {isOutOfStock ? 'Some items are out of stock' : 'View Cart'}
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
      <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the item from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => itemToDelete && removeCartItem(itemToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}

export default CartSheet