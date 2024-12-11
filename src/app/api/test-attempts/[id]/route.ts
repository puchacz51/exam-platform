import { NextRequest, NextResponse } from 'next/server';

import { getTestAttempts } from '@actions/attempt/getTestAttempts';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const searchParams = new URLSearchParams(request.url);
    const testAccessId = (await params).id;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    console.log('testAccessId', testAccessId);
    if (!testAccessId) {
      return NextResponse.json(
        { error: 'Test access ID is required' },
        { status: 400 }
      );
    }

    const result = await getTestAttempts(testAccessId, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
