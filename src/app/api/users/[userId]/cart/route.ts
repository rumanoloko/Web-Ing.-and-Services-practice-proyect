import {Types} from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import {
  ErrorResponse,
  GetUserCartResponse,
  getUser,
  getUserCart
} from '@/lib/handlers'

export async function GET(request: NextRequest, { params }: { params:{ userId: string}}
): Promise<NextResponse<GetUserCartResponse | ErrorResponse | null>>
{
  const {userId} = params
  if(!Types.ObjectId.isValid(userId)) {
    return NextResponse.json({
      error: 'WRONG_PARAMS',
      message: 'Invalid user ID.'
    },{
      status: 400
    })
  }
  const user = await getUser(userId)
  if(user == null){
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      { status: 404 }
    );
  }
  const cartItems = await getUserCart(userId);

  return NextResponse.json(cartItems);
}