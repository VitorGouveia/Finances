import { Transaction } from "./components/Transactions"

const tr: Transaction = {
  id: "1",
  name: "Taco Bell",
  type: "alimentos",
  amount: -8100,
  date: new Date(),
}

const transactions: Transaction[] = [
  tr,
  {
    id: "2",
    name: "Salário",
    type: "CLT",
    amount: 1000,
    date: new Date(),
  },
]

export async function getTransactions() {
  return transactions
}
