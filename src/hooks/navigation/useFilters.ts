import { useMemo } from 'react';

export interface FilterOptions<T> {
  field: keyof T;
  value: string;
  type?: 'contains' | 'equals';
}

export function useFilters<T>(items: T[], filters: FilterOptions<T>[] = []) {
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return filters.every((filter) => {
        const itemValue = String(item[filter.field]).toLowerCase();
        const filterValue = filter.value.toLowerCase();

        return filter.type === 'equals'
          ? itemValue === filterValue
          : itemValue.includes(filterValue);
      });
    });
  }, [items, filters]);

  return { filteredItems };
}
