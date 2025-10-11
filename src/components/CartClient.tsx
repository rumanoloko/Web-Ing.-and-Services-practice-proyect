'use client';
import ShoppingCartProduct from '@/components/ShoppingCartProduct';
import { useState } from 'react';

export default function CartClient({ initialCartItems }) {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateItemQuantity = (productId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === productId ? { ...item, qty: quantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.product.price,
    0
  );

  return (
    <div className="flex flex-col">
      <h3 className="pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8">
        My Shopping Cart
      </h3>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <span className="text-sm text-gray-400">The cart is empty</span>
        </div>
      ) : (
        <div className="divide-y divide-dashed divide-gray-400">
          <div className="ml-auto flex flex-col items-end gap-2 py-3">
            <p className="text-2xl font-semibold text-gray-900">Total Price</p>
            <p className="text-2xl font-medium text-green-500">{totalPrice} €</p>
          </div>
          {cartItems.map((cartItem) => (
            <div key={cartItem.product._id.toString()} className="py-3">
              <ShoppingCartProduct
                product={cartItem.product}
                qty={cartItem.qty}
                onQuantityChange={(newQty) =>
                  updateItemQuantity(cartItem.product._id.toString(), newQty)
                }
              />
            </div>
          ))}
          <div className="flex justify-center py-6">
            <button className="px-6 py-3 bg-blue-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
              Check out
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
