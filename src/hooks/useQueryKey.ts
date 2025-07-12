import { useMemo } from 'react';
/** con esto basicamente estabilizamos nuestro queryKey y nuestros params, para evitar cambios innecesarios o inesperados */
export function useQueryKey<T extends Record<string, any>>(namespace: string, params: T) {
  /** si este string no cambia entonces no cambian mis params y asi no cree que estamo recreandom ningun objeto raro ni un coño */
  const serialized = useMemo(() => JSON.stringify(params), [params]);
  return useMemo(() => [namespace, serialized] as const, [namespace, serialized]);
}
