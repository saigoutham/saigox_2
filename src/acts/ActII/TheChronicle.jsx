import React from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../../data/resume'
import useTilt from '../../hooks/useTilt'

const CampaignCard = ({ exp, index }) => {
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(5)

    return (
        <motion.div
            ref={ref}
            className={`campaign-card card-root campaign-card--${exp.element} ${index % 2 === 0 ? 'campaign-card--left' : 'campaign-card--right'}`}
            variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="campaign-card__header">
                <div className="campaign-card__meta">
                    <span className="campaign-card__chapter">CHAPTER_0{index + 1}</span>
                    <span className="campaign-card__period">{exp.period}</span>
                </div>
                <div className="campaign-card__badges">
                    <span className="badge-item">{exp.badge}</span>
                    <span className="badge-item badge-item--elite">ELITE_PM</span>
                </div>
            </div>

            <div className="campaign-card__main">
                <div className="campaign-card__role-block">
                    <h3 className="campaign-card__role">{exp.role}</h3>
                    <span className="campaign-card__company">@ {exp.company.toUpperCase()}</span>
                </div>

                <div className="campaign-card__objectives">
                    <div className="card-sub-label">CORE_OBJECTIVES:</div>
                    <ul className="objective-list">
                        {exp.bullets.map((bullet, i) => (
                            <li key={i} className="objective-item">
                                <span className="objective-icon">▶</span>
                                {bullet}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="campaign-card__footer">
                <div className="campaign-card__loot">
                    <div className="card-sub-label">LEGENDARY_LOOT:</div>
                    <div className="loot-grid">
                        {exp.metrics.map((m, i) => (
                            <div key={i} className="loot-pill">
                                <span className="loot-val">{m.val}</span>
                                <span className="loot-label">{m.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="campaign-card__seal">
                    <div className="seal-circle" />
                    <span className="seal-text">VERIFIED_DATA</span>
                </div>
            </div>

            {/* Interactive Layers */}
            <div className="hud-glint" />
            <motion.div
                className="hud-scanner"
                animate={{ top: ['0%', '100%'], opacity: [0, 0.5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: index * 0.7 }}
            />

            <div className="campaign-card__border" />
            <div className="campaign-card__ornament" />
        </motion.div>
    )
}

const TheChronicle = () => {
    return (
        <section className="the-chronicle" id="chronicle">
            <div className="chronicle-container">
                <div className="chronicle-header">
                    <motion.div
                        className="chronicle-header__content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-tag">ZONE_03 // THE_CHRONICLE</span>
                        <h2 className="section-heading">THE <span className="glow-text glow-text--pyro">CHRONICLE</span></h2>
                        <p className="section-subheading">A record of high-stakes deployments and architectural victories</p>
                    </motion.div>
                </div>

                <div className="chronicle-timeline">
                    <div className="timeline-track">
                        <motion.div
                            className="timeline-laser"
                            animate={{
                                top: ['0%', '100%'],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>
                    <motion.div
                        className="chronicle-list"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {[...experiences].reverse().map((exp, i) => (
                            <CampaignCard key={exp.id} exp={exp} index={i} />
                        ))}
                    </motion.div>
                </div>

                <div className="chronicle-footer">
                    <motion.div
                        className="chronicle-end"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <div className="end-divider" />
                        <span className="end-label">END OF RECORD</span>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default TheChronicle
