import { ColumnDef } from '@tanstack/react-table';

/** esto para determinar el identificador de la columna, ya que no es requerido
 * siempre poner un id y podamos usar el accessorKey como id,
 * ya sea un string o una funcion
 * @param col - columna de react-table
 */
export function getColumnId<T>(col: ColumnDef<T, any>): string | undefined {
  if ('id' in col && typeof col.id === 'string') return col.id;
  if ('accessorKey' in col && typeof col.accessorKey === 'string') return col.accessorKey;
  return undefined;
}
