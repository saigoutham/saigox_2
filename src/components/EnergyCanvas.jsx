import React, { useRef, useEffect } from 'react'

const EnergyCanvas = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let time = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Flowing energy lines (Demon Slayer breathing technique style)
        const lines = Array.from({ length: 5 }, (_, i) => ({
            offset: i * 1.2,
            hue: 20 + i * 40,  // cycles through orange → yellow → green
            amplitude: 80 + i * 30,
            speed: 0.008 + i * 0.003,
            y: 0.3 + i * 0.12,
        }))

        const animate = () => {
            time += 1
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            lines.forEach((line) => {
                ctx.beginPath()
                ctx.strokeStyle = `hsla(${line.hue + time * 0.2}, 100%, 55%, 0.12)`
                ctx.lineWidth = 2
                ctx.shadowBlur = 30
                ctx.shadowColor = `hsla(${line.hue + time * 0.2}, 100%, 55%, 0.3)`

                const baseY = canvas.height * line.y
                for (let x = 0; x < canvas.width; x += 3) {
                    const y = baseY +
                        Math.sin((x * 0.003) + time * line.speed + line.offset) * line.amplitude +
                        Math.sin((x * 0.007) + time * line.speed * 0.7) * (line.amplitude * 0.3)
                    if (x === 0) ctx.moveTo(x, y)
                    else ctx.lineTo(x, y)
                }
                ctx.stroke()
                ctx.shadowBlur = 0
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="energy-canvas"
        />
    )
}

export default EnergyCanvas
