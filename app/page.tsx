"use client"

import { useQuery } from "@tanstack/react-query"

import { Chart, Summary } from "./components/Financial-Statement"
import { Spinner, Transaction, Transactions } from "./components/Transactions"
import { getTransactions } from "./get-transactions"

const calculateStatement = (transactions: Transaction[]) => {
  const statement = transactions.reduce(
    (acc, transaction) => {
      if (transaction.amount < 0) {
        acc.expenses += transaction.amount

        return acc
      }

      acc.income += transaction.amount

      return acc
    },
    { income: 0, expenses: 0 }
  )

  return statement
}

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  })

  if (isPending) return <Spinner />

  const statement = data ? calculateStatement(data) : null

  return (
    <>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        {statement && (
          <Summary incomes={statement.income} expenses={statement.expenses} />
        )}

        {data && <Chart />}

        {data && <Transactions transactions={data} />}
      </main>
    </>
  )
}
