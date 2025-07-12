import { memo } from 'react';
import { Header, OnChangeFn, SortingState, flexRender } from '@tanstack/react-table';
import { SCVirtualHeaderCell } from '../styles/styles';
import { getPinnedCellStyle } from '../utils/getPinnedCellStyles';
import { Sort } from './Sort';

interface VirtualHeaderCellProps<TData> {
  header: Header<TData, unknown>;
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
  onSortingChange: OnChangeFn<SortingState>;
}

function VirtualHeaderCellComponent<TData>({
  header,
  leftOffsets,
  rightOffsets,
  onSortingChange
}: VirtualHeaderCellProps<TData>) {
  const pinnedStyles = getPinnedCellStyle({
    id: header.column.id,
    pinned: header.column.getIsPinned(),
    leftOffsets,
    rightOffsets
  });

  return (
    <SCVirtualHeaderCell
      $align={header.column.columnDef.meta?.align}
      style={pinnedStyles}
      $isPinned={!!header.column.getIsPinned()}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      {/* Luego vemos si necesitamos extraer esto, para que sea algo como
          headerActions, y que esto pueda contener la logica que renderiza las acciones posibles del header
          digamos un filtro, group, reorder etc etc.
          por ahora lo dejamos asi por que solo tenemos el sort
       */}
      <Sort column={header.column} onSort={onSortingChange} />

      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '8px',
            cursor: 'col-resize',
            zIndex: 5,
            background: 'red'
          }}
        />
      )}
    </SCVirtualHeaderCell>
  );
}

const areEqual = <TData,>(prev: VirtualHeaderCellProps<TData>, next: VirtualHeaderCellProps<TData>) => {
  const prevCol = prev.header.column;
  const nextCol = next.header.column;

  return (
    prevCol.getIsSorted() === nextCol.getIsSorted() &&
    prevCol.getSize() === nextCol.getSize() &&
    prevCol.getIsVisible() === nextCol.getIsVisible() &&
    prevCol.getIsPinned() === nextCol.getIsPinned()
  );
};

// Exportar la instancia memoizada directamente
export const VirtualHeaderCell = memo(VirtualHeaderCellComponent, areEqual) as typeof VirtualHeaderCellComponent;
/** luego reviso por que no puedo darle un displayName
 * bueno en realidad se xq no puedo darle un displayName es por con el "as <TData...."
 * ahi estoy sobreescribiendo todo el tipado de la funcion y cuando trato de usar la prop de displayname
 * no me la reconoce, pero si no paso el tipado entonces no me acepta el RowData memoizado
 * que quilombo che
 */
