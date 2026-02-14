import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTilt from '../hooks/useTilt'

const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = React.useState(0)
    const ref = React.useRef(null)
    const started = React.useRef(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true
                const startTime = Date.now()
                const numericEnd = parseFloat(String(end).replace(/[^0-9.]/g, ''))
                const step = () => {
                    const progress = Math.min((Date.now() - startTime) / duration, 1)
                    const eased = 1 - Math.pow(1 - progress, 3)
                    setCount(Math.round(numericEnd * eased))
                    if (progress < 1) requestAnimationFrame(step)
                }
                requestAnimationFrame(step)
            }
        }, { threshold: 0.3 })

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [end, duration])

    return { count, ref }
}

const experiences = [
    {
        company: 'Scopely',
        role: 'Product Manager — Monetization & LiveOps',
        period: 'AUG 2023 — PRESENT',
        badge: 'CURRENT',
        accent: '#c8ff00',
        tabs: {
            'Overview': [
                'Own end-to-end monetization for live mobile titles generating $80M+ annually',
                'Drive revenue strategy across IAP, D2C web stores, and LiveOps events',
                'Lead cross-functional squad of 12+ across engineering, design, and data science',
            ],
            'Key Wins': [
                '10× improvement in web store contribution through D2C channel launch',
                '86% first-time engagement rate on new offer pipeline system',
                '$0.5M incremental yield from segmentation-driven pricing experiments',
            ],
            'Projects': [
                {
                    name: 'D2C Web Store', desc: 'Built direct-to-consumer purchasing flow that 10x\'d platform revenue contribution'
                },
                { name: 'Dynamic Offer Engine', desc: 'AI-segmented offer pipeline achieving 86% first-time purchase engagement' },
                { name: 'LiveOps Calendar', desc: 'Cadence-optimized event system driving sustained session frequency' },
            ],
        },
        metrics: [
            { val: '$80M+', suffix: '', lbl: 'ANNUAL REVENUE' },
            { val: '10', suffix: '×', lbl: 'REVENUE LIFT' },
            { val: '86', suffix: '%', lbl: 'ENGAGEMENT' },
            { val: '5', suffix: '×', lbl: 'SPOT AWARDS' },
        ],
    },
    {
        company: 'Hel(l)Mark',
        role: 'Co-Founder & CEO',
        period: '2021 — 2023',
        badge: 'FOUNDER',
        accent: '#ff6b35',
        tabs: {
            'Overview': [
                'Founded an indie gaming studio; conceptualized, designed, and shipped two titles to Google Play',
                'One title hit Top 20 Featured in "New & Noteworthy" on Google Play Games',
                'Managed end-to-end product: game design, UX, monetization, marketing, and player analytics',
            ],
            'Key Wins': [
                '15K+ installs within first 3 months of launch with zero paid marketing',
                'Featured by Google Play editorial team in New & Noteworthy section',
                'Built scalable game architecture supporting real-time multiplayer',
            ],
            'Projects': [
                { name: 'Dodo Duck', desc: 'Casual puzzle game — Top 20 Google Play Featured Games' },
                { name: 'Card Battles', desc: 'Real-time multiplayer card battler with ELO matchmaking' },
            ],
        },
        metrics: [
            { val: '15K+', suffix: '', lbl: 'INSTALLS' },
            { val: 'TOP 20', suffix: '', lbl: 'GOOGLE PLAY' },
            { val: '2', suffix: '', lbl: 'GAMES SHIPPED' },
        ],
    },
    {
        company: 'Visa Inc.',
        role: 'Senior Software Engineer',
        period: '2018 — 2021',
        badge: 'PREV',
        accent: '#00d4ff',
        tabs: {
            'Overview': [
                'Built and maintained enterprise-scale data infrastructure processing 100M+ daily transactions',
                'Part of Visa\'s core data engineering team, architecting ETL pipelines at 1PB+ scale',
                'Twice awarded Employee of the Year across entire engineering organization',
            ],
            'Key Wins': [
                '40% reduction in pipeline processing time through Spark optimization',
                '99.99% uptime maintained across critical payment processing systems',
                '2× Employee of the Year — recognized for Judgment, Ownership & Execution',
            ],
            'Projects': [
                { name: 'Payment Data Lake', desc: 'Designed petabyte-scale data lake architecture on Hadoop/Spark' },
                { name: 'Real-time Analytics', desc: 'Built streaming analytics dashboard for fraud detection signals' },
                { name: 'Pipeline Orchestration', desc: 'Airflow-based orchestration reducing batch job failures by 60%' },
            ],
        },
        metrics: [
            { val: '1PB+', suffix: '', lbl: 'DATA PROCESSED' },
            { val: '100M+', suffix: '', lbl: 'DAILY TXN' },
            { val: '2', suffix: '×', lbl: 'EMPLOYEE OF YEAR' },
        ],
    },
]

