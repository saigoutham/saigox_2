import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Intro.css'
import CountUp from '../components/CountUp'
import MagneticButton from '../components/MagneticButton' // New component

gsap.registerPlugin(ScrollTrigger)

/* ── Particles: monochrome warm tones ── */
const ParticleBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let raf
        let mouse = { x: -1000, y: -1000 }

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio
            canvas.height = canvas.offsetHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resize()
        window.addEventListener('resize', resize)

        const handleMouse = (e) => { mouse = { x: e.clientX, y: e.clientY } }
        window.addEventListener('mousemove', handleMouse)

        const count = 60
        const particles = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 0.5,
            o: Math.random() * 0.3 + 0.1,
        }))

        const draw = () => {
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            ctx.clearRect(0, 0, w, h)

            for (const p of particles) {
                // Mouse repulsion
                const dx = p.x - mouse.x
                const dy = p.y - mouse.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 150) {
                    const force = (150 - dist) / 150
                    p.vx += (dx / dist) * force * 0.3
                    p.vy += (dy / dist) * force * 0.3
                }

                p.x += p.vx
                p.y += p.vy
                p.vx *= 0.99
                p.vy *= 0.99

                if (p.x < 0 || p.x > w) p.vx *= -1
                if (p.y < 0 || p.y > h) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 107, 53, ${p.o})`
                ctx.fill()
            }

            // Connection lines — warm color only
            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 120) {
                        const alpha = (1 - dist / 120) * 0.12
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(255, 107, 53, ${alpha})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            raf = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouse)
        }
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

const Intro = () => {
    const sectionRef = useRef(null)
    const nameRef = useRef(null)

    // Parallel Scroll & Velocity Skew
    const { scrollY } = useScroll()
    const velocity = useSpring(scrollY, { damping: 50, stiffness: 400 })
    const skewX = useTransform(velocity, [0, 1000], [0, 5]) // Subtle skew on scroll

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax the name block heavily
            gsap.to(nameRef.current, {
                y: 200, // Move down faster than scroll
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const firstName = 'GOUTHAM'

    const charVariants = {
        hidden: { opacity: 0, y: 120, rotateX: 90, scale: 0.7 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: 0.5 + i * 0.12,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    }

    return (
        <section ref={sectionRef} className="scene intro" id="intro">
            <div className="intro__ambient" />
            <div className="particle-canvas">
                <ParticleBackground />
            </div>

            <motion.div
                ref={nameRef}
                className="intro__name-block"
                style={{ skewX }} // Applied velocity skew
            >
                {/* Decorative scanner line */}
                <motion.div
                    className="intro__scanner"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                <span className="intro__first-name" aria-label={firstName}>
                    {firstName.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            className="intro__char"
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={charVariants}
                            style={{ '--char-index': i, display: 'inline-block' }}
                        >
                            {char}
                            <span className="intro__char-glow" />
                        </motion.span>
                    ))}
                </span>

                <motion.span
                    className="intro__last-name"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'inline-block' }}
                >
                    VADDI
                </motion.span>

                {/* Role pills */}
                <motion.div
                    className="intro__roles"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                >
                    <span className="intro__role-pill intro__role-pill--accent">
                        <span className="intro__role-dot" /> Product Manager
                    </span>
                    <span className="intro__role-divider">/</span>
                    <span className="intro__role-pill">
                        <span className="intro__role-dot" /> Gaming &amp; Monetization
                    </span>
                    <span className="intro__role-divider">/</span>
                    <span className="intro__role-pill">
                        <span className="intro__role-dot" /> Photography
                    </span>
                </motion.div>

                {/* Stat bar */}
                <motion.div
                    className="intro__stat-bar"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                >
                    <div className="intro__stat-item">
                        <span className="intro__stat-val">
                            <CountUp value="80" prefix="$" suffix="M+" />
                        </span>
                        <span className="intro__stat-lbl">REVENUE OWNED</span>
                    </div>
                    <div className="intro__stat-sep" />
                    <div className="intro__stat-item">
                        <span className="intro__stat-val">
                            <CountUp value="100" suffix="M+" />
                        </span>
                        <span className="intro__stat-lbl">TRANSACTIONS</span>
                    </div>
                    <div className="intro__stat-sep" />
                    <div className="intro__stat-item">
                        <span className="intro__stat-val">
                            <CountUp value="4.5" suffix=" YRS" />
                        </span>
                        <span className="intro__stat-lbl">EXPERIENCE</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Magnetic CTA Wrapper */}
            <motion.div
                className="intro__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0, duration: 1 }}
            >
                <MagneticButton className="intro__scroll-trigger">
                    <span className="intro__scroll-text">SCROLL</span>
                    <span className="intro__scroll-line" />
                </MagneticButton>
            </motion.div>
        </section>
    )
}

export default Intro
