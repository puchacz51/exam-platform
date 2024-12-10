'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationOptions {
  totalPages?: number;
}

export function usePagination({ totalPages = 1 }: PaginationOptions) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = searchParams.get('page')
    ? parseInt(searchParams.get('page') as string)
    : 1;

  const createUrlWithParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      replace(createUrlWithParams(currentPage + 1));
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      replace(createUrlWithParams(currentPage - 1));
    }
  };

  return {
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    nextPage,
    previousPage,
  };
}
