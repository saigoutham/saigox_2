import React from 'react'
import { motion } from 'framer-motion'
import { experiences } from '../../data/resume'

const QuestCard = ({ exp, index }) => {
    return (
        <motion.div
            className={`quest-card quest-card--${exp.element}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        >
            <div className="quest-card__accent" />

            <div className="quest-card__header">
                <div className="quest-card__meta">
                    <span className="quest-card__id">MISSION_0{index + 1}</span>
                    <span className="quest-card__period">{exp.period}</span>
                </div>
                <div className="quest-card__badge">{exp.badge}</div>
            </div>

            <div className="quest-card__title-wrap">
                <h3 className="quest-card__role">{exp.role}</h3>
                <span className="quest-card__company">@ {exp.company}</span>
            </div>

            <div className="quest-card__objectives">
                <div className="quest-card__section-label">OBJECTIVES:</div>
                <ul className="quest-card__list">
                    {exp.bullets.map((b, i) => (
                        <li key={i} className="quest-card__item">
                            <span className="quest-card__dash">»</span> {b}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="quest-card__loot">
                <div className="quest-card__section-label">LOOT ACQUIRED:</div>
                <div className="quest-card__metrics">
                    {exp.metrics.map((m, i) => (
                        <div key={i} className="quest-card__metric-pill">
                            <span className="quest-card__metric-val">{m.val}</span>
                            <span className="quest-card__metric-lbl">{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="quest-card__footer">
                <div className="quest-card__line" />
                <div className="quest-card__status">MISSION_COMPLETE_STABLE</div>
            </div>
        </motion.div>
    )
}

const QuestLog = () => {
    return (
        <section className="quest-log" id="quests">
            <div className="quest-log__header">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-tag">ACT II // SEGMENT 03</span>
                    <h2 className="section-heading">QUEST <span className="glow-text glow-text--pyro">LOG</span></h2>
                    <p className="quest-log__subtitle">Historical deployment timeline across the multiverse</p>
                </motion.div>
            </div>

            <div className="quest-log__container">
                <div className="quest-log__timeline-line" />

                {experiences.map((exp, i) => (
                    <QuestCard key={exp.id} exp={exp} index={i} />
                ))}
            </div>

            <div className="quest-log__footer">
                <div className="quest-log__end-node">
                    <div className="quest-log__end-dot" />
                    <span className="quest-log__end-label">END OF CHRONICLE</span>
                </div>
            </div>
        </section>
    )
}

export default QuestLog
