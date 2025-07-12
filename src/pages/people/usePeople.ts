import { PersonSchema } from '../../data.types';
import { useInfiniteFetch } from '../../hooks/useInfiniteFetch';
import { useQueryKey } from '../../hooks/useQueryKey';

export type PeopleParams = {
  per_page?: number;
  page?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
};

export function usePeople({ per_page = 20, sortBy, order, search }: PeopleParams) {
  const queryKey = useQueryKey('infinitePeople', { per_page, sortBy, order, search });

  return useInfiniteFetch<PersonSchema>({
    queryKey,
    url: '/people',
    initialParams: { per_page, sortBy, order, search }
  });
}
