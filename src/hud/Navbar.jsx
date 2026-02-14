import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useGameStore from '../store/useGameStore'

const Navbar = () => {
    const [time, setTime] = useState('')
    const [scrolled, setScrolled] = useState(false)
    const statsOverlayOpen = useGameStore(s => s.statsOverlayOpen)
    const toggleStatsOverlay = useGameStore(s => s.toggleStatsOverlay)
    const sectionsVisited = useGameStore(s => s.sectionsVisited)
    const gateUnlocked = useGameStore(s => s.gateUnlocked)

    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <motion.nav
            className={`hud-nav ${scrolled ? 'hud-nav--compact' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Left: Emblem */}
            <div className="hud-nav__left">
                <div className="hud-nav__emblem">
                    <span className="hud-nav__monogram">SGV</span>
                    <div className="hud-nav__emblem-pulse" />
                </div>
            </div>

            {/* Center: Act Indicators + Nav */}
            <div className="hud-nav__center">
                <div className="hud-nav__acts">
                    <span className="hud-nav__act hud-nav__act--active">I</span>
                    <span className={`hud-nav__act ${gateUnlocked ? 'hud-nav__act--active' : ''}`}>II</span>
                    <span className="hud-nav__act">III</span>
                </div>
                <div className="hud-nav__links">
                    <a href="#hero" className="hud-nav__link">Origin</a>
                    <a href="#relics" className="hud-nav__link">Relics</a>
                    <a href="#skills" className="hud-nav__link">Skills</a>
                    <a href="#quests" className="hud-nav__link">Quests</a>
                    <a href="#vault" className="hud-nav__link">Vault</a>
                    <a href="#terminal" className="hud-nav__link">Contact</a>
                </div>
            </div>

            {/* Right: Status */}
            <div className="hud-nav__right">
                <button className="hud-nav__stats-btn" onClick={toggleStatsOverlay}>
                    <span className="hud-nav__stats-icon">◆</span>
                    <span>STATS</span>
                </button>
                <div className="hud-nav__status">
                    <span className="hud-nav__time">{time} IST</span>
                    <span className="hud-nav__online">
                        <span className="hud-nav__online-dot" />
                        ONLINE
                    </span>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar
