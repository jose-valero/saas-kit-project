import { memo } from 'react';
import { Header, OnChangeFn, SortingState } from '@tanstack/react-table';
import { SCVirtualHeader } from '../styles/styles';
import { VirtualHeaderCell } from './VirtualHeaderCell';

interface VirtualHeaderRowProps<TData> {
  headers: Header<TData, unknown>[];
  gridTemplate: string;
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
  onSortingChange: OnChangeFn<SortingState>;
}

function VirtualHeaderRowInner<TData>({
  headers,
  gridTemplate,
  leftOffsets,
  rightOffsets,
  onSortingChange
}: VirtualHeaderRowProps<TData>) {
  return (
    <SCVirtualHeader $gridTemplate={gridTemplate}>
      {headers.map((header) => (
        <VirtualHeaderCell
          key={header.id}
          onSortingChange={onSortingChange}
          header={header}
          leftOffsets={leftOffsets}
          rightOffsets={rightOffsets}
        />
      ))}
    </SCVirtualHeader>
  );
}

function areEqual<TData>(prev: VirtualHeaderRowProps<TData>, next: VirtualHeaderRowProps<TData>) {
  return (
    prev.gridTemplate === next.gridTemplate &&
    prev.leftOffsets === next.leftOffsets &&
    prev.rightOffsets === next.rightOffsets &&
    prev.headers === next.headers
  );
}

export const VirtualHeaderRow = memo(VirtualHeaderRowInner, areEqual) as typeof VirtualHeaderRowInner;
/** luego reviso por que no puedo darle un displayName
 * bueno en realidad se xq no puedo darle un displayName es por con el "as <TData...."
 * ahi estoy sobreescribiendo todo el tipado de la funcion y cuando trato de usar la prop de displayname
 * no me la reconoce, pero si no paso el tipado entonces no me acepta el RowData memoizado
 * que quilombo che
 */
