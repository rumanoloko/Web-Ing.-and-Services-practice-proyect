// src/app/(sections)/cart/page.tsx
import CartClient from '@/components/CartClient';
import { getSession } from '@/lib/auth';
import { getUserCart } from '@/lib/handlers';
import { redirect } from 'next/navigation';

export default async function CartPage() {
  const session = await getSession();
  if (!session) redirect('/auth/signin');

  const cartItemsData = await getUserCart(session.userId);
  if (!cartItemsData) redirect('/auth/signin');
  const cartItems = cartItemsData.cartItems.map(item => ({
    ...item,
    product: {
      ...item.product,
      _id: item.product._id.toString(), // ← convierte ObjectId a string
    }
  }));
  return <CartClient initialCartItems={cartItems} />;
}
