import { NextRequest, NextResponse } from 'next/server';

import { getTestTestAccess } from '@actions/test-access/getTestTestAccess';

export async function GET(request: NextRequest, params: { id: string }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const testId = params.id;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!testId) {
      return NextResponse.json(
        { error: 'Test ID is required' },
        { status: 400 }
      );
    }

    const result = await getTestTestAccess(testId, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
