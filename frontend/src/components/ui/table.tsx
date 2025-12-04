// src/components/ui/table.tsx
import * as React from "react"

export function Table(
  props: React.HTMLAttributes<HTMLTableElement>
) {
  return <table className="w-full text-sm" {...props} />
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <thead className="[&_th]:text-left" {...props} />
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />
}

export function TableRow(
  props: React.HTMLAttributes<HTMLTableRowElement>
) {
  return (
    <tr
      className="border-b border-zinc-200 dark:border-zinc-800"
      {...props}
    />
  )
}

export function TableHead(
  props: React.ThHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <th
      className="h-10 px-4 font-medium text-zinc-600 dark:text-zinc-300"
      {...props}
    />
  )
}

export function TableCell(
  props: React.TdHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <td
      className="p-4 align-middle text-zinc-900 dark:text-zinc-100"
      {...props}
    />
  )
}
