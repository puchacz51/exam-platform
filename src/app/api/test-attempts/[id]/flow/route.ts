import { NextRequest, NextResponse } from 'next/server';

import { getUserAttemptFlow } from '@actions/attempt/getUsetAttemptFlow';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const testAccessId = (await params).id;
    const groupId =
      typeof searchParams.get('groupId') === 'string'
        ? searchParams.get('groupId')
        : undefined;
    const questionId =
      typeof searchParams.get('questionId') === 'string'
        ? searchParams.get('questionId')
        : undefined;

    console.log('testAccessId', testAccessId);
    console.log('groupId', groupId);
    console.log('questionId', questionId);
    console.log('searchParams', searchParams.toString());

    if (!testAccessId) {
      return NextResponse.json(
        { error: 'Test access ID is required' },
        { status: 400 }
      );
    }

    const navOptions =
      questionId || groupId ? { groupId, questionId } : undefined;

    const result = await getUserAttemptFlow(
      testAccessId,
      navOptions as unknown as undefined
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
