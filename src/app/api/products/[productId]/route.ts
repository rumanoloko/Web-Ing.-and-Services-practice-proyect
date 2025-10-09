import {Types} from 'mongoose';
import {NextRequest, NextResponse} from 'next/server';
import {
  ErrorResponse,
  getProduct,
  GetProductResponse, GetProductsResponse,
} from '@/lib/handlers'
import Product from '@/models/Product'


export async function GET(
  request: NextRequest,
  {params}: {params: {productId: string}}
): Promise<NextResponse<GetProductResponse | ErrorResponse>>
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

  const product = await getProduct(params.productId);
  if(product === null){
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
  return NextResponse.json(product);
}