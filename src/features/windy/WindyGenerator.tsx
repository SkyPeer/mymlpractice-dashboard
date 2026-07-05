import { useRef, memo, type RefObject } from 'react'

const WindyGenerator = () => {
    const spinRef = useRef<SVGGElement>(null)

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content: chart + turbine side by side */}
            <div className="flex flex-1 gap-0 overflow-hidden" style={{ minHeight: 500 }}>

                {/* Left: chart panel */}
                {/* Right: turbine */}
                <div className="relative flex-1 overflow-hidden">
                    <Turbine x={50} baseY={78} scale={1.3} spinRef={spinRef} />
                </div>
            </div>

            <style>{`
                @keyframes spinBlade {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

type TurbineProps = {
    x: number
    baseY: number
    scale: number
    spinRef: RefObject<SVGGElement | null>
}

const Turbine = memo(({ x, baseY, scale, spinRef }: TurbineProps) => {
    const W = 320 * scale
    const H = 420 * scale
    // key coordinates (in SVG space, origin top-left of SVG)
    const cx = W / 2          // rotor center X
    const cy = H * 0.28       // rotor center Y
    const towerTopX = cx
    const towerTopY = cy + 8 * scale
    const towerBotX = cx
    const towerBotY = H * 0.92
    const towerTopW = 10 * scale
    const towerBotW = 22 * scale
    const bladeLen = 105 * scale
    const hubR = 9 * scale
    const nacelleW = 40 * scale
    const nacelleH = 16 * scale

    const stroke = 'var(--primary)'
    const strokeDim = 'var(--muted-foreground)'
    const strokeDash = '5 4'
    const strokeDotted = '2 5'
    const sw = 1.2 * scale

    return (
        <div
            className="absolute"
            style={{
                left: `${x}%`,
                bottom: `${100 - baseY}%`,
                transform: 'translateX(-50%)',
            }}
        >
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible">
                {/* Center-line vertical */}
                <line x1={cx} y1={cy - bladeLen - 14 * scale} x2={cx} y2={towerBotY + 6 * scale}
                    stroke={strokeDim} strokeWidth={0.7} strokeDasharray={strokeDotted} />

                {/* Tower — rounded trapezoid via path */}
                <path
                    d={`
                        M ${towerTopX - towerTopW / 2 + 4 * scale},${towerTopY}
                        Q ${towerTopX - towerTopW / 2},${towerTopY} ${towerTopX - towerTopW / 2},${towerTopY + 6 * scale}
                        L ${towerBotX - towerBotW / 2},${towerBotY - 8 * scale}
                        Q ${towerBotX - towerBotW / 2},${towerBotY} ${towerBotX - towerBotW / 2 + 10 * scale},${towerBotY}
                        L ${towerBotX + towerBotW / 2 - 10 * scale},${towerBotY}
                        Q ${towerBotX + towerBotW / 2},${towerBotY} ${towerBotX + towerBotW / 2},${towerBotY - 8 * scale}
                        L ${towerTopX + towerTopW / 2},${towerTopY + 6 * scale}
                        Q ${towerTopX + towerTopW / 2},${towerTopY} ${towerTopX + towerTopW / 2 - 4 * scale},${towerTopY}
                        Z
                    `}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={sw}
                    strokeDasharray={strokeDash}
                    strokeLinejoin="round"
                />

                {/* Base plate */}
                <line
                    x1={towerBotX - towerBotW * 1.4} y1={towerBotY}
                    x2={towerBotX + towerBotW * 1.4} y2={towerBotY}
                    stroke={stroke} strokeWidth={sw * 1.2}
                />
                {/* Base tick marks */}
                {[-1, 0, 1].map(i => (
                    <line key={i}
                        x1={towerBotX + i * towerBotW * 0.9} y1={towerBotY}
                        x2={towerBotX + i * towerBotW * 0.9 - 5 * scale} y2={towerBotY + 8 * scale}
                        stroke={stroke} strokeWidth={0.8} />
                ))}

                {/* Nacelle — dotted rect */}
                <rect
                    x={cx - nacelleW * 0.2} y={cy - nacelleH / 2}
                    width={nacelleW} height={nacelleH}
                    rx={nacelleH / 2}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={sw}
                    strokeDasharray={strokeDotted}
                />

                {/* Dimension line — rotor diameter */}
                <line x1={cx - bladeLen - 12 * scale} y1={cy}
                    x2={cx + bladeLen + 12 * scale} y2={cy}
                    stroke={strokeDim} strokeWidth={0.6} strokeDasharray="3 6" />
                <line x1={cx - bladeLen - 12 * scale} y1={cy - 6 * scale}
                    x2={cx - bladeLen - 12 * scale} y2={cy + 6 * scale}
                    stroke={strokeDim} strokeWidth={0.9} />
                <line x1={cx + bladeLen + 12 * scale} y1={cy - 6 * scale}
                    x2={cx + bladeLen + 12 * scale} y2={cy + 6 * scale}
                    stroke={strokeDim} strokeWidth={0.9} />

                {/* Spinning group */}
                <g
                    ref={spinRef}
                    style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        animation: 'spinBlade var(--spin-duration, 2.4s) linear infinite',
                    }}
                >
                    {/* 3 blades as schematic outlines */}
                    {[0, 120, 240].map((deg) => {
                        const bw = bladeLen
                        const bh = 8 * scale
                        return (
                            <g key={deg} transform={`rotate(${deg}, ${cx}, ${cy})`}>
                                {/* Blade outline (dashed) */}
                                <rect
                                    x={cx + hubR} y={cy - bh / 2}
                                    width={bw} height={bh}
                                    rx={bh / 2}
                                    fill="none"
                                    stroke={stroke}
                                    strokeWidth={sw}
                                    strokeDasharray={strokeDash}
                                />
                                {/* Blade center-line */}
                                <line
                                    x1={cx + hubR} y1={cy}
                                    x2={cx + hubR + bw} y2={cy}
                                    stroke={strokeDim} strokeWidth={0.6} strokeDasharray={strokeDotted}
                                />
                                {/* Tip tick */}
                                <line
                                    x1={cx + hubR + bw - 2} y1={cy - bh * 0.8}
                                    x2={cx + hubR + bw - 2} y2={cy + bh * 0.8}
                                    stroke={stroke} strokeWidth={0.8}
                                />
                            </g>
                        )
                    })}

                    {/* Hub circle */}
                    <circle cx={cx} cy={cy} r={hubR}
                        fill="none" stroke={stroke} strokeWidth={sw} strokeDasharray={strokeDotted} />
                    {/* Hub cross */}
                    <line x1={cx - hubR} y1={cy} x2={cx + hubR} y2={cy}
                        stroke={strokeDim} strokeWidth={0.7} />
                    <line x1={cx} y1={cy - hubR} x2={cx} y2={cy + hubR}
                        stroke={strokeDim} strokeWidth={0.7} />
                </g>
            </svg>
        </div>
    )
})

export default WindyGenerator
