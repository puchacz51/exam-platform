import { NextResponse } from 'next/server';

import { auth } from '@/next-auth/auth';
import { getTestOwnerAssignments } from '@actions/test-assigment/getTestOwnerAssignments';

export const GET = auth(async (request) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '2');

    const result = await getTestOwnerAssignments(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
