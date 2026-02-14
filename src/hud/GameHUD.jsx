import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../store/useGameStore'

const GameHUD = () => {
    const [time, setTime] = useState(new Date())
    const activeZone = useGameStore(s => s.activeZone)
    const scrollToSection = useGameStore(s => s.scrollToSection)

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        })
    }

    const zones = [
        { id: 'hero', label: 'HERO', zone: 'HERO' },
        { id: 'relics', label: 'ARCHIVE', zone: 'ARCHIVE' },
        { id: 'skills', label: 'CITADEL', zone: 'CITADEL' },
        { id: 'vision', label: 'VISION', zone: 'VISION' }
    ]

    return (
        <div className="game-hud">
            {/* Top Bar */}
            <header className="game-hud__top">
                <div className="game-hud__branding">
                    <span className="game-hud__logo">SG</span>
                    <div className="game-hud__server">
                        <span className="game-hud__server-label">REALM_SERVER</span>
                        <span className="game-hud__server-status">ONLINE</span>
                    </div>
                </div>

                <nav className="game-hud__nav">
                    {zones.map((z) => (
                        <button
                            key={z.id}
                            className={`game-hud__nav-item ${activeZone === z.zone ? 'active' : ''}`}
                            onClick={() => scrollToSection(z.id)}
                        >
                            <span className="game-hud__nav-dot" />
                            <span className="game-hud__nav-label">{z.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="game-hud__meta">
                    <div className="game-hud__time">
                        <span className="game-hud__meta-label">REALM_TIME</span>
                        <span className="game-hud__time-val">{formatTime(time)} IST</span>
                    </div>
                </div>
            </header>

            {/* Left Profile Panel */}
            <aside className="game-hud__profile">
                <div className="game-hud__char-info">
                    <div className="game-hud__level">LVL 30+</div>
                    <div className="game-hud__class">STRATEGIST_PM</div>
                </div>
                <div className="game-hud__vitals">
                    <div className="vitals-bar vitals-bar--hp">
                        <div className="vitals-bar__fill" style={{ width: '92%' }} />
                        <span className="vitals-bar__label">SUCCESS</span>
                    </div>
                    <div className="vitals-bar vitals-bar--mp">
                        <div className="vitals-bar__fill" style={{ width: '88%' }} />
                        <span className="vitals-bar__label">ANALYTICS</span>
                    </div>
                </div>
            </aside>

            {/* Minimap Progress (Right) */}
            <div className="game-hud__minimap">
                <div className="minimap-track" />
                {zones.map((z, i) => (
                    <div
                        key={z.id}
                        className={`minimap-node ${activeZone === z.zone ? 'active' : ''}`}
                        style={{ top: `${(i / (zones.length - 1)) * 100}%` }}
                    />
                ))}
            </div>
        </div>
    )
}

export default GameHUD
