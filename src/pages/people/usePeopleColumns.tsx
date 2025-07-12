import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PersonSchema } from '../../data.types';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<PersonSchema>();
/**
 *  ahora nuestro useTableColumn seria como algo asi,
 * es basicamente la configu8racion de cada columna.
 * @returns {{ columns: ColumnDef<PersonSchema, any>[] }}
 */

interface PeopleColumns {
  columns: ColumnDef<PersonSchema, any>[];
}

export function usePeopleColumns(): PeopleColumns {
  const columns = useMemo<PeopleColumns['columns']>(
    () => [
      columnHelper.accessor(
        (row) => ({
          firstName: row.firstName,
          city: row.address.city,
          street: row.address.street,
          zip: row.address.zip
        }),
        {
          /** el id es obligatorio solo si quiero pasar una funcion como accesor en vez de un string */
          id: 'firstName',
          header: () => <span>First Name </span>,
          size: 300,
          enableSorting: true,
          meta: {
            userDefinedSize: true,
            align: 'left',
            pinned: 'left',
            sortOptions: [
              { label: 'First Name', value: 'firstName' },
              { label: 'City', value: 'city' }
            ]
          },
          cell: (info) => {
            const { city, street, firstName, zip } = info.getValue();
            return (
              <div>
                <strong>{firstName}</strong>
                <small>
                  {city} — {street} - {zip}
                </small>
              </div>
            );
          }
        }
      ),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        meta: { toggleable: true, visible: true },
        enableSorting: true
      }),
      columnHelper.accessor('age', {
        header: 'Age',
        size: 75,
        meta: { userDefinedSize: true, toggleable: true },
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('progress', {
        header: 'Progress',
        size: 100,
        meta: { userDefinedSize: true, toggleable: true, visible: true, align: 'center' }
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        enableSorting: true
      }),
      columnHelper.accessor('address.zip', {
        header: 'Zip ',
        enableSorting: true
      }),
      columnHelper.accessor('visits', {
        header: 'Visits',
        size: 75,
        meta: { userDefinedSize: true, pinned: 'right' }
      })
    ],
    []
  );

  return { columns };
}
