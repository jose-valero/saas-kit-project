import { WVirtualTable } from '../../tables/WVirtualTable';
import { usePeopleColumns } from './usePeopleColumns';
import { OnChangeFn, SortingState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { PeopleParams, usePeople } from './usePeople';
import { useQueryClient } from '@tanstack/react-query';

const STORAGE_KEY = 'people_wvirtualtable_column_visibility';

export const Peoples = () => {
  const queryClient = useQueryClient();
  const { columns } = usePeopleColumns();

  const [sorting, setSorting] = useState<SortingState>([]);

  const sortParams: Partial<PeopleParams> = sorting[0]
    ? { sortBy: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' }
    : {};

  const params: PeopleParams = { per_page: 20, ...sortParams };

  const peopleQuery = usePeople(params);

  const flatData = useMemo(() => peopleQuery.data?.pages.flatMap((page) => page[0]) ?? [], [peopleQuery.data]);

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    setSorting((old) => {
      const newSorting = typeof updaterOrValue === 'function' ? updaterOrValue(old) : updaterOrValue;
      console.log('🚀 ~ setSorting ~ newSorting:', newSorting);

      // limpia la cache para forzar refetch en React Query
      queryClient.removeQueries({ queryKey: ['infinitePeople'], exact: false });
      return newSorting;
    });
  };

  return (
    <WVirtualTable
      //--> config de columnas, donde se hace la magia
      columns={columns}
      //--> Datos + flags de fetch
      data={flatData}
      isLoading={peopleQuery.isLoading}
      error={peopleQuery.error}
      fetchNextPage={peopleQuery.fetchNextPage}
      hasNextPage={!!peopleQuery.hasNextPage}
      isFetchingNextPage={!!peopleQuery.isFetchingNextPage}
      //--> Sorting (servidor)
      sorting={sorting}
      onSortingChange={handleSortingChange}
      //--> Column visibility
      storageKey={STORAGE_KEY}
    />
  );
};
