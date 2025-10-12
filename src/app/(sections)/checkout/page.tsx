import { getSession } from '@/lib/auth';
import { getUserCart } from '@/lib/handlers';
import { redirect } from 'next/navigation';
import CheckoutClient from '@/components/CheckoutClient';

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect('/auth/signin');
  return <CheckoutClient userId={session.userId} />;
}
