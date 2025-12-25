import { Types } from 'mongoose';
import { getSession } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server';
import {
  ErrorResponse,
  getUser,
  GetUserResponse,
} from '@/lib/handlers';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse<GetUserResponse> | NextResponse<ErrorResponse>> {
  const session = await getSession();
  console.log("Session: ", session);
  console.log("UserId: ", params.userId);
  console.log(session?.userId === params.userId);
  if (!session?.userId) {
    return NextResponse.json(
      {
        error: 'NOT_AUTHENTICATED',
        message: 'Authentication required.',
      },
      { status: 401 }
    );
  }

  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID.',
      },
      { status: 400 }
    );
  }

  if (session.userId.toString() !== params.userId) {
    return NextResponse.json(
      {
        error: 'NOT_AUTHORIZED',
        message: 'Unauthorized access.',
      },
      { status: 403 }
    );
  }

  //const user = await getUser(params.userId);

  if (!Types.ObjectId.isValid(params.userId)) {
    return NextResponse.json(
      {
        error: 'WRONG_PARAMS',
        message: 'Invalid user ID.',
      },
      { status: 400 }
    );
  }

  const user = await getUser(params.userId);

  if (user === null) {
    return NextResponse.json(
      {
        error: 'NOT_FOUND',
        message: 'User not found.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
