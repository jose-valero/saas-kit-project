import { Table } from '@tanstack/react-table';
import { SCActionsContainer } from './actions.styles';
import { ColumnVisibility } from './ColumnVisibility';

export function Actions<TData>({ table }: { table: Table<TData> }) {
  return (
    <SCActionsContainer>
      <ColumnVisibility table={table} />
    </SCActionsContainer>
  );
}
