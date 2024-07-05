"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef, Row } from "@tanstack/react-table"
import { format } from "date-fns"
import { CalendarIcon, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { cache, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Transaction } from "@/app/components/Transactions"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Form = {
  name: string
  value: number
  type: string
}

function Actions({ row }: { row: Row<Transaction> }) {
  const queryClient = useQueryClient()
  const transactionRow = row.original

  const [date, setDate] = useState<Date | undefined>(transactionRow.date)
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      name: transactionRow.name,
      value: transactionRow.amount,
    },
  })

  const handleDelete = () => {
    queryClient.setQueryData<Transaction[]>(
      ["transactions"],
      (transactions) => {
        return transactions?.filter(
          (transaction) => transaction.id !== transactionRow.id
        )
      }
    )
  }

  const { mutateAsync } = useMutation({
    mutationFn: async (
      data: Form & { date: string }
    ): Promise<Transaction> => ({
      id: transactionRow.id,
      name: data.name,
      amount: data.value,
      date: new Date(data.date),
      type: data.type,
    }),
    onSuccess: (newTransaction) => {
      const cached =
        queryClient.getQueryData<Transaction[]>(["transactions"]) || []

      const index = cached.findIndex(
        (transaction) => transaction.id === newTransaction.id
      )

      cached.splice(index, 1, newTransaction)

      queryClient.setQueryData(["transactions"], [...structuredClone(cached)])
    },
  })

  const editExpense: SubmitHandler<Form> = async (props) => {
    if (!date) return

    await mutateAsync({
      ...props,
      date: date.toString(),
    })

    setOpen(false)
  }

  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem className="gap-2">
              <Edit size={16} /> Edit
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleDelete}
            className="gap-2 hover:!bg-destructive/30"
          >
            <Trash2 size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(editExpense)}
          className="mt-4 flex flex-col gap-4"
        >
          <Input type="text" placeholder="Name" {...register("name")} />
          <Input type="number" placeholder="Value" {...register("value")} />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button type="submit" className="gap-2">
            Edit Expense <Edit size={16} />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "hidden",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(row.getValue("date"))

      return formatted
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: Actions,
  },
]
