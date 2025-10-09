import {NextRequest, NextResponse} from 'next/server';
import {Types} from 'mongoose'
import {
  ErrorResponse,
  GetOrderResponse,
  getUser,
  getOrder,
  createOrder,
} from '@/lib/handlers'


export async function GET(
  request: NextRequest,
  {params}:{params: {userId: string}}
): Promise<NextResponse<GetOrderResponse | ErrorResponse | null>>{
  const {userId} = params
  if(!Types.ObjectId.isValid(params.userId)){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid userId'
      },
      {status: 400});
  }

  const user = await getUser(userId);

  if(!user){
    return NextResponse.json({
      error: 'NOT FOUND',
      message: 'User not found.'
    },{
      status: 404
    });
  }
  const orders = await getOrder(userId);
  return NextResponse.json(orders);
}

export async function POST(
  request: NextRequest,
  {params}:{params: {userId: string}}
): Promise<NextResponse<{_id: Types.ObjectId} | ErrorResponse | null>>{
  const body = await request.json();
  const {userId} = params;
  if(
    !Types.ObjectId.isValid(userId) ||
    !body.address ||
    !body.cardHolder ||
    !body.cardNumber
  ){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMETER_OR_BODY_REQUEST',
        message: 'Invalid user ID or invalid request'
      },
      {status: 400});
  }
  const user = await getUser(userId);
  if(!user){
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found'
      },
      {status: 404});
  }

  const orderId = await createOrder(userId, body);
  const headers = new Headers();
  headers.append('Location', `/api/users/${userId}/orders/${orderId}`);
  return NextResponse.json(
    orderId,
    {
      status: 200,
      headers: headers
    }
    );
}
