import styled, { CSSProperties } from 'styled-components';

export const SCActionsContainer = styled.div`
  height: 25px;
  width: auto;
  position: absolute;
  top: -25px;
  right: 12px;
  border: 1px solid var(--gray-gainsboro);
  z-index: 101;
  background-color: #fff;
  overflow: auto;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  border-radius: 4px 4px 0 0;
  border-bottom: none;
`;

export const SCGenericFloatingContainer = styled.div<{
  $backgroundColor?: CSSProperties['backgroundColor'];
  $width?: CSSProperties['width'];
  $minWidth?: CSSProperties['minWidth'];
  $maxWidth?: CSSProperties['maxWidth'];
  $maxHeight?: CSSProperties['maxHeight'];
  $padding?: CSSProperties['padding'];
  $boxShadowOpacity?: string;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#fff'};
  padding: ${({ $padding }) => $padding || '1rem'};
  position: relative;
  border-radius: 8px;
  width: ${({ $width }) => $width || '100%'};
  min-width: ${({ $minWidth }) => $minWidth || '525px'};
  max-width: ${({ $maxWidth }) => $maxWidth || '652px'};
  box-shadow: ${({ $boxShadowOpacity }) => `1px 2px 12px 2px rgba(171, 171, 171, ${$boxShadowOpacity || '0.25'})`};
  max-height: ${({ $maxHeight }) => $maxHeight || '800px'};
  overflow-y: auto;
  &:focus-visible {
    outline: none;
  }
`;
