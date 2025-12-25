'use client';
import ShoppingCartProduct from '@/components/ShoppingCartProduct';
import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/models/Product';
import { Types } from 'mongoose';
import { useRouter } from 'next/navigation';

interface CartItemInterface {
  product: Product & { _id: Types.ObjectId | string };
  qty: number;
}

export default function CartClient({ userId }: { userId: string }) {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCartCall = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/cart`);
        const {cartItems} = res.ok ? await res.json() : [];
        if(Array.isArray(cartItems) && cartItems.length > 0) {
          setCartItems(cartItems);
        }else{
          setCartItems([]);
        }
      } catch {
        console.error('Error while fetching cart\'s cart info');
        setCartItems([]);
      } finally {
        setLoading(false);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    };
    getCartCall();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  const updateItemQuantity =
      ({ productId, quantity, }: { productId: string; quantity: number; }) =>
      {
        setCartItems(prev =>
            prev.map(item =>
                item.product._id === productId ? { ...item, qty: quantity } : item
            )
        );
      };

  const removeItemFromCart = async (productId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        console.log('Producto eliminado del carrito');
      }
    } catch (error) {
      console.error(error);
    }
    setCartItems(prev =>
        prev.filter(item => item.product._id !== productId)
    );
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
        (sum, item) => sum + item.qty * item.product.price,
        0
    );
  }, [cartItems]);

  const handleCheckOut = () => {
    if (cartItems.length === 0) {
      //alert('El carrito está vacío. Agrega productos antes de continuar.');
      alert('The cart is empty, please, firstfull add some produts to it.');
      return;
    }
    router.push('/checkout');
  };

  return (
      <div className="flex flex-col">
        <h3 className="pb-4 text-3xl font-bold text-gray-900 sm:pb-6 lg:pb-8">
          My Shopping Cart
        </h3>

        {loading ? (
            <div className="text-center py-6 text-gray-500">Cargando carrito...</div>
        ) : cartItems.length === 0 ? (
            <div className="text-center">
              <span className="text-sm text-gray-400">The cart is empty</span>
            </div>
        ) : (
            <div className="divide-y divide-dashed divide-gray-400">
              <div className="ml-auto flex flex-col items-end gap-2 py-3">
                <p className="text-2xl font-semibold text-gray-900">Total Price</p>
                <p className="text-2xl font-medium text-green-500">{totalPrice} €</p>
              </div>

              {cartItems.map(cartItem => (
                  <div key={cartItem.product._id} className="py-3">
                    <ShoppingCartProduct
                        product={cartItem.product}
                        qty={cartItem.qty}
                        onQuantityChange={newQty =>
                            updateItemQuantity({
                              productId: cartItem.product._id,
                              quantity: newQty,
                            })
                        }
                        onRemove={() =>
                            removeItemFromCart(cartItem.product._id)
                        }
                    />
                  </div>
              ))}

              <div className="flex justify-center py-6">
                <button
                    onClick={handleCheckOut}
                    className="px-6 py-3 bg-blue-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                  Check out
                </button>
              </div>
            </div>
        )}
      </div>
  );
}
