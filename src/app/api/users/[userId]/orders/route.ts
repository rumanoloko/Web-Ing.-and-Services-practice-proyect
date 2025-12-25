import {NextRequest, NextResponse} from 'next/server';
import {Types} from 'mongoose'
import {
  ErrorResponse,
  GetOrderResponse,
  getUser,
  getOrder,
  createOrder,
} from '@/lib/handlers'
import {getSession} from "@/lib/auth";


export async function GET(
  request: NextRequest,
  {params}:{params: {userId: string}}
): Promise<NextResponse<GetOrderResponse | ErrorResponse | null>>{
  const {userId} = params

  const session = await getSession();

    if (!session?.userId && session?.userId !== userId) {
        return NextResponse.json(
            {
                error: 'NOT_AUTHENTICATED',
                message: 'Authentication required.',
            },
            { status: 401 }
        );
    }


  if(!Types.ObjectId.isValid(params.userId)){
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid userId'
      },
      {status: 400});
  }
  console.log("ID del usuario pasado como parametro: ",userId)
  const user = await getUser(userId);
  console.log("Usuario recibido: ",userId)
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
  console.log("BODY CONTENT: ",body);
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
    console.log("ID del usuario pasado como parametro: ",userId)
    const user = await getUser(userId);
    console.log("Usuario recibido: ",user)
  if(!user){
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found'
      },
      {status: 404});
  }
  const {cartItems} = body
  if(body.orderItems.length === 0){
      return NextResponse.json(
          {
              error: 'NOT_ACCEPTABLE_OPERATION',
              message: 'The user cart is empty'
          },
          {status: 406});
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
