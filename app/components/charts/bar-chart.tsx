"use client"

import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jan/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Fev/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep/24",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export const BarChartCm = () => {
  return (
    <ResponsiveContainer width="100%" className="w-full" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
      {/* Diagonal line */}
    </ResponsiveContainer>
  )
}
