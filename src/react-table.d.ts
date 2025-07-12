import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends unknown, TValue> {
    /** flag to define the static width of a column */
    userDefinedSize?: boolean;

    /** Align column content (simple templates) */
    align?: 'left' | 'center' | 'right';

    /** to pin Columns (sticky column) */
    pinned?: 'left' | 'right';

    /** if a columns can be show/hide (client) */
    toggleable?: boolean;

    /** initialState to show/hide columns (business) */
    visible?: boolean;

    /** if we need more than 1 items to sort  */
    sortOptions?: { label: string; value: string }[];
  }
}