const education = [
    {
        degree: 'MBA — Strategy & Marketing',
        school: 'IIM LUCKNOW',
        period: '2021 — 2023',
        badge: 'TOP TIER',
        accent: '#c8ff00',
        highlights: [
            "Dean's Merit List — Top academic cohort",
            'National Case Competition Finalist × 3',
            'Co-founded Hel(l)Mark during MBA tenure',
            'Specialized in Strategy, Marketing & Entrepreneurship',
        ],
    },
    {
        degree: 'B.Tech CS (Honors)',
        school: 'NIT TRICHY',
        period: '2014 — 2018',
        badge: '9.27 CGPA',
        accent: '#00d4ff',
        highlights: [
            '9.27 CGPA — Top of department',
            'Computer Science major with Management minor',
            'Honors Degree with distinction',
            'CAT 99.22 Percentile — Top 0.78% of 200K+',
        ],
    },
]

const ExpCard = ({ exp, idx }) => {
    const [activeTab, setActiveTab] = useState('Overview')
    const tilt = useTilt(6)
    const tabKeys = Object.keys(exp.tabs)

    return (
        <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? -80 : 80, rotateY: idx % 2 === 0 ? 5 : -5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.9, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="exp-card"
            style={{ '--card-accent': exp.accent, ...tilt.style }}
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
        >
            <div className="exp-card__noise" />
            <div className="exp-card__glow" />

            <div className="exp-card__header">
                <div className="exp-card__meta">
                    <span className="exp-card__badge">{exp.badge}</span>
                    <span className="exp-card__period">{exp.period}</span>
                </div>
            </div>

            <h3 className="exp-card__role">{exp.role}</h3>
            <span className="exp-card__company">{exp.company}</span>

            {/* Tab navigation */}
            <div className="exp-card__tabs">
                {tabKeys.map(tab => (
                    <button
                        key={tab}
                        className={`exp-card__tab ${activeTab === tab ? 'exp-card__tab--active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div layoutId={`tab-${exp.company}`} className="exp-card__tab-indicator" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="exp-card__tab-content"
                >
                    {activeTab === 'Projects' ? (
                        <div className="exp-card__projects">
                            {exp.tabs[activeTab].map((proj, i) => (
                                <div key={i} className="exp-project">
                                    <div className="exp-project__name">{proj.name}</div>
                                    <div className="exp-project__desc">{proj.desc}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <ul className="exp-card__bullets">
                            {exp.tabs[activeTab].map((b, i) => (
                                <li key={i} className="exp-card__bullet">{b}</li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Metrics */}
            <div className="exp-card__metrics">
                {exp.metrics.map((m, i) => (
                    <MetricItem key={i} metric={m} />
                ))}
            </div>
        </motion.div>
    )
}

const MetricItem = ({ metric }) => {
    const c = useCountUp(metric.val)
    return (
        <div className="exp-metric" ref={c.ref}>
            <span className="exp-metric__val">
                {String(metric.val).replace(/[0-9.]+/, c.count)}
                <span className="exp-metric__suffix">{metric.suffix}</span>
            </span>
            <span className="exp-metric__lbl">{metric.lbl}</span>
        </div>
    )
}

const EduCard = ({ edu, idx }) => {
    const tilt = useTilt(8)
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="edu-card"
            style={{ '--card-accent': edu.accent, ...tilt.style }}
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
        >
            <div className="edu-card__glow" />
            <div className="edu-card__noise" />
            <span className="edu-card__badge">{edu.badge}</span>
            <span className="edu-card__period">{edu.period}</span>
            <h3 className="edu-card__degree">{edu.degree}</h3>
            <span className="edu-card__school">{edu.school}</span>
            <ul className="edu-card__highlights">
                {edu.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
        </motion.div>
    )
}

const Experience = () => (
    <>
        <section className="experience" id="experience">
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                className="section-tag"
            >
                02 // QUEST LOG
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
            >
                Quest <span className="glow-text glow-text--fire">History</span>
            </motion.h2>

            <div className="experience__timeline">
                {experiences.map((exp, idx) => (
                    <ExpCard key={exp.company} exp={exp} idx={idx} />
                ))}
            </div>
        </section>

        <hr className="section-divider" />

        <section className="education" id="education">
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                className="section-tag"
            >
                02.5 // SKILL TREE
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
            >
                Training <span className="glow-text glow-text--cyan">Grounds</span>
            </motion.h2>
            <div className="edu-grid">
                {education.map((edu, idx) => (
                    <EduCard key={edu.school} edu={edu} idx={idx} />
                ))}
            </div>
        </section>
    </>
)

export default Experience
