interface LotusProps {
  size?: number
  className?: string
}

export default function Lotus({ size = 200, className = '' }: LotusProps) {
  const outerPetal = "M 100 100 C 120 78 114 32 100 20 C 86 32 80 78 100 100"
  const midPetal   = "M 100 100 C 116 82 110 50 100 40 C 90 50 84 82 100 100"
  const innerPetal = "M 100 100 C 112 86 108 66 100 58 C 92 66 88 86 100 100"

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* 12 outer petals */}
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={`o${i}`}
          d={outerPetal}
          transform={`rotate(${i * 30},100,100)`}
          fill="#D4A23A"
          opacity="0.12"
        />
      ))}
      {/* 8 mid petals, offset 22.5° */}
      {Array.from({ length: 8 }, (_, i) => (
        <path
          key={`m${i}`}
          d={midPetal}
          transform={`rotate(${i * 45 + 22.5},100,100)`}
          fill="#D4A23A"
          opacity="0.30"
        />
      ))}
      {/* 6 inner petals */}
      {Array.from({ length: 6 }, (_, i) => (
        <path
          key={`i${i}`}
          d={innerPetal}
          transform={`rotate(${i * 60},100,100)`}
          fill="#D4A23A"
          opacity="0.58"
        />
      ))}
      {/* Seedpod */}
      <circle cx="100" cy="100" r="13" fill="#D4A23A" opacity="0.78" />
      <circle cx="100" cy="100" r="7"  fill="#F5E6C8" opacity="0.38" />
      {/* Stamen ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * 45 * Math.PI) / 180
        return (
          <circle
            key={`s${i}`}
            cx={100 + 9 * Math.sin(a)}
            cy={100 - 9 * Math.cos(a)}
            r="1.5"
            fill="#F5E6C8"
            opacity="0.52"
          />
        )
      })}
    </svg>
  )
}
