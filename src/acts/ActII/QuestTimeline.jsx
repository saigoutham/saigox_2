import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiences } from '../../data/resume'

/* ── Single Quest Node ── */
const QuestNode = ({ exp, index, total }) => {
    const isActive = exp.badge === 'CURRENT'

    return (
        <div className={`quest-node quest-node--${exp.element} ${isActive ? 'quest-node--active' : ''}`}>
            <div className="quest-node__connector">
                <div className="quest-node__dot" />
                {index < total - 1 && <div className="quest-node__line" />}
            </div>

            <div className="quest-node__card">
                <div className="quest-node__card-glow" />
                <div className="quest-node__header">
                    <span className="quest-node__badge">{exp.badge}</span>
                    <span className="quest-node__period">{exp.period}</span>
                </div>

                <h3 className="quest-node__role">{exp.role}</h3>
                <span className="quest-node__company">{exp.company}</span>

                {/* Key bullets */}
                <ul className="quest-node__bullets">
                    {exp.bullets.map((b, i) => (
                        <li key={i} className="quest-node__bullet">{b}</li>
                    ))}
                </ul>

                {/* Floating metrics */}
                <div className="quest-node__metrics">
                    {exp.metrics.map((m, i) => (
                        <div key={i} className="quest-node__metric">
                            <span className="quest-node__metric-val">{m.val}</span>
                            <span className="quest-node__metric-lbl">{m.label}</span>
                        </div>
                    ))}
                </div>

                {/* Projects as loot drops */}
                <div className="quest-node__loot">
                    <span className="quest-node__loot-label">PROJECT LOOT</span>
                    {exp.projects.map((p, i) => (
                        <div key={i} className="quest-node__loot-item">
                            <span className="quest-node__loot-icon">◆</span>
                            <div>
                                <span className="quest-node__loot-name">{p.name}</span>
                                <span className="quest-node__loot-desc">{p.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const QuestTimeline = () => {
    const containerRef = useRef(null)

    // Horizontal scroll via vertical scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    // Map vertical scroll to horizontal translateX
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%'])

    return (
        <section className="quest-timeline" id="quests" ref={containerRef}>
            {/* Header - outside sticky area */}
            <div className="quest-timeline__header-wrap">
                <motion.div
                    className="quest-timeline__header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="section-tag">03 // QUEST LOG</span>
                    <h2 className="section-heading">
                        Quest <span className="glow-text glow-text--pyro">History</span>
                    </h2>
                    <p className="quest-timeline__subtitle">Scroll to traverse the timeline →</p>
                </motion.div>
            </div>

            {/* Sticky horizontal scroll area */}
            <div className="quest-timeline__sticky">
                <motion.div className="quest-timeline__track" style={{ x }}>
                    {/* Energy path line across background */}
                    <div className="quest-timeline__path" />

                    {experiences.map((exp, i) => (
                        <QuestNode key={exp.id} exp={exp} index={i} total={experiences.length} />
                    ))}
                </motion.div>

                {/* Scroll progress indicator */}
                <div className="quest-timeline__progress">
                    <motion.div
                        className="quest-timeline__progress-fill"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>
            </div>
        </section>
    )
}

export default QuestTimeline
