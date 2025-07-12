import { memo } from 'react';
import { SCVirtualRow } from '../styles/styles';
import { Cell, Row } from '@tanstack/react-table';
import { getPinnedCellStyle } from '../utils/getPinnedCellStyles';
import { VirtualCell } from './VirtualCell';

/**
 * Props de una fila virtual.
 * @template TData El tipo de dato que representa cada fila.
 */

export interface VirtRowProps<TData> {
  start: number; // posición Y en px
  rowModel: Row<TData>; // modelo de react-table
  gridTemplate: string;
  leftOffsets: any;
  rightOffsets: any;
  rowHeight: number;
}

/**
 * _VirtualRow
 *
 * Renderiza una fila dentro de la tabla virtual
 */
function _VirtualRow<TData>({
  start,
  rowModel,
  gridTemplate,
  leftOffsets,
  rightOffsets,
  rowHeight
}: VirtRowProps<TData>) {
  return (
    <SCVirtualRow
      style={{ transform: `translateY(${Math.floor(start)}px)` }}
      $gridTemplate={gridTemplate}
      $rowHeight={rowHeight}
    >
      {rowModel.getVisibleCells().map((cell: Cell<TData, unknown>) => {
        // const meta = cell.column.columnDef.meta;
        const pinnedStyles = getPinnedCellStyle({
          id: cell.column.id,
          pinned: cell.column.getIsPinned(),
          leftOffsets,
          rightOffsets
        });
        const styles = { ...pinnedStyles };
        return <VirtualCell key={cell.id} cell={cell} style={styles} />;
      })}
    </SCVirtualRow>
  );
}

/**
 * Memoizamos con un comparador custom:
 * - Solo vuelve a renderizar si cambia `start`
 * - O si naturalmente cambian los `rowModel.id`
 * - O cambia alguno de los `widths` o `minWidths`
 */

/**
 * Fila virtual memoizada:
 * - Solo renderiza las celdas visibles
 * - Usa transform: translateY para posicionarse
 * - Se memoiza para no romper performance al hacer scroll
 *
 * @template TData
 * @param {VirtRowProps<TData>} props
 * @returns ReactNode
 */
export const VirtualRow = memo(_VirtualRow, (prev, next) => {
  if (prev.start !== next.start) return false;
  if (prev.rowModel.id !== next.rowModel.id) return false;
  if (prev.gridTemplate !== next.gridTemplate) return false;

  return true;
});

/** esto para que en el devtools me salga como "<VirtualRow>" */
VirtualRow.displayName = 'VirtualRow';
