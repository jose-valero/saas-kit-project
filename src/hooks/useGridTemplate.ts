import { Header } from '@tanstack/react-table';
import { useMemo } from 'react';

export function useDynamicGridTemplate<T>(headers: Header<T, unknown>[]): string {
  return useMemo(() => {
    return headers
      .map((header) => {
        const columnDef = header.column.columnDef;
        const { size, minSize } = columnDef;

        const meta = columnDef.meta;

        const isExplicit = meta?.userDefinedSize;

        if (isExplicit && typeof size === 'number') {
          return `${size}px`;
        }

        return `minmax(${minSize ?? 100}px, 1fr)`;
      })
      .join(' ');
  }, [headers]);
}
