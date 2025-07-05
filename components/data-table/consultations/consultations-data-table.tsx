"use client";

import * as React from "react";

import {
  ColumnDef,
  // ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
// import AddPatientLayout from "@/app/(root)/dashboard/manage/patients/_components/AddPatientLayout";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: (currentUser: UserType | undefined) => ColumnDef<TData, TValue>[];
  data: TData[];
  // query1?: string;
  showCreate?: boolean;
  additionalClassName?: string;
  currentUser?: UserType;
}

export function DataTable<TData, TValue>({
  columns: columnsDef,
  data,
  // query1,
  showCreate = false,
  additionalClassName = "",
  currentUser,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
  //   []
  // );
  const [filtering, setFiltering] = React.useState("");

  // Generate the columns using the provided function and currentUserRole
  const computedColumns = React.useMemo(
    () => columnsDef(currentUser),
    [columnsDef, currentUser]
  );

  const table = useReactTable({
    data,
    columns: computedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setFiltering,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      // columnFilters,
      globalFilter: filtering,
    },
    initialState: {
      pagination: {
        pageSize: 5, // Set to show 3 records per page
      },
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between gap-2">
        <Input
          placeholder={`Search...`}
          // value={
          //   (table.getColumn(query1 as string)?.getFilterValue() as string) ??
          //   ""
          // }
          // onChange={(event) =>
          //   table
          //     .getColumn(query1 as string)
          //     ?.setFilterValue(event.target.value)
          // }
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        {/* {showCreate && <AddPatientLayout />} */}
        {showCreate && (
          <Link
            href={"/dashboard/manage/patients/create-patient"}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-all cursor-pointer p-2 px-5 min-w-32 rounded-md text-white dark:text-black text-sm"
          >
            <PlusCircleIcon className="w-4 h-4" /> New Consultation
          </Link>
        )}
      </div>
      <div
        className={`rounded-md bg-light-100 dark:bg-dark-100 ${additionalClassName}`}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={computedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
