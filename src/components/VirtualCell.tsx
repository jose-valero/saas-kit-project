import { CSSProperties, memo, ReactNode } from 'react';
import { SCVirtualDataCell } from '../styles/styles';
import { Cell, flexRender } from '@tanstack/react-table';

interface VirtualCellProps<TData> {
  cell: Cell<TData, unknown>;
  style?: CSSProperties;
}

function VirtualCellComponent<TData>({ cell, style }: VirtualCellProps<TData>) {
  const align = cell.column.columnDef.meta?.align;
  return (
    <SCVirtualDataCell $align={align} style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </SCVirtualDataCell>
  );
}
VirtualCellComponent.displayName = 'VirtualCellComponent';

function areEqual<TData>(prev: VirtualCellProps<TData>, next: VirtualCellProps<TData>) {
  const prevVal = prev.cell.getValue();
  const nextVal = next.cell.getValue();

  const sameValue = prevVal === nextVal;

  const prevStyle = prev.style;
  const nextStyle = next.style;

  const sameStyle =
    prevStyle === nextStyle || (prevStyle?.left === nextStyle?.left && prevStyle?.right === nextStyle?.right);

  return sameValue && sameStyle;
}

// Solo re-renderiza si cambia el contenido o el estilo "pinned (por ahora, luego extendemos)"
export const VirtualCell = memo(VirtualCellComponent, areEqual) as <TData>(props: VirtualCellProps<TData>) => ReactNode;
/** luego reviso por que no puedo darle un displayName
 * bueno en realidad se xq no puedo darle un displayName es por con el "as <TData...."
 * ahi estoy sobreescribiendo todo el tipado de la funcion y cuando trato de usar la prop de displayname
 * no me la reconoce, pero si no paso el tipado entonces no me acepta el RowData memoizado
 * que quilombo che
 */
