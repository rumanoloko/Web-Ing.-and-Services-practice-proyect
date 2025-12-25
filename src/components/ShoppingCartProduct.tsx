'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/models/Product';
import { Types } from 'mongoose';
import AddRestRemove from '@/components/AddRestRemove'

interface ShoppingCartProductPromp {
    product: Product & { _id: Types.ObjectId | string },
    qty: number,
    onQuantityChange: (qty: number) => void,
    onRemove: () => void
}

export default function ShoppingCartProduct(
    {
        product,
        qty,
        onQuantityChange,
        onRemove
    }: ShoppingCartProductPromp) {
    const [quantity, setQuantity] = useState(qty);
    const [price, setPrice] = useState(quantity * product.price);

    useEffect(() => {
        setPrice(quantity * product.price);
        onQuantityChange(quantity);
    }, [quantity]);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    return (
        <div className="flex flex-row items-center gap-4">
            <div className="w-80 overflow-hidden rounded-lg bg-gray-200">
                <img
                    src={product.img}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div>
                <h3 className="text-2xl text-gray-600 font-bold">{product.name}</h3>
            </div>
            <div className="ml-auto flex flex-col items-end gap-2">
                <p className="text-2xl font-semibold text-gray-900">{price} €</p>
                <p className="text-sm text-gray-500">Price per unit {product.price} €</p>

                <AddRestRemove
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    onRemove={onRemove}
                    quantity={quantity} />
            </div>
        </div>
    );
}
