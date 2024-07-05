import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  BarChart4Icon,
  CalendarDaysIcon,
  DollarSignIcon,
  LineChartIcon,
} from "lucide-react"
import { green, red, zinc } from "tailwindcss/colors"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { LineChart } from "./charts/line-chart"
import { BarChartCm } from "./charts/bar-chart"
import { WebhookEventsChart } from "../analytics-chart"

export function Summary(props: { incomes: number; expenses: number }) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "brl",
  })

  const total = props.incomes - props.expenses

  return (
    <section className="flex w-full items-center gap-6">
      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Entradas</CardTitle>

          <ArrowUpCircleIcon size={24} className="text-green-400" />
        </CardHeader>

        <CardContent>
          <h1>{currency.format(props.incomes)}</h1>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <WebhookEventsChart
            color={green[400]}
            data={[
              {
                date: new Date("2024-04-17").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-18").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-19").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-20").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-21").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-22").toString(),
                amount: Math.random() * 10,
              },
            ]}
          />
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Saídas</CardTitle>

          <ArrowDownCircleIcon size={24} className="text-red-400" />
        </CardHeader>

        <CardContent>
          <h1>{currency.format(props.expenses)}</h1>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <WebhookEventsChart
            color={red[400]}
            data={[
              {
                date: new Date("2024-04-17").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-18").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-19").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-20").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-21").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-22").toString(),
                amount: Math.random() * 10,
              },
            ]}
          />
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Total</CardTitle>

          <DollarSignIcon size={24} className="text-foreground" />
        </CardHeader>

        <CardContent>
          <h1>{currency.format(total)}</h1>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <WebhookEventsChart
            color={zinc[200]}
            data={[
              {
                date: new Date("2024-04-17").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-18").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-19").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-20").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-21").toString(),
                amount: Math.random() * 10,
              },
              {
                date: new Date("2024-04-22").toString(),
                amount: Math.random() * 10,
              },
            ]}
          />
        </CardFooter>
      </Card>
    </section>
  )
}

export function Chart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center justify-between">
        <Tabs defaultValue="month" className="w-full">
          <TabsList className="border border-border bg-transparent">
            <TabsTrigger value="month" className="gap-2">
              <LineChartIcon size={16} />
              Orçamento
            </TabsTrigger>

            <TabsTrigger value="day" className="gap-2">
              <CalendarDaysIcon size={16} />
              Mês
            </TabsTrigger>

            <TabsTrigger value="Category" className="gap-2">
              <BarChart4Icon size={16} />
              Categorias
            </TabsTrigger>
          </TabsList>

          <TabsContent className="mt-6 w-full" value="month">
            <LineChart />
          </TabsContent>

          <TabsContent className="mt-6 h-[350px] w-full" value="day">
            <BarChartCm />
          </TabsContent>

          <TabsContent className="mt-6 w-full" value="category"></TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  )
}
