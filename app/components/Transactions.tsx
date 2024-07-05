"use client"

import { CalendarIcon, PlusIcon } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { DataTable } from "@/components/data-table"
import { columns } from "@/components/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { getTransactions } from "../get-transactions"

export const Spinner = (props: { absolute?: boolean }) => {
  return (
    <div
      className={`${
        props.absolute ? "absolute inset-0 m-auto" : ""
      }  flex w-full items-center justify-center`}
    >
      <svg
        className="text-zinc-300"
        viewBox="0 0 2400 2400"
        width={18}
        height={18}
      >
        <g
          stroke-width={200}
          stroke-linecap="round"
          stroke="currentColor"
          fill="none"
        >
          <path d="M1200 600L1200 100"></path>
          <path opacity={0.5} d="M1200 2300L1200 1800"></path>
          <path opacity={0.917} d="M900 680.4L650 247.4"></path>
          <path opacity={0.417} d="M1750 2152.6L1500 1719.6"></path>
          <path opacity={0.833} d="M680.4 900L247.4 650"></path>
          <path opacity={0.333} d="M2152.6 1750L1719.6 1500"></path>
          <path opacity={0.75} d="M600 1200L100 1200"></path>
          <path opacity={0.25} d="M2300 1200L1800 1200"></path>
          <path opacity={0.667} d="M680.4 1500L247.4 1750"></path>
          <path opacity={0.167} d="M2152.6 650L1719.6 900"></path>
          <path opacity={0.583} d="M900 1719.6L650 2152.6"></path>
          <path opacity={0.083} d="M1750 247.4L1500 680.4"></path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
            values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
            dur="0.83333s"
            begin="0s"
            repeatCount="indefinite"
            calcMode="discrete"
          ></animateTransform>
        </g>
      </svg>
    </div>
  )
}

const AddTransactionForm = (props: { onSubmit: () => void }) => {
  const [date, setDate] = useState<Date>()

  type Form = {
    name: string
    amount: number
  }

  const { register, handleSubmit } = useForm<Form>()

  const queryClient = useQueryClient()
  const { mutateAsync: createExpense } = useMutation({
    mutationFn: async (data: Form & { date: string }) => ({
      id: crypto.randomUUID(),
      name: data.name,
      amount: Number(data.value),
      date: new Date(data.date),
    }),
    onSuccess: (data) => {
      const cached =
        queryClient.getQueryData<Transaction[]>(["transactions"]) || []

      queryClient.setQueryData(["transactions"], [...cached, data])
    },
  })

  const addExpense: SubmitHandler<Form> = async ({ name, value }) => {
    if (!date) return

    await createExpense({
      name,
      value,
      date: date.toString(),
    })

    props.onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit(addExpense)}
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
        Add Expense <PlusIcon size={16} />
      </Button>
    </form>
  )
}

export type Transaction = {
  id: string

  name: string
  type: string
  amount: number

  date: Date
}

export const Transactions = (props: { transactions: Transaction[] }) => {
  const [modal, setModal] = useState<boolean>(false)

  const { isPending, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  })

  if (isPending) return <Spinner />

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>

        <Dialog open={modal} onOpenChange={setModal}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              Add <PlusIcon size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-[400px]">
            <DialogHeader>
              <DialogTitle>New Expense</DialogTitle>
            </DialogHeader>

            <AddTransactionForm onSubmit={() => setModal(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {data && <DataTable data={data} columns={columns} />}
      </CardContent>
    </Card>
  )
}
