import React from 'react'
import { motion } from 'framer-motion'
import { education, operatorStats, characterStats } from '../../data/resume'
import { selfPhotos } from '../../data/imageManifest'

/* ── Radar Chart (SVG) ── */
const RadarChart = ({ data }) => {
    const size = 300
    const center = size / 2
    const maxRadius = 120
    const levels = 5

    const angleStep = (Math.PI * 2) / data.length

    // Generate polygon points for a given level
    const polygonPoints = (radiusFn) =>
        data.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2
            const r = radiusFn(i)
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        }).join(' ')

    // Reference grid levels
    const gridLevels = Array.from({ length: levels }, (_, i) =>
        polygonPoints(() => (maxRadius / levels) * (i + 1))
    )

    // Data polygon
    const dataPoints = polygonPoints((i) => (data[i].value / 100) * maxRadius)

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="radar-chart">
            {/* Grid */}
            {gridLevels.map((points, i) => (
                <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                />
            ))}

            {/* Axis lines */}
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

            {/* Data polygon */}
            <motion.polygon
                points={dataPoints}
                fill="rgba(132, 204, 22, 0.15)"
                stroke="var(--dendro)"
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'center' }}
            />

            {/* Data dots + labels */}
            {data.map((d, i) => {
                const angle = i * angleStep - Math.PI / 2
                const r = (d.value / 100) * maxRadius
                const lx = center + (maxRadius + 30) * Math.cos(angle)
                const ly = center + (maxRadius + 30) * Math.sin(angle)
                return (
                    <g key={i}>
                        <circle
                            cx={center + r * Math.cos(angle)}
                            cy={center + r * Math.sin(angle)}
                            r="4"
                            fill="var(--dendro)"
                        />
                        <text
                            x={lx} y={ly}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="radar-chart__label"
                            fontSize="9"
                            fill="var(--text-secondary)"
                        >
                            {d.axis}
                        </text>
                        <text
                            x={lx} y={ly + 13}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="11"
                            fontWeight="700"
                            fill="var(--dendro)"
                        >
                            {d.value}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}

/* ── Education Card ── */
const EduCard = ({ edu, idx }) => (
    <motion.div
        className="operator-edu"
        style={{ '--edu-accent': edu.accent }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: idx * 0.15 }}
    >
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

const SplitRealm = () => (
    <section className="split-realm" id="visionary">
        <motion.div
            className="split-realm__header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
        >
            <span className="section-tag">04 // DUAL IDENTITY</span>
            <h2 className="section-heading">
                The <span className="glow-text glow-text--geo">Visionary</span>
            </h2>
        </motion.div>

        <div className="split-realm__grid">
            {/* ── LEFT: The Operator ── */}
            <div className="split-realm__left">
                <motion.div
                    className="split-realm__side-header"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="split-realm__side-title">The Operator</h3>
                    <span className="split-realm__side-sub">Strategy · Leadership · Execution</span>
                </motion.div>

                {/* Photo with clip-path */}
                <motion.div
                    className="split-realm__photo"
                    initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                    whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0 100%)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <img src={selfPhotos.character} alt="Character" className="split-realm__photo-img" />
                </motion.div>

                {/* Radar Chart */}
                <div className="split-realm__radar">
                    <RadarChart data={characterStats} />
                </div>

                {/* Hel(l)Mark Stats */}
                <motion.div
                    className="operator-legacy"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h4 className="operator-legacy__title">Hel(l)Mark — CEO Legacy</h4>
                    <div className="operator-legacy__stats">
                        <div className="operator-legacy__stat">
                            <span className="operator-legacy__val">{operatorStats.revenue}</span>
                            <span className="operator-legacy__lbl">Revenue</span>
                        </div>
                        <div className="operator-legacy__stat">
                            <span className="operator-legacy__val">{operatorStats.yoyGrowth}</span>
                            <span className="operator-legacy__lbl">YoY Growth</span>
                        </div>
                        <div className="operator-legacy__stat">
                            <span className="operator-legacy__val">{operatorStats.productsLaunched}</span>
                            <span className="operator-legacy__lbl">Products</span>
                        </div>
                        <div className="operator-legacy__stat">
                            <span className="operator-legacy__val">{operatorStats.teamSize}</span>
                            <span className="operator-legacy__lbl">Team Size</span>
                        </div>
                        <div className="operator-legacy__stat">
                            <span className="operator-legacy__val">{operatorStats.ordersDelivered}</span>
                            <span className="operator-legacy__lbl">Orders</span>
                        </div>
                    </div>
                </motion.div>

                {/* Education */}
                <div className="split-realm__education">
                    {education.map((edu, i) => (
                        <EduCard key={edu.school} edu={edu} idx={i} />
                    ))}
                </div>
            </div>

            {/* ── RIGHT: The Creator ── */}
            <div className="split-realm__right">
                <motion.div
                    className="split-realm__side-header"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="split-realm__side-title">The Creator</h3>
                    <span className="split-realm__side-sub">Photography · Art · Exploration</span>
                </motion.div>
                {/* PhotoVault will be placed here via App.jsx */}
                <div id="vault" />
            </div>
        </div>
    </section>
)

export default SplitRealm
