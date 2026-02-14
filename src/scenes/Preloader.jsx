import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0)
    const barRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        // Counter animation
        const counter = { val: 0 }
        gsap.to(counter, {
            val: 100,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => setCount(Math.floor(counter.val)),
        })

        // Bar fill
        gsap.to(barRef.current, {
            scaleX: 1,
            duration: 2.5,
            ease: 'power2.inOut',
        })

        // Exit animation
        const tl = gsap.timeline({ delay: 3 })
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => onComplete?.(),
        })

        return () => tl.kill()
    }, [onComplete])

    return (
        <div ref={containerRef} className="preloader">
            <div className="preloader__counter">{count}</div>
            <div className="preloader__bar-track">
                <div ref={barRef} className="preloader__bar-fill" />
            </div>
            <div className="preloader__label">Loading Experience</div>
        </div>
    )
}

export default Preloader
