import styled, { css } from 'styled-components';

interface CellProps {
  $align?: 'left' | 'center' | 'right';
}

export const SCVirtualContainer = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height};
  max-height: 500px;
  min-height: auto;
  overflow-y: auto;
  position: relative;
  background: #fff;
  width: 100%;
  margin-top: 1rem;
  background: #fff;
  border: 1px solid #dee2e6;
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #bababa;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #919191;
  }

  scrollbar-width: thin;
  scrollbar-color: #bababa transparent;

  &:before {
    right: 0;
    bottom: -15px;
  }

  &:after {
    bottom: 0;
    right: -15px;
  }
`;

export const SCVirtualHeader = styled.div<{ $gridTemplate: string }>`
  position: sticky;
  top: 0;
  width: 100%;
  min-width: 100%;
  z-index: 1;
  display: grid;
  grid-template-columns: ${({ $gridTemplate }) => $gridTemplate};
`;

export const SCVirtualHeaderCell = styled.div<CellProps & { $isPinned: boolean }>`
  position: relative;
  background-color: var(--gray-gainsboro);
  text-align: ${({ $align }) => $align ?? 'left'};
  padding: 6px 8px;
  font-size: 14px;
  color: rgb(105, 108, 112);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:last-child {
    border-right: none;
  }
  ${({ $isPinned }) =>
    $isPinned &&
    css`
      z-index: 2;
    `}
`;

export const SCVirtualRow = styled.div<{ $gridTemplate?: string; $rowHeight?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $rowHeight }) => $rowHeight || 35}px;
  min-width: 100%;
  display: grid;
  grid-template-columns: ${({ $gridTemplate }) => $gridTemplate};
`;

export const SCVirtualTBody = styled.div`
  position: relative;
`;

export const SCVirtualDataCell = styled.div<CellProps>`
  text-align: ${({ $align }) => $align ?? 'left'};
  border-bottom: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 6px 8px;
  color: #212529;
  font-size: 13px;
  ${({ style }) =>
    style?.position === 'sticky' &&
    `
    background: var(--gray-light);
  `}
`;
//-- esto lo probamos despues
//   debajo del background, por que hace el shadow solo a la celda
// box-shadow: ${
//   style.left !== undefined
//     ? '2px 0 4px -2px rgba(0,0,0,0.3)' // sombra a la derecha si pinned left
//     : style.right !== undefined
//     ? '-2px 0 4px -2px rgba(0,0,0,0.3)' // sombra a la izquierda si pinned right
//     : 'none'
// };

export const SCVirutalWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SCSortIcon = styled.svg`
  cursor: pointer;
`;
