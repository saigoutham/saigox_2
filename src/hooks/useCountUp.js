import { useState, useRef, useEffect } from 'react'

const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                const startTime = Date.now()
                const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''))
                if (isNaN(numericEnd)) { setCount(0); return }
                const step = () => {
                    const progress = Math.min((Date.now() - startTime) / duration, 1)
                    const eased = 1 - Math.pow(1 - progress, 3)
                    setCount(Math.round(numericEnd * eased))
                    if (progress < 1) requestAnimationFrame(step)
                }
                requestAnimationFrame(step)
            }
        }, { threshold: 0.3 })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration])

    return { count, ref }
}

export default useCountUp
