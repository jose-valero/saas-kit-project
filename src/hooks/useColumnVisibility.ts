import { useState } from 'react';
import type { ColumnDef, VisibilityState, Updater } from '@tanstack/react-table';
import { getColumnVisibility } from '../utils/getColumnVisibility';

interface PersistedVisibilityProps<T> {
  columns: ColumnDef<T, any>[];
  storageKey: string;
}

/**
 * Hook para manejar la visibilidad de columnas combinando:
 * - lo que el usuario haya guardado en localStorage (client)
 * - con la lógica de negocio (visible: false, toggleable: false) (backend)
 *
 * La lógica de negocio manda. Si una columna tiene:
 * - `visible: false` → siempre estará oculta, aunque esté guardada como visible
 * - `toggleable: false` → siempre estará visible, y no se podrá ocultar
 *
 * @param columns - Columnas de la tabla (ColumnDef[])
 * @param storageKey - Key para persistir visibilidad en localStorage
 *
 * @returns [state, update] - el estado actual de visibilidad y su setter
 */
export function useColumnVisibility<T>({
  columns,
  storageKey
}: PersistedVisibilityProps<T>): [VisibilityState, (updater: Updater<VisibilityState>) => void] {
  const defaultVisibility = getColumnVisibility(columns); // lógica del sistema

  const [visibility, setVisibility] = useState<VisibilityState>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const storedVisibility = stored ? (JSON.parse(stored) as VisibilityState) : {};

      const merged = Object.keys(defaultVisibility).reduce((acc, key) => {
        // Si por lógica de negocio debe estar oculta, gana esa
        if (defaultVisibility[key] === false) {
          acc[key] = false;
        } else {
          // Si no, dejamos lo que esté en localStorage (si hay), o true por defecto
          acc[key] = storedVisibility[key] ?? true;
        }
        return acc;
      }, {} as VisibilityState);

      return merged;
    } catch {
      return defaultVisibility;
    }
  });

  const update: (updater: Updater<VisibilityState>) => void = (updater) => {
    setVisibility((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      try {
        localStorage.setItem(storageKey, JSON.stringify(newState));
      } catch {}
      return newState;
    });
  };

  return [visibility, update];
}
