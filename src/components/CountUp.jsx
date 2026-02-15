import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CountUp = ({ value, duration = 2, delay = 0, suffix = '', prefix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0)
    const elementRef = useRef(null)
    const hasAnimated = useRef(false)

    // Process the input value to extract the number
    const numericMatch = value.toString().match(/([\d.]+)/)
    const targetValue = numericMatch ? parseFloat(numericMatch[1]) : 0

    // Check if the value is an integer or float for rounding
    const isFloat = value.toString().includes('.')

    useEffect(() => {
        if (!elementRef.current || hasAnimated.current) return

        const counter = { val: 0 }

        const trigger = ScrollTrigger.create({
            trigger: elementRef.current,
            start: 'top 90%',
            onEnter: () => {
                if (hasAnimated.current) return
                hasAnimated.current = true

                gsap.to(counter, {
                    val: targetValue,
                    duration: duration,
                    delay: delay,
                    ease: 'power2.out',
                    onUpdate: () => {
                        const val = isFloat ? counter.val.toFixed(1) : Math.floor(counter.val)
                        setDisplayValue(val)
                    },
                })
            },
        })

        return () => trigger.kill()
    }, [targetValue, duration, delay, isFloat])

    return (
        <span ref={elementRef} className="count-up">
            {prefix}{displayValue}{suffix}
        </span>
    )
}

export default CountUp
