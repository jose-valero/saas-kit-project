import { ColumnDef } from '@tanstack/react-table';
import { getColumnId } from './getColumnId';

/**
 * Genera el estado inicial de visibilidad de columnas basado en su config `meta`.
 *
 * Reglas:
 * - Si `visible` es `false`, la columna **no debe mostrarse** (control de negocio).
 * - Si `toggleable` es `false`, la columna **debe estar visible siempre** y **no puede ocultarse**.
 * - Si no se define nada, se considera visible y editable por el usuario.
 *
 * Si una columna tiene `visible: false` pero `toggleable: true`, se lanza un warning ya que esa combinación no es válida.
 *
 * @param columns - Array de definiciones de columnas de react-table.
 * @returns Un objeto con el estado de visibilidad por id de columna.
 */
export function getColumnVisibility<T>(columns: ColumnDef<T, any>[]) {
  const visibility: Record<string, boolean> = {};

  columns.forEach((col) => {
    const id = getColumnId(col);

    if (!id) return;

    const meta = col.meta || {};

    if (meta.visible === false) {
      // Reglas de negocio indican que esta columna debe estar oculta y no editable
      if (meta.toggleable !== false) {
        console.warn(
          `la Columna "${id}" tiene "visible: false" pero "toggleable: true". Esto no tiene sentido y sera tratado como "toggleable: false".`
        );
      }
      visibility[id] = false;
    } else if (meta.toggleable === false) {
      // Columna fija, siempre visible
      visibility[id] = true;
    } else {
      // Por defecto es visible y editable
      visibility[id] = true;
    }
  });

  return visibility;
}
