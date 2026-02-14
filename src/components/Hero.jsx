import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const glitchChars = '!<>-_\\/[]{}—=+*^?#________'

const GlitchText = ({ text, delay = 0, className = '' }) => {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        let timeout
        timeout = setTimeout(() => {
            let iteration = 0
            const interval = setInterval(() => {
                setDisplayed(
                    text.split('').map((char, idx) => {
                        if (idx < iteration) return char
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    }).join('')
                )
                iteration += 1 / 2
                if (iteration >= text.length) {
                    clearInterval(interval)
                    setDisplayed(text)
                    setDone(true)
                }
            }, 35)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timeout)
    }, [text, delay])

    return (
        <span className={`glitch-text-reveal ${done ? 'glitch-text-reveal--done' : ''} ${className}`}>
            {displayed || '\u00A0'.repeat(text.length)}
        </span>
    )
}

const Hero = () => {
    const [phase, setPhase] = useState(0)
    const photoRef = useRef(null)

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 300)
        const t2 = setTimeout(() => setPhase(2), 1000)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    // Parallax tilt on photo
    const handleMouseMove = (e) => {
        if (!photoRef.current) return
        const rect = photoRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        photoRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
    }

    const handleMouseLeave = () => {
        if (photoRef.current) {
            photoRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
        }
    }

    return (
        <section className="hero" id="hero">
            {/* Glitch lines during reveal */}
            <AnimatePresence>
                {phase < 2 && (
                    <motion.div
                        className="hero__glitch-lines"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="hero__glitch-line"
                                style={{ top: `${10 + i * 16}%` }}
                                animate={{
                                    x: [0, Math.random() * 100 - 50, 0, Math.random() * -80, 0],
                                    scaleX: [1, 1.5, 0.8, 1.2, 1],
                                    opacity: [0.3, 0.8, 0.2, 0.6, 0],
                                }}
                                transition={{ duration: 0.7, delay: i * 0.08, ease: 'linear' }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="hero__split">
                {/* LEFT — Text content */}
                <div className="hero__left">
                    {phase >= 2 && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="hero__badge"
                            >
                                <span className="hero__badge-dot" />
                                <GlitchText text="OPEN TO WORK" delay={200} />
                            </motion.div>

                            <h1 className="hero__title">
                                <motion.span
                                    initial={{ opacity: 0, y: 80, skewY: 8 }}
                                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                                    className="hero__title-line"
                                >
                                    VENKATA
                                </motion.span>
                                <motion.span
                                    initial={{ opacity: 0, y: 80, skewY: 8 }}
                                    animate={{ opacity: 1, y: 0, skewY: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                    className="hero__title-line hero__title-line--accent"
                                >
                                    SAI GOUTHAM
                                </motion.span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="hero__role-bar"
                            >
                                <span className="hero__role-tag hero__role-tag--pm">PRODUCT MANAGER</span>
                                <span className="hero__role-sep">×</span>
                                <span className="hero__role-tag hero__role-tag--gaming">GAMING</span>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.0, duration: 1 }}
                                className="hero__tagline"
                            >
                                Building economies that power millions of players.
                                <br />
                                Capturing nature's finest details through the lens.
                            </motion.p>

                            {/* Stats row */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="hero__stats-row"
                            >
                                {[
                                    { num: '$80M+', lbl: 'ANNUAL REVENUE' },
                                    { num: '10×', lbl: 'REVENUE LIFT' },
                                    { num: '4.5 YRS', lbl: 'EXPERIENCE' },
                                    { num: '9.27', lbl: 'CGPA • NIT TRICHY' },
                                ].map((s, i) => (
                                    <div key={i} className="hero__stat-item">
                                        <span className="hero__stat-num">{s.num}</span>
                                        <span className="hero__stat-lbl">{s.lbl}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* HUD data */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                                className="hero__hud-row"
                            >
                                <span className="hero__hud-item"><span className="hero__hud-label">CLASS</span> PRODUCT MANAGER</span>
                                <span className="hero__hud-item"><span className="hero__hud-label">SPEC</span> GAMING × LIVEOPS</span>
                                <span className="hero__hud-item"><span className="hero__hud-label">LOC</span> INDIA</span>
                            </motion.div>
                        </>
                    )}
                </div>

                {/* RIGHT — Photo with cinematic reveal */}
                <motion.div
                    className="hero__right"
                    initial={{ opacity: 0, scale: 0.8, clipPath: 'inset(15% 15% 15% 15% round 24px)' }}
                    animate={phase >= 1 ? {
                        opacity: 1,
                        scale: 1,
                        clipPath: 'inset(0% 0% 0% 0% round 24px)',
                    } : {}}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div
                        className="hero__photo-frame"
                        ref={photoRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src="/images/self/DSC_3639.jpg"
                            alt="Venkata Sai Goutham"
                            className="hero__photo"
                        />
                        <div className="hero__photo-border" />
                        <div className="hero__photo-glow" />

                        {/* Corner brackets on photo */}
                        <span className="hero__corner hero__corner--tl" />
                        <span className="hero__corner hero__corner--tr" />
                        <span className="hero__corner hero__corner--bl" />
                        <span className="hero__corner hero__corner--br" />
                    </div>
                </motion.div>
            </div>

            {/* Scroll */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
                transition={{ delay: 2 }}
                className="hero__scroll"
            >
                <div className="hero__scroll-line" />
                <span>SCROLL</span>
            </motion.div>
        </section>
    )
}

export default Hero
