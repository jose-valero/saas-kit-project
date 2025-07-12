import { useQuery } from '@tanstack/react-query';
import { requestor } from '../utils/requestor';

export interface UseFetchProps {
  queryKey: any[];
  url: string;
  params?: Record<string, any>;
  enabled?: boolean;
}

export const useFetch = <T>({ queryKey, url, params, enabled = true }: UseFetchProps) => {
  return useQuery({
    queryKey,
    queryFn: () => requestor<T>({ method: 'GET', url, params }),
    enabled
  });
};
