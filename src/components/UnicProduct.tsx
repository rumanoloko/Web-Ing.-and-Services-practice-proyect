'use client';
import { useState, useEffect } from 'react';
import React from 'react';

export interface Product {
  _id: string;
  name: string;
  description: string;
  img: string;
  price: number;
}

interface PrompType {
  product: Product;
  userId: string;
}

export default function UnicProduct({ product, userId }: PrompType) {
  const [quantity, setQuantity] = useState(0);

  const onRemove = async () => {
    setQuantity(0);
    try {
      const response = await fetch(`/api/users/${userId}/cart/${product._id}`, {
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
  };

  useEffect(() => {
    const updateQuantity = async () => {
      try {
        const response = await fetch(`/api/users/${userId}/cart/${product._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ qty: quantity }),
        });

        if (response.ok) {
          localStorage.removeItem('cart');
          console.log('Cantidad actualizada en el carrito');
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (quantity > 0) updateQuantity();
  }, [quantity, product._id, userId]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 0) setQuantity((prev) => prev - 1);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left column */}
        <div className="flex flex-col justify-start w-full md:w-1/2 space-y-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-medium text-gray-800">Price:</p>
                <p className="text-2xl font-bold text-blue-700">{product.price} €</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm">
                <button onClick={handleDecrement} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm font-bold">−</button>
                <span className="text-sm font-medium px-1">{quantity}</span>
                <button onClick={handleIncrement} className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm font-bold">+</button>
                <button onClick={onRemove} className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.014 314.015" width="16" height="16" fill="currentColor">
                    <path d="M282.612,31.402h-47.099V15.701C235.513,7.033,228.471,0,219.812,0H94.205c-8.666,0-15.701,7.033-15.701,15.701v15.701
                      H31.402c-8.668,0-15.701,7.033-15.701,15.699c0,8.668,7.033,15.701,15.701,15.701v219.81c0,17.344,14.06,31.402,31.4,31.402
                      h188.411c17.341,0,31.398-14.059,31.398-31.402V62.803c8.664,0,15.701-7.033,15.701-15.701
                      C298.313,38.436,291.292,31.402,282.612,31.402z M251.213,282.612H62.803V62.803h188.411V282.612z"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full md:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg bg-white">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
