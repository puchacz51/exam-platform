import { NextResponse } from 'next/server';

import { auth } from '@/next-auth/auth';
import { getBasicUserTestAssignments } from '@actions/test-assigment/getBasicUserTestAssignments';

export const GET = auth(async (request) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await getBasicUserTestAssignments(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});
