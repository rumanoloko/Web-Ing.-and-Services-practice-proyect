import { getSession } from '@/lib/auth';
import { getUserCart } from '@/lib/handlers';
import { redirect } from 'next/navigation';
import UserProfile from '@/components/UserProfile';

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect('/auth/signin');
  return <UserProfile userId={session.userId} />;
}