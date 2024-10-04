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

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  stock: number
  image: string
}

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CartSheet: React.FC<CartSheetProps> = ({ open,onOpenChange }) => {
  const [cartItems,setCartItems] = useState<CartItem[]>([
    { id: 1,name: 'Premium Dumbbell Set',price: 199.99,quantity: 1,stock: 5,image: '/images/dumbbell-set.jpg' },
    { id: 2,name: 'Yoga Mat',price: 29.99,quantity: 2,stock: 3,image: '/images/yoga-mat.jpg' },
    { id: 3,name: 'Premium Dumbbell Set',price: 199.99,quantity: 1,stock: 5,image: '/images/dumbbell-set.jpg' },
    //{ id: 4,name: 'Yoga Mat',price: 29.99,quantity: 2,stock: 3,image: '/images/yoga-mat.jpg' },
    //{ id: 5,name: 'Premium Dumbbell Set',price: 199.99,quantity: 1,stock: 5,image: '/images/dumbbell-set.jpg' },
    //{ id: 6,name: 'Yoga Mat',price: 29.99,quantity: 2,stock: 3,image: '/images/yoga-mat.jpg' },
    //{ id: 7,name: 'Premium Dumbbell Set',price: 199.99,quantity: 1,stock: 5,image: '/images/dumbbell-set.jpg' },
    //{ id: 8,name: 'Yoga Mat',price: 29.99,quantity: 2,stock: 3,image: '/images/yoga-mat.jpg' },
  ])
  const [itemToDelete,setItemToDelete] = useState<number | null>(null)

  const updateQuantity = (id: number,newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item,quantity: Math.min(newQuantity,item.stock) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
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
                <div key={item.id} className="flex items-center space-x-4 py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id,item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 min-w-[2ch] text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id,item.quantity + 1)}
                        disabled={item.quantity === item.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setItemToDelete(item.id)} className="text-red-500">
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
            <AlertDialogAction onClick={() => itemToDelete && removeItem(itemToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}

export default CartSheet