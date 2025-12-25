'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import AddRestRemove from '@/components/AddRestRemove'
import {Types} from 'mongoose'

export interface Product {
  _id: Types.ObjectId;
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
  }, [quantity]);

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
                <AddRestRemove
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    onRemove={onRemove}
                    quantity={quantity}
                />
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
