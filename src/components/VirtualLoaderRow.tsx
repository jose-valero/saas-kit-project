import { SCVirtualDataCell, SCVirtualRow } from '../styles/styles';

interface VirtualLoaderRowProps {
  isFetchingNextPage: boolean;
  start: number;
}

export const VirtualLoaderRow = ({ isFetchingNextPage, start }: VirtualLoaderRowProps) => {
  return (
    <SCVirtualRow key='loader' style={{ transform: `translateY(${Math.floor(start)}px)` }}>
      <SCVirtualDataCell>{isFetchingNextPage ? 'Loading…' : ''}</SCVirtualDataCell>
    </SCVirtualRow>
  );
};
