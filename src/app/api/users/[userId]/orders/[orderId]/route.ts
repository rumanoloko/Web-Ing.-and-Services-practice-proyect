import {NextRequest, NextResponse} from 'next/server';
import {Order} from '@/models/Order'
import {Types} from 'mongoose'
import {
  ErrorResponse,
  GetOrderByIdResponse,
  getUser,
  getOrderById,
} from '@/lib/handlers'


export async function GET(
  request: NextRequest,
  {params}:{params: {userId: string, orderId: string}}
): Promise<NextResponse<Order | ErrorResponse | null>>{
  const {userId} = params
  const {orderId} = params
  if(!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(userId)){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid userId or orderId'
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
  const orders = await getOrderById(userId, orderId);
  if(!orders){
    return NextResponse.json({
      error: 'NOT FOUND',
      message: 'Order not found.'
    },{
      status: 404
    });
  }
  return NextResponse.json(orders);
}
