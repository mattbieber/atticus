import React, { useMemo, useState, HTMLProps } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'
import type { Song } from '@/context/models'
import { useSongsContext } from '@/context/store'
   

    function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!)
  
    React.useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }

export const PlaylistGrid = () => {
    const { songs, artists, albums } = useSongsContext()
    const [sorting, setSorting] = useState<SortingState>([])
    console.log(songs)
    console.log(artists)
    const columns = useMemo<ColumnDef<Song>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <div className="px-1">
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                accessorKey: 'title',
                cell: (info) => info.getValue(),
                header: () => <span>Title</span>,
            },
            {
                accessorKey: 'length',
                cell: (info) => info.getValue(),
                header: () => <span>Length</span>,
            },

            {
                accessorFn: (row) => artists[row.artistId],
                id: 'artist',
                cell: (info) => info.getValue(),
                header: () => <span>Artist</span>,
                sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
            },
            {
                accessorFn: (row) => albums[row.albumId],
                id: 'album',
                cell: (info) => info.getValue(),
                header: () => <span>Album</span>,
                sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
            },
        ],
        [artists, albums],
    )

    const table = useReactTable({
        columns,
        data: songs,
        debugTable: false,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), //client-side sorting
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    //access sorting state from the table instance
    console.log(table.getState().rowSelection)

    return (
        <div className="p-2">
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() ===
                                                          'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() ===
                                                                'desc'
                                                              ? 'Sort descending'
                                                              : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                                {{
                                                    asc: ' ▴',
                                                    desc: ' ▾',
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 50)
                        .map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className=" w-40 mt-10 cursor-pointer rounded px-5 py-2.5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 text-white hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all ease-out duration-300">
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    Crreate Playlist
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                </div>
        </div>
    )
}
