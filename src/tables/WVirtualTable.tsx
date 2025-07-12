/**lib */
import { ColumnDef, getCoreRowModel, OnChangeFn, SortingState, useReactTable } from '@tanstack/react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

/** local */
import { getStickyOffsets } from '../utils/getStickyOffsets';
import { extractColumnPinning } from '../utils/extractColumnPinning';
import { useDynamicGridTemplate } from '../hooks/useGridTemplate';
import { useColumnVisibility } from '../hooks/useColumnVisibility';
import { Actions } from '../components/actions/Actions';

/** styles */
import { SCVirtualContainer, SCVirutalWrapper } from '../styles/styles';
import { VirtualHeaderRow } from '../components/VirtualHeaderRow';
import { VirtualBody } from '../components/VirtualBody';

/**
 * Props de la WVirtualTable
 *
 * @template TData Tipo de dato de cada fila
 */
export interface WVirtualTableProps<TData> {
  /*****config local*****/
  /**** Definicion de columnas (react‑table) ****/
  columns: ColumnDef<TData, any>[];

  /*****Server*****/
  /**** Los datos ya aplanados ****/
  data: TData[];

  /**** Flags de loading|error ****/
  isLoading: boolean;
  error: unknown;

  /**** Infinite scroll de useInfiniteQuery ****/
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;

  /*****lift state up*****/
  /**** Sorting ****/
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;

  /*****UI*****/
  /**** Column visibility ****/
  storageKey: string;
  /**** Alto del contenedor padre ****/
  height?: string;
  /**** altura de la fila ****/
  rowHeight?: number;
}
export function WVirtualTable<TData>({
  columns,
  data,
  error,
  fetchNextPage,
  hasNextPage,
  height = '500px',
  isFetchingNextPage,
  isLoading,
  onSortingChange,
  rowHeight = 35,
  sorting,
  storageKey
}: WVirtualTableProps<TData>) {
  /** config locales */
  const [columnSizing, setColumnSizing] = useState({});

  /** referencia de scroll */
  const parentRef = useRef<HTMLDivElement>(null);

  /**config derivadas externamente */
  const pinningState = useMemo(() => extractColumnPinning(columns), [columns]);
  const [columnVisibility, onColumnVisibilityChange] = useColumnVisibility({
    columns,
    storageKey
  });

  /** react-table  instancia*/
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange,
    onColumnVisibilityChange,
    onColumnSizingChange: setColumnSizing,
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: 'onChange',

    state: {
      columnPinning: pinningState,
      columnVisibility,
      sorting,
      columnSizing
    },
    /** es importante no mandar size en el defaultColumn
     *  para que no tome esos valores como el tamaño por defecto
     *  de la columna, y que podamos personalizarlos de las columns
     */
    defaultColumn: { minSize: 100, maxSize: 500, enableSorting: false }
  });

  /** react-virtual */
  const rowVirtualizer = useVirtualizer<HTMLElement, Element>({
    count: hasNextPage ? data.length + 1 : data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight, // tamaño estimado de la fila (px)
    overscan: 1 /** lo usamos en 0 para disparar cuando veamos exactamente la ultima fila */
  });

  /** calculos derivados para los renders */
  const flatHeaders = table.getFlatHeaders();
  const visibleHeaders = useMemo(() => flatHeaders.filter((h) => h.column.getIsVisible()), [flatHeaders]);
  const gridTemplate = useDynamicGridTemplate(visibleHeaders);
  const { leftOffsets, rightOffsets } = getStickyOffsets(visibleHeaders);

  /** calculo de la altura dinamica cuando hay pocos elementos */
  /** Aqui controlamos que no sea negativo Math.max(0, computed)*/
  /**  aqui computamos la altura Math.mi(dataLength*rowHeight, height)*/
  const baseHeight = parseInt(height, 10) || 500;
  const computedHeight = `${Math.max(0, Math.min(data.length * rowHeight, baseHeight))}px`;

  /** evento que determina cuandom mandamos el fetch
   * esto no lo determinamos en el virtualizer porque no queremos
   * que se dispare el fetch cuando el scroll no es visible
   * y no queremos que el scroll se vea afectado por el fetch
   * por eso lo hacemos en el contenedor padre
   * el scrollTop es la distancia desde el top del contenedor
   * el scrollHeight es la altura total del contenedor
   * el clientHeight es la altura visible del contenedor (viewport)
   * la distancia al bottom es la diferencia entre el scrollHeight y el scrollTop
   */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { scrollHeight, scrollTop, clientHeight } = container;

    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceToBottom < rowHeight && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  /** con esto reiniciamos el scroll arriba cuando existe alguna interaccion con la tabla
   * por ejemplo, cuando se hace un sorting, llevamos el scroll al top
   */
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
      rowVirtualizer.scrollToIndex(0);
    }
  }, [sorting, parentRef.current, rowVirtualizer]);

  /** page states, loading */
  if (isLoading) {
    return <div style={{ color: 'red' }}>Loading carga inicial skeleton</div>;
  }
  /** page states, error */
  if (error) {
    return <div style={{ color: 'red' }}>Error template: {(error as Error).message}</div>;
  }

  return (
    <SCVirutalWrapper>
      <Actions table={table} />
      <SCVirtualContainer ref={parentRef} $height={computedHeight} onScroll={handleScroll}>
        <VirtualHeaderRow
          onSortingChange={onSortingChange}
          headers={visibleHeaders}
          gridTemplate={gridTemplate}
          leftOffsets={leftOffsets}
          rightOffsets={rightOffsets}
        />

        <VirtualBody
          items={rowVirtualizer.getVirtualItems()}
          rowVirtualizer={rowVirtualizer}
          dataLength={data.length}
          isFetchingNextPage={isFetchingNextPage}
          gridTemplate={gridTemplate}
          leftOffsets={leftOffsets}
          rightOffsets={rightOffsets}
          rowHeight={rowHeight}
          rows={table.getRowModel().rows}
        />
      </SCVirtualContainer>
    </SCVirutalWrapper>
  );
}
