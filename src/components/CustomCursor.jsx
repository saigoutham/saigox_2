import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/CustomCursor.css'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const [isPointer, setIsPointer] = useState(false)

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out',
            })
        }

        const onMouseDown = () => gsap.to(cursor, { scale: 0.8, duration: 0.2 })
        const onMouseUp = () => gsap.to(cursor, { scale: 1, duration: 0.2 })

        const onMouseEnterLink = () => {
            setIsPointer(true)
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 107, 53, 0.4)',
                duration: 0.3
            })
        }

        const onMouseLeaveLink = () => {
            setIsPointer(false)
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'rgba(255, 107, 53, 0.3)',
                duration: 0.3
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)

        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .glass-card, .metric-tile, .skill-chip, .award-tile, .edu-card, .campaign-card')
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', onMouseEnterLink)
            el.addEventListener('mouseleave', onMouseLeaveLink)
        })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink)
                el.removeEventListener('mouseleave', onMouseLeaveLink)
            })
        }
    }, [])

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isPointer ? 'custom-cursor--active' : ''}`}
        />
    )
}

export default CustomCursor
