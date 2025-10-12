import { Types } from 'mongoose'
import { notFound, redirect } from 'next/navigation'
import { getProduct } from '@/lib/handlers'
import React from 'react'
import UnicProduct from '@/components/UnicProduct'
import { getSession } from '@/lib/auth'
export default async function Product({ params, }: { params:{ productId: string }
}) {

  const session = await getSession();
  if (!session) redirect('/auth/signin');

  if(!Types.ObjectId.isValid(params.productId)) {
    notFound()
  }
  const product = await getProduct(params.productId)
  if(product === null) {
    notFound()
  }

  return <UnicProduct product={product} userId={session.userId} />
}