import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { IGraphProps } from '../../types'

Chart.register(...registerables)

const ChartComp: React.FC<IGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const now = new Date()
    const last7DaysData = data.filter((item) => {
      const itemDate = new Date(item.date)
      return itemDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
    })

    const labels = last7DaysData.map((item) => new Date(item.time).toLocaleDateString())
    const prices = last7DaysData.map((item) => parseFloat(item.priceUsd))

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price (USD)',
            },
          },
        },
      },
    })
  }, [data])

  return <canvas ref={chartRef} />
}

export default ChartComp
