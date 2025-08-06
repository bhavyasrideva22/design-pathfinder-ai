import { cn } from "@/lib/utils"

interface RadarChartData {
  label: string
  value: number
  maxValue?: number
}

interface RadarChartProps {
  data: RadarChartData[]
  size?: number
  className?: string
}

export function RadarChart({ data, size = 300, className }: RadarChartProps) {
  const center = size / 2
  const radius = size * 0.35
  const levels = 5

  // Create points for the polygon
  const points = data.map((item, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
    const normalizedValue = item.value / (item.maxValue || 100)
    const x = center + Math.cos(angle) * radius * normalizedValue
    const y = center + Math.sin(angle) * radius * normalizedValue
    return { x, y, angle, label: item.label, value: item.value }
  })

  // Create grid lines
  const gridLines = Array.from({ length: levels }, (_, i) => {
    const levelRadius = (radius * (i + 1)) / levels
    const levelPoints = data.map((_, index) => {
      const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
      const x = center + Math.cos(angle) * levelRadius
      const y = center + Math.sin(angle) * levelRadius
      return `${x},${y}`
    })
    return levelPoints.join(' ')
  })

  // Create axis lines
  const axisLines = data.map((_, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
    const x = center + Math.cos(angle) * radius
    const y = center + Math.sin(angle) * radius
    return { x1: center, y1: center, x2: x, y2: y }
  })

  // Create label positions
  const labels = data.map((item, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2
    const labelRadius = radius * 1.15
    const x = center + Math.cos(angle) * labelRadius
    const y = center + Math.sin(angle) * labelRadius
    return { x, y, label: item.label, value: item.value }
  })

  return (
    <div className={cn("relative", className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {Array.from({ length: levels }, (_, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={(radius * (i + 1)) / levels}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        ))}

        {/* Data polygon */}
        <polygon
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="hsl(var(--primary) / 0.2)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--primary-foreground))"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {labels.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm font-medium fill-foreground"
            style={{
              textAnchor: label.x < center ? 'end' : label.x > center ? 'start' : 'middle'
            }}
          >
            {label.label}
          </text>
        ))}
      </svg>
    </div>
  )
}