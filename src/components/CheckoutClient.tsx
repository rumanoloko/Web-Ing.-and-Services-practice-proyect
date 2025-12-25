'use client';
import { useState, useEffect} from 'react';
import { Product } from '@/models/Product';
import { Types } from 'mongoose';

interface CartItemInterface {
  product: Product & { _id: Types.ObjectId | string },
  qty: number
}

interface CorrectOrderItemInterface{
  product: Product;
  qty: number;
}

export default function CheckoutClient({userId}:{userId: string}) {
  const [cartItems, setCartItems] = useState<CartItemInterface[]>([]);
  const [address, setAddress] = useState('');

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if(isInitialized){
      localStorage.setItem('address', address);
    }
  }, [address, isInitialized]);


  useEffect(() =>
  {
    const localCartStored = localStorage.getItem('cart');
    const localAddress = localStorage.getItem('address');
    try{
      if (localCartStored) {
        setCartItems(JSON.parse(localCartStored));
      }
      if(localAddress){
        setAddress(localAddress);
      }
    }catch(err){
      console.log('Error while trying to get cart items');
    }
    setIsInitialized(true);
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.product.price, 0
  );

  const orderConvertionFormat = cartItems.map(item => (
    {
      product: item.product._id,
      qty: item.qty,
      price: item.product.price * item.qty,

    }
    ));

  const handlePurchase = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          cardHolder,
          cardNumber,
          orderItems: orderConvertionFormat
        }),
      });

      if(response.ok){
        localStorage.removeItem('cart');
        console.log('Pedido enviado exitosamente');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex flex-col gap-8 text-black">
      <h2 className="text-3xl font-bold">Order Summary</h2>

      {/* Tabla de productos */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
        <tr className="border px-4 py-2">
          <th className="text-left">Product Name</th>
          <th className="text-center">Quantity</th>
          <th className="text-right">Price</th>
          <th className="text-right">Total</th>
        </tr>
        </thead>
        <tbody>
        {cartItems.map(item => (
          <tr key={item.product._id.toString()}>
            <td className="px-4 py-2">{item.product.name}</td>
            <td className="px-4 py-2 text-center">{item.qty}</td>
            <td className="px-4 py-2 text-right">{item.product.price} €</td>
            <td className="px-4 py-2 text-right">{item.qty * item.product.price} €</td>
          </tr>
        ))}
        <tr className="font-bold bg-gray-50">
          <td colSpan={3} className="border px-4 py-2 text-left">Total Price</td>
          <td className="border px-4 py-2 text-right text-green-700">{totalPrice} €</td>
        </tr>
        </tbody>
      </table>
      {/* Campos de pago en una fila */}
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700">Shopping Address</span>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-md"
            placeholder="Enter your address here"
          />
        </label>

        {/* Card Holder y Card Number en la misma fila */}
        <div className="flex gap-4">
          <label className="flex flex-col flex-1">
            <span className="text-sm font-semibold text-gray-700">Card Holder</span>
            <input
              type="text"
              value={cardHolder}
              onChange={e => setCardHolder(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md"
              placeholder="Name and Surname on card"
            />
          </label>

          <label className="flex flex-col flex-1">
            <span className="text-sm font-semibold text-gray-700">Card Number</span>
            <input
              type="text"
              value={cardNumber}
              onChange={e => setCardNumber(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md"
              placeholder="0000 1111 2222 3333"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handlePurchase}
          className="px-6 py-3 bg-blue-950 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
