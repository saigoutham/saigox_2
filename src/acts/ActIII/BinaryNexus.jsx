import React from 'react'
import { motion } from 'framer-motion'
import { education, operatorStats, characterStats } from '../../data/resume'
import { selfPhotos } from '../../data/imageManifest'
import useTilt from '../../hooks/useTilt'

/* ── Radar Chart (SVG) ── */
const RadarChart = ({ data }) => {
    const size = 300
    const center = size / 2
    const maxRadius = 120
    const levels = 5

    const angleStep = (Math.PI * 2) / data.length

    const polygonPoints = (radiusFn) =>
        data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2
            const r = radiusFn(i)
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        }).join(' ')

    const gridLevels = Array.from({ length: levels }, (_, i) =>
        polygonPoints(() => (maxRadius / levels) * (i + 1))
    )

    const dataPoints = polygonPoints((i) => (data[i].value / 100) * maxRadius)

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="radar-chart">
            {gridLevels.map((points, i) => (
                <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                />
            ))}

            {data.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2
                return (
                    <line
                        key={i}
                        x1={center} y1={center}
                        x2={center + maxRadius * Math.cos(angle)}
                        y2={center + maxRadius * Math.sin(angle)}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="1"
                    />
                )
            })}

            <motion.polygon
                points={dataPoints}
                fill="rgba(255, 107, 53, 0.15)"
                stroke="var(--pyro)"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'center' }}
            />

            {data.map((d, i) => {
                const angle = i * angleStep - Math.PI / 2
                const r = (d.value / 100) * maxRadius
                const lx = center + (maxRadius + 35) * Math.cos(angle)
                const ly = center + (maxRadius + 35) * Math.sin(angle)
                return (
                    <g key={i}>
                        <circle
                            cx={center + r * Math.cos(angle)}
                            cy={center + r * Math.sin(angle)}
                            r="4"
                            fill="var(--pyro)"
                        />
                        <text
                            x={lx} y={ly}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="radar-chart__label"
                            fontSize="10"
                            fill="var(--text-secondary)"
                            fontFamily="var(--font-hud)"
                        >
                            {d.axis.toUpperCase()}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

/* ── Education Card ── */
const EduCard = ({ edu, idx }) => {
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(10)

    return (
        <motion.div
            ref={ref}
            className="operator-edu card-root"
            style={{ ...style, '--edu-accent': edu.accent }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="hud-glint" />
            <motion.div
                className="hud-scanner"
                animate={{ top: ['0%', '100%'], opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: idx * 0.2 }}
            />
            <div className="operator-edu__top-bar" />
            <span className="operator-edu__badge">{edu.badge}</span>
            <h4 className="operator-edu__degree">{edu.degree}</h4>
            <span className="operator-edu__school">{edu.school}</span>
            <span className="operator-edu__period">{edu.period}</span>
            <ul className="operator-edu__list">
                {edu.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
        </motion.div>
    )
}

const BinaryNexus = () => {
    return (
        <section className="binary-nexus" id="visionary">
            <div className="nexus-container">
                <motion.div
                    className="nexus-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-tag">ZONE_04 // BINARY_NEXUS</span>
                    <h2 className="section-heading">THE <span className="glow-text glow-text--geo">VISIONARY</span></h2>
                    <p className="section-subheading">A convergence of surgical precision and creative exploration</p>
                </motion.div>

                <div className="nexus-grid">
                    {/* LEFT: THE OPERATOR */}
                    <div className="nexus-side nexus-side--operator">
                        <div className="nexus-side__header">
                            <h3 className="nexus-side__title">THE_OPERATOR</h3>
                            <div className="nexus-side__line" />
                        </div>

                        <div className="nexus-content-grid">
                            {/* Profile & Radar */}
                            <div className="nexus-profile-block">
                                <motion.div
                                    className="nexus-avatar"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                >
                                    <img src={selfPhotos.character} alt="Character" className="nexus-avatar__img" />
                                    <div className="nexus-avatar__overlay" />
                                </motion.div>
                                <div className="nexus-radar-wrap">
                                    <RadarChart data={characterStats} />
                                </div>
                            </div>

                            {/* Bento Stats */}
                            <div className="nexus-stats-bento">
                                <div className="stat-card stat-card--large card-root">
                                    <div className="hud-glint" />
                                    <span className="stat-card__val">{operatorStats.revenue}</span>
                                    <span className="stat-card__lbl">REVENUE_IMPACT</span>
                                </div>
                                <div className="stat-card card-root">
                                    <div className="hud-glint" />
                                    <span className="stat-card__val">{operatorStats.yoyGrowth}</span>
                                    <span className="stat-card__lbl">YOY_GROWTH</span>
                                </div>
                                <div className="stat-card card-root">
                                    <div className="hud-glint" />
                                    <span className="stat-card__val">{operatorStats.productsLaunched}</span>
                                    <span className="stat-card__lbl">SHIPPED</span>
                                </div>
                                <div className="stat-card stat-card--wide card-root">
                                    <div className="hud-glint" />
                                    <span className="stat-card__val">{operatorStats.teamSize} PERSONS</span>
                                    <span className="stat-card__lbl">COMMAND_SCOPE</span>
                                </div>
                            </div>

                            {/* Education Grid */}
                            <div className="nexus-edu-grid">
                                {education.map((edu, i) => (
                                    <EduCard key={edu.school} edu={edu} idx={i} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE CREATOR (BRIDGE TO VAULT) */}
                    <div className="nexus-side nexus-side--creator">
                        <div className="nexus-side__header">
                            <h3 className="nexus-side__title">THE_CREATOR</h3>
                            <div className="nexus-side__line" />
                        </div>

                        <div className="nexus-creator-bridge">
                            <div className="bridge-content">
                                <p>INITIATING VISUAL UPLINK...</p>
                                <div className="bridge-status">
                                    <span className="status-dot" />
                                    <span>CONNECTION_ESTABLISHED</span>
                                </div>
                            </div>
                            <div id="vault" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BinaryNexus
