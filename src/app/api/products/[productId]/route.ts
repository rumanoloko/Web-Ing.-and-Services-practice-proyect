import {Types} from 'mongoose';
import {NextRequest, NextResponse} from 'next/server';
import {
  ErrorResponse,
  getProducts,
  GetProductResponse, GetProductsResponse,
} from '@/lib/handlers'
import Product from '@/models/Product'


export async function GET(
  request: NextRequest,
  {params}: {params: {productId: string}}
): Promise<NextResponse<GetProductResponse | ErrorResponse | GetProductsResponse>>
{
  if(!Types.ObjectId.isValid(params.productId)){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid product ID.'
      },
      {status: 400}
    );
  };

  const products = await getProducts(params.productId);
  if(products === null){
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'Product not found.'
      },
      {
        status: 404
      }
    );
  }
  return NextResponse.json(products);
}