import {NextRequest, NextResponse} from 'next/server'
import {Types} from 'mongoose'

import {
  GetUserCartResponse,
  getUser,
  getProduct,
  putCartItem,
  deleteCartItem,
  ErrorResponse,
} from '@/lib/handlers'
import connect from '@/lib/mongoose'
import {getSession} from "@/lib/auth";


export async function DELETE(
  request: NextRequest,
  {params}:{params: {userId: string, productId: string}}
):Promise<NextResponse<GetUserCartResponse | ErrorResponse | null>>{
  const {userId} = params
  const {productId} = params
  const session = await getSession();
  console.log("Session: ", session);
  console.log("UserId: ", userId);
  if (!session?.userId/* && session?.userId !== userId*/) {
    return NextResponse.json(
        {
          error: 'NOT_AUTHENTICATED',
          message: 'Authentication required.',
        },
        { status: 401 }
    );
  }

  await connect();

  if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId)) {
    return NextResponse.json({
      error: 'WRONG_PARAMS',
      message: 'Invalid user ID or invalid product ID.'
    },{
      status: 400
    });
  }
  const user = await getUser(userId)
  const product = await getProduct(productId)

  if(!user || !product) {
    return NextResponse.json({
      error: 'NOT_FOUND',
      message: 'User or product not found.',
    },{
      status: 404
    });
  }
  console.log('Antes del Delete')
  const result = await deleteCartItem(userId, productId);
  return NextResponse.json(result, {
    status: 200,
  });
}




export async function PUT(
  request: NextRequest,
  {params}:{params: { userId: string, productId: string}}
):Promise<NextResponse<GetUserCartResponse | ErrorResponse | null>>{


  const session = await getSession();
  console.log("Session: ", session);
  console.log("UserId: ", params.userId);
  if (!session?.userId/* && session?.userId !== userId*/) {
    return NextResponse.json(
        {
          error: 'NOT_AUTHENTICATED',
          message: 'Authentication required.',
        },
        { status: 401 }
    );
  }


  await connect()

  const {userId} = params
  const {productId} = params
  const {qty} = await request.json()

  if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(productId) || qty < 1) {
    return NextResponse.json({
      error: 'WRONG_PARAMS',
      message: 'Invalid user ID, invalid product ID or number of items not greater.'
    },{
      status: 400
    });
  }
  const user = await getUser(userId)
  const product = await getProduct(productId)

  if(!user || !product) {
    return NextResponse.json({
      error: 'NOT_FOUND',
      message: 'User or product not found.',
    },{
      status: 404
    });
  }
  const result = await putCartItem(userId, productId, qty);
  const headers = new Headers();
  headers.append('Location', `/api/users/${userId}/cart`);
  if(result[0]){
    return NextResponse.json(result[1], {
      status: 200,
      headers: headers,
    });
  }else{
    return NextResponse.json(result[1], {
      status: 201,
      headers: headers,
    });
  }
}
