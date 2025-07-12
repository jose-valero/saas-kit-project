import { SCVirtualTBody } from '../styles/styles';
import { VirtualItem } from '@tanstack/react-virtual';
import { VirtualRow } from './VirtualRow';
import { VirtualLoaderRow } from './VirtualLoaderRow';
import { Row } from '@tanstack/react-table';

interface VirtualBodyProps<TData> {
  items: VirtualItem[];
  rowVirtualizer: {
    getTotalSize: () => number;
  };
  dataLength: number;
  isFetchingNextPage: boolean;
  gridTemplate: string;
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
  rowHeight: number;
  rows: Row<TData>[];
}

export function VirtualBody<TData>({
  items,
  rowVirtualizer,
  dataLength,
  isFetchingNextPage,
  gridTemplate,
  leftOffsets,
  rightOffsets,
  rowHeight,
  rows
}: VirtualBodyProps<TData>) {
  return (
    <SCVirtualTBody style={{ height: rowVirtualizer.getTotalSize() }}>
      {items.map((vRow: VirtualItem) => {
        if (vRow.index === dataLength) {
          return <VirtualLoaderRow key='loader' isFetchingNextPage={isFetchingNextPage} start={vRow.start} />;
        }

        const rowModel = rows[vRow.index];
        return (
          <VirtualRow
            key={rowModel.id}
            start={vRow.start}
            rowModel={rowModel}
            gridTemplate={gridTemplate}
            leftOffsets={leftOffsets}
            rightOffsets={rightOffsets}
            rowHeight={rowHeight}
          />
        );
      })}
    </SCVirtualTBody>
  );
}
