import { getProducts, GetProductsResponse, GetProductResponse } from '@/lib/handlers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(request: NextRequest): Promise<NextResponse<GetProductsResponse | GetProductResponse | null>> {
  const products = await getProducts();
  return NextResponse.json(products);
}