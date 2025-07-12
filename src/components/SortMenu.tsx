import { WFloating } from '../external/components/WFloating';
import { Column, OnChangeFn, SortingState } from '@tanstack/react-table';
import { SortIcon } from './SortIcon';

interface SortMenuProps {
  column: Column<any, unknown>;
  onSort: OnChangeFn<SortingState>;
}

export const SortMenu = ({ column, onSort }: SortMenuProps) => {
  const options = column.columnDef.meta?.sortOptions;
  if (!column.getCanSort() || !options?.length) return null;
  const currentSort = column.getIsSorted(); // 'asc' | 'desc' | false
  const currentId = column.id;
  return (
    <WFloating
      placement='bottom-start'
      renderOpenner={({ ref, ...props }) => (
        <div ref={ref} {...props} style={{ cursor: 'pointer', paddingLeft: 4, display: 'contents' }}>
          <SortIcon column={column} />
        </div>
      )}
    >
      <ul style={{ background: '#fff', border: '1px solid #ccc', padding: 6, borderRadius: 4 }}>
        {options.map(({ label, value }) => (
          <li
            key={value}
            onClick={() => {
              const isSame = currentId === value;
              const desc = isSame ? currentSort === 'asc' : false;
              onSort([{ id: value, desc }]);
            }}
            style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }}
          >
            {label}
          </li>
        ))}
      </ul>
    </WFloating>
  );
};

//-->
