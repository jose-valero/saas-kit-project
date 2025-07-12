// utils/extractColumnPinning.ts
import { ColumnDef } from '@tanstack/react-table';

/** basicamente es un pasamano para formatear nuestro estado inicla de las columnas pinned (sticky) */
export function extractColumnPinning<T>(columns: ColumnDef<T, any>[]) {
  const left: string[] = [];
  const right: string[] = [];

  columns.forEach((col) => {
    const pinned = col.meta?.pinned;
    const id = (col as any).id ?? (col as any).accessorKey;

    if (!id) return;

    if (pinned === 'left') left.push(id);
    if (pinned === 'right') right.push(id);
  });

  return { left, right };
}
