import { useInfiniteQuery, QueryKey } from '@tanstack/react-query';
import { requestor } from '../utils/requestor';

interface Pagination {
  total: number;
  total_count: number;
}

type BackendResponse<T> = [T[], { pagination: Pagination }];

interface UseInfiniteFetchProps {
  queryKey: QueryKey;
  url: string;
  initialParams?: Record<string, any>;
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
}

export const useInfiniteFetch = <T>({
  queryKey,
  url,
  initialParams = {},
  enabled = true,
  staleTime = 0,
  refetchOnMount = true
}: UseInfiniteFetchProps) => {
  return useInfiniteQuery<BackendResponse<T>, Error>({
    // La key del query
    queryKey,
    // Query Function
    queryFn: async ({ pageParam = 1 }) => {
      const params = { ...initialParams, page: pageParam };

      // Esperamos un response que coincide con [T[], { pagination }]
      const res = await requestor<BackendResponse<T>>({
        method: 'GET',
        url,
        params
      });

      return res.data;
    },

    // C0mo obtener el siguiente pageParam
    getNextPageParam: (lastPage, allPages) => {
      // lastPage es: [ T[], { pagination: { total, total_count } } ]
      const [, { pagination }] = lastPage;

      const totalAbsolute = pagination.total_count ?? pagination.total;
      // "currentPage" es la cantidad de pages ya traidas
      const currentPage = allPages.length;

      // Puedes usar "pagination.total_count" o "pagination.total", segun tu real backend
      const perPage = initialParams.per_page ?? 10;
      const totalPages = Math.ceil(totalAbsolute / perPage);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    // initialPageParam: 1, //--> esto solo es necesario para versiones mayores a 5.x
    // Otros flags
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime,
    refetchOnMount
  });
};
