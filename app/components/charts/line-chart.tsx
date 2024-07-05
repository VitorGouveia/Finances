"use client"

import {
  Label,
  Line,
  LineChart as Chart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

export const LineChart = () => {
  return (
    <ResponsiveContainer width="100%" className="w-full" height={350}>
      <Chart className="h-full w-full">
        <Line
          type="linear"
          data={[
            { date: new Date("2024-04-9").toString(), amount: 10 },
            { date: new Date("2024-04-10").toString(), amount: 10 },
            { date: new Date("2024-04-11").toString(), amount: 5 },
            { date: new Date("2024-04-12").toString(), amount: 7 },
            { date: new Date("2024-04-13").toString(), amount: 9 },
            { date: new Date("2024-04-14").toString(), amount: 12 },
          ]}
          dataKey="amount"
        />

        <XAxis dataKey="x" />
        <YAxis />

        <ReferenceLine
          alwaysShow
          y={10}
          label={<Label value="Budget" position={"top"} />}
          className="text-white"
          strokeDasharray="5 5"
        />
      </Chart>
    </ResponsiveContainer>
  )
}
