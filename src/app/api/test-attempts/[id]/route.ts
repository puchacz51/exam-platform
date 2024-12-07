import { NextRequest, NextResponse } from 'next/server';

import { getTestAttempts } from '@actions/attempt/getTestAttempts';

export async function GET(request: NextRequest, params: { id: string }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const testAccessId = params.id;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!testAccessId) {
      return NextResponse.json(
        { error: 'Test access ID is required' },
        { status: 400 }
      );
    }

    const result = await getTestAttempts(testAccessId, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
