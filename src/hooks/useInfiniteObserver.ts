import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook que observa cuando el elemento se vuelve visible y ejecuta un callback.
 * @param onIntersect - Callback a ejecutar cuando el elemento sea visible
 * @param options - Opciones del IntersectionObserver
 */

export const useInfiniteObserver = (onIntersect: () => void, options: IntersectionObserverInit = {}) => {
  console.log('🚀 ~ options:', options);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      }, options);

      if (node) observerRef.current.observe(node);
    },
    [onIntersect, options]
  );

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { lastElementRef };
};
