import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import useGlitchText from '../../hooks/useGlitchText'
import { identity } from '../../data/resume'
import { selfPhotos } from '../../data/imageManifest'

/* ── Sparkle particle overlay ── */
const Sparkle = ({ delay }) => {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
    }), [delay])

    return <div className="sparkle" style={style} />
}

/* ── Stat badge ── */
const StatBadge = ({ icon, value, label, delay, element }) => (
    <motion.div
        className={`hero-stat hero-stat--${element}`}
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
        <span className="hero-stat__icon">{icon}</span>
        <span className="hero-stat__value">{value}</span>
        <span className="hero-stat__label">{label}</span>
    </motion.div>
)

const HeroSplash = () => {
    const [phase, setPhase] = useState(0)
    const nameGlitch = useGlitchText(identity.shortName, 800, 30)
    const tagGlitch = useGlitchText(identity.tagline, 1800, 25)

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 400)
        const t2 = setTimeout(() => setPhase(2), 1200)
        const t3 = setTimeout(() => setPhase(3), 2000)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [])

    return (
        <section className="hero-splash" id="hero">
            {/* Background layers */}
            <div className="hero-splash__bg">
                <div className="hero-splash__fog" />
                <div className="hero-splash__grid" />
            </div>

            {/* Sparkle particles */}
            <div className="hero-splash__sparkles">
                {Array.from({ length: 30 }, (_, i) => (
                    <Sparkle key={i} delay={i * 0.15} />
                ))}
            </div>

            {/* Photo — right side, angular clip */}
            <motion.div
                className="hero-splash__photo-wrap"
                initial={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', opacity: 0 }}
                animate={phase >= 1 ? {
                    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 15% 100%)',
                    opacity: 1,
                } : {}}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
                <img
                    src={selfPhotos.hero}
                    alt={identity.name}
                    className="hero-splash__photo"
                />
                <div className="hero-splash__photo-scan" />
                <div className="hero-splash__photo-overlay" />
                {/* Light rays foreground */}
                <div className="hero-splash__rays" />
            </motion.div>

            {/* Text content — left side */}
            <div className="hero-splash__content">
                <motion.div
                    className="hero-splash__act-badge"
                    initial={{ opacity: 0, x: -30 }}
                    animate={phase >= 1 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="hero-splash__act-line" />
                    <span>Z01 // THE_FOUNDATION</span>
                </motion.div>

                <div className="hero-splash__title">
                    <motion.h1
                        className={`hero-splash__name ${nameGlitch.done ? 'hero-splash__name--done' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={phase >= 1 ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {nameGlitch.displayed}
                    </motion.h1>

                    <motion.div
                        className="hero-splash__role-badge"
                        initial={{ opacity: 0, width: 0 }}
                        animate={phase >= 2 ? { opacity: 1, width: 'auto' } : {}}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="hero-splash__role-dot" />
                        <span className="hero-splash__role-text">{identity.title}</span>
                    </motion.div>
                </div>

                <motion.p
                    className={`hero-splash__tagline ${tagGlitch.done ? 'hero-splash__tagline--done' : ''}`}
                    initial={{ opacity: 0 }}
                    animate={phase >= 2 ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    {tagGlitch.displayed}
                </motion.p>

                {/* Hex stat badges */}
                <div className="hero-splash__stats">
                    <StatBadge icon="💰" value="$80M+" label="REVENUE" delay={2.2} element="dendro" />
                    <StatBadge icon="⚡" value="10×" label="GROWTH" delay={2.4} element="pyro" />
                    <StatBadge icon="📊" value="9.27" label="CGPA" delay={2.6} element="cryo" />
                    <StatBadge icon="🏆" value="5×" label="AWARDS" delay={2.8} element="geo" />
                </div>

                {/* HUD info */}
                <motion.div
                    className="hero-splash__hud"
                    initial={{ opacity: 0 }}
                    animate={phase >= 3 ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <span className="hero-splash__hud-item">
                        <span className="hero-splash__hud-key">CLASS</span>
                        <span className="hero-splash__hud-val">Product Manager</span>
                    </span>
                    <span className="hero-splash__hud-item">
                        <span className="hero-splash__hud-key">SPEC</span>
                        <span className="hero-splash__hud-val">Monetization & LiveOps</span>
                    </span>
                    <span className="hero-splash__hud-item">
                        <span className="hero-splash__hud-key">REALM</span>
                        <span className="hero-splash__hud-val">Mobile Gaming</span>
                    </span>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero-splash__scroll"
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                onClick={() => document.getElementById('relics')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="hero-splash__scroll-label">SCROLL_TO_EXPLORE</span>
                <motion.div
                    className="hero-splash__scroll-bar"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="hero-splash__scroll-dot" />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default HeroSplash
