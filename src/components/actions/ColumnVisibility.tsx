import { WFloating } from '../../external/components/WFloating';
import { FaTableColumns } from 'react-icons/fa6';
import { SCGenericFloatingContainer } from './actions.styles';
import { Table } from '@tanstack/react-table';

interface ColumnVisibilityProps<TData> {
  table: Table<TData>;
}

export function ColumnVisibility<TData>({ table }: ColumnVisibilityProps<TData>) {
  const togglable = table
    .getAllLeafColumns()
    .filter((col) => col.columnDef.meta?.toggleable && col.columnDef.meta?.visible !== false);

  return (
    <WFloating
      placement='bottom-start'
      offsetValue={{ mainAxis: 7, crossAxis: -20 }}
      shiftPadding={25}
      renderOpenner={({ ref, ...props }) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} ref={ref} {...props}>
            <FaTableColumns color='var(--gray-nevada)' />
          </div>
        );
      }}
    >
      <SCGenericFloatingContainer $minWidth={'120px'}>
        <div style={{ color: 'var(--gray-nevada)' }}>Header del Menu</div>
        <hr />
        {togglable.map((col) => {
          return (
            <label key={col.id} style={{ display: 'block', margin: '4px 0', color: 'var(--gray-nevada)' }}>
              <input
                {...{
                  type: 'checkbox',
                  checked: col.getIsVisible(),
                  onChange: col.getToggleVisibilityHandler()
                }}
              />{' '}
              {col.id}
            </label>
          );
        })}
      </SCGenericFloatingContainer>
    </WFloating>
  );
}
