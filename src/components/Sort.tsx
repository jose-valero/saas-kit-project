import { Column, OnChangeFn, SortingState } from '@tanstack/react-table';
import { SortIcon } from './SortIcon';
import { SortMenu } from './SortMenu';

interface SortProps {
  column: Column<any, unknown>;
  onSort: OnChangeFn<SortingState>;
}
export const Sort = ({ column, onSort }: SortProps) => {
  const options = column.columnDef.meta?.sortOptions ?? [];

  if (!column.getCanSort()) return null;

  // Si tiene múltiples opciones, mostrar SortMenu
  if (options.length) {
    return <SortMenu column={column} onSort={onSort} />;
  }

  // Sino mostrar solo el ícono clickable
  return <SortIcon column={column} />;
};
