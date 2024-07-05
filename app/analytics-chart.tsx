"use client"

import { useTheme } from "next-themes"
import { useMemo } from "react"
import { subDays, addDays, format } from "date-fns"
import Chart from "react-apexcharts"
import { gray, teal } from "tailwindcss/colors"

interface WebhookEventsChartProps {
  data: {
    date: string
    amount: number
  }[]
  color: string
  width?: string
  height?: string
}

export function WebhookEventsChart({
  data,
  color,
  height,
  width,
}: WebhookEventsChartProps) {
  const { resolvedTheme } = useTheme()

  const chartData = useMemo(() => {
    const dates = []
    const values = []

    const sevenDaysAgo = subDays(new Date(), 7)

    for (let i = 1; i <= 7; i++) {
      const refDate = addDays(sevenDaysAgo, i)
      const refDateFormatted = format(refDate, "yyyy-MM-dd")

      const amountOnDate = data.find(
        (item) => format(item.date, "yyyy-MM-dd") === refDateFormatted
      )

      dates.push(format(refDate, "MMMM d"))
      values.push(amountOnDate ? amountOnDate.amount : 0)
    }

    return { dates, values }
  }, [data])

  return (
    <Chart
      type="area"
      width={width || 140}
      height={height || 24}
      options={{
        chart: {
          id: "webhook-events-amount-chart",
          toolbar: {
            show: false,
          },
          parentHeightOffset: 0,
          sparkline: {
            enabled: true,
          },
        },
        grid: {
          show: false,
          padding: {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
          },
        },
        tooltip: {
          theme: resolvedTheme,
          style: {
            fontFamily: "Inter",
            fontSize: "11px",
          },
          y: {
            formatter: (value) => Math.round(value).toString(),
          },
        },
        colors: [color],
        stroke: {
          curve: "smooth",
          width: 2,
        },
        fill: {
          gradient:
            resolvedTheme === "light"
              ? {
                  opacityFrom: 0.8,
                  opacityTo: 0.4,
                }
              : {
                  opacityFrom: 0.4,
                  opacityTo: 0.1,
                },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          categories: chartData.dates,
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      }}
      series={[
        {
          name: "Valor",
          data: chartData.values,
        },
      ]}
    />
  )
}
