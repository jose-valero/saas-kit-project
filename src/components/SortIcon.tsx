// components/SortIcon.tsx
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { Column } from '@tanstack/react-table';
import { SCSortIcon } from '../styles/styles';

interface SortIconProps {
  column: Column<any, unknown>;
}

export const SortIcon = ({ column }: SortIconProps) => {
  const canSort = column.getCanSort();
  const sortDir = column.getIsSorted();
  const onClick = canSort ? column.getToggleSortingHandler() : undefined;

  if (!canSort) return null;

  if (sortDir === 'asc') {
    return <SCSortIcon as={FaSortUp} size={12} onClick={onClick} />;
  }

  if (sortDir === 'desc') {
    return <SCSortIcon as={FaSortDown} size={12} onClick={onClick} />;
  }

  return <SCSortIcon as={FaSort} size={10} onClick={onClick} />;
};
