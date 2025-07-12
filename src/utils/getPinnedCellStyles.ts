type Pinned = 'left' | 'right' | false;

interface GetPinnedCellStyleProps {
  id: string;
  pinned: Pinned;
  leftOffsets: Record<string, number>;
  rightOffsets: Record<string, number>;
}

export function getPinnedCellStyle({
  id,
  pinned,
  leftOffsets,
  rightOffsets
}: GetPinnedCellStyleProps): React.CSSProperties | undefined {
  if (pinned !== 'left' && pinned !== 'right') return;

  const offset = pinned === 'left' ? leftOffsets[id] : rightOffsets[id];

  if (offset == null) return;

  return {
    position: 'sticky',
    [pinned]: `${offset}px`,
    zIndex: 1
  };
}
