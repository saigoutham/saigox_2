import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import '../styles/Preloader.css'

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0)
    const barRef = useRef(null)
    const containerRef = useRef(null)
    const logoRef = useRef(null)

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.2,
                    ease: 'power4.inOut',
                    onComplete: () => onComplete?.(),
                })
            }
        })

        // Initial setup
        gsap.set('.preloader__monogram path', { strokeDasharray: 300, strokeDashoffset: 300 })

        tl.to({ val: 0 }, {
            val: 100,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: function () { setCount(Math.floor(this.targets()[0].val)) }
        }, 0)

        tl.to(barRef.current, {
            scaleX: 1,
            duration: 2.5,
            ease: 'power2.inOut',
        }, 0)

        tl.to('.preloader__monogram path', {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: 'power2.inOut',
        }, 0)

        tl.to('.preloader__monogram', {
            scale: 1.1,
            opacity: 1,
            duration: 2.5,
            ease: 'power2.inOut',
        }, 0)

        return () => tl.kill()
    }, [onComplete])

    return (
        <div ref={containerRef} className="preloader">
            <div className="preloader__monogram" ref={logoRef}>
                <svg viewBox="0 0 100 100" className="monogram-svg">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <path
                        d="M30 40C30 30 70 30 70 40C70 50 30 50 30 60C30 70 70 70 70 60"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="preloader__content">
                <div className="preloader__counter">{count}</div>
                <div className="preloader__bar-track">
                    <div ref={barRef} className="preloader__bar-fill" />
                </div>
                <div className="preloader__label">SYSTEM INITIALIZING</div>
            </div>
        </div>
    )
}

export default Preloader
