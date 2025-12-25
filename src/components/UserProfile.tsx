'use client';
import React, { useEffect, useState } from 'react';

interface UserProfileProps {
  userId: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  surname: string;
  address: string;
  birthdate: string;
}

interface Order {
  _id: string;
  address: string;
  cardHolder: string;
  cardNumber: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`api/users/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('User fetch error:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`api/users/${userId}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Order fetch error:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
      await fetchOrders();
      setLoading(false);
    };
    loadData();
  }, [userId]);

  if (loading) return <p className="text-center py-6">Loading profile...</p>;
  if (!user) return <p className="text-center py-6">User not found.</p>;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
          <div>
            <p className="text-sm font-medium text-gray-500">Full Name</p>
            <p className="text-base">{user.name} {user.surname}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-base">{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-base">{user.address}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Birthdate</p>
            <p className="text-base">{new Date(user.birthdate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>


      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-gray-100 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold text-black">Order ID</p>
                  <p>{order._id}</p>
                </div>
                <div>
                  <p className="font-semibold text-black">Address</p>
                  <p>{order.address}</p>
                </div>
                <div>
                  <p className="font-semibold text-black">Card Information</p>
                  <p><strong>Cardholder:</strong> {order.cardHolder}</p>
                  <p><strong>Card Number:</strong> **** **** **** {order.cardNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
