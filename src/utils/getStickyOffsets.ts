import { Header } from '@tanstack/react-table';

export function getStickyOffsets<T>(headers: Header<T, unknown>[]): {
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
} {
  const leftPinned = headers.filter((h) => h.column.columnDef.meta?.pinned === 'left');

  const rightPinned = [...headers].reverse().filter((h) => h.column.columnDef.meta?.pinned === 'right');

  const leftOffsets = leftPinned.reduce((acc, header, index) => {
    const previousWidths = leftPinned.slice(0, index).reduce((sum, h) => sum + h.getSize(), 0);
    acc[header.id] = previousWidths;
    return acc;
  }, {} as Record<string, number>);

  const rightOffsets = rightPinned.reduce((acc, header, index) => {
    const previousWidths = rightPinned.slice(0, index).reduce((sum, h) => sum + h.getSize(), 0);
    acc[header.id] = previousWidths;
    return acc;
  }, {} as Record<string, number>);

  return { leftOffsets, rightOffsets };
}
