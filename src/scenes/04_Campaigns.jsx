import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import CountUp from '../components/CountUp'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    Briefcase, Calendar, ChevronDown, ChevronUp,
    TrendingUp, DollarSign, Users, Target,
    FlaskConical, BarChart3, Database, CreditCard,
    Rocket, ShoppingBag, Package, Zap
} from 'lucide-react'
import { experiences } from '../data/resume'
import '../styles/Campaigns.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Icon map for metrics ── */
const metricIcons = {
    'ANNUAL REVENUE': DollarSign,
    'REVENUE LIFT': TrendingUp,
    'DAILY COHORTS': Users,
    'A/B TESTS': FlaskConical,
    'DATA PROCESSED': Database,
    'DAILY TXN': CreditCard,
    'EMPLOYEE OF YEAR': Target,
    'REVENUE': DollarSign,
    'YOY GROWTH': TrendingUp,
    'PRODUCTS': Package,
    'ORDERS': ShoppingBag,
}

/* ── Donut Ring SVG ── */
const DonutRing = ({ percent, color, size = 64 }) => {
    const r = (size - 8) / 2
    const circumference = 2 * Math.PI * r
    const offset = circumference * (1 - percent / 100)
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-ring">
            <circle cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
            <circle cx={size / 2} cy={size / 2} r={r}
                fill="none" stroke={color} strokeWidth="4"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
            />
        </svg>
    )
}

/* ── Progress bar ── */
const ProgressBar = ({ value, max, color, label }) => {
    const barRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!barRef.current) return
        const trigger = ScrollTrigger.create({
            trigger: barRef.current,
            start: 'top 90%',
            onEnter: () => setVisible(true),
        })
        return () => trigger.kill()
    }, [])

    const percent = Math.min((value / max) * 100, 100)

    return (
        <div ref={barRef} className="progress-metric">
            <div className="progress-metric__header">
                <span className="progress-metric__label">{label}</span>
                <span className="progress-metric__value" style={{ color }}>{value}</span>
            </div>
            <div className="progress-metric__track">
                <div
                    className="progress-metric__fill"
                    style={{
                        width: visible ? `${percent}%` : '0%',
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                    }}
                />
                <div
                    className="progress-metric__glow"
                    style={{
                        left: visible ? `${percent}%` : '0%',
                        background: color,
                    }}
                />
            </div>
        </div>
    )
}

/* ── Map metrics to visual types ── */
const getMetricVisualConfig = (metric, accent) => {
    const val = metric.val
    const label = metric.label

    // Parse numeric-ish value
    const numericMatch = val.match(/([\d.]+)/)
    const numVal = numericMatch ? parseFloat(numericMatch[1]) : 0

    // Decide visual type
    if (val.includes('×') || val.includes('x')) {
        return { type: 'donut', percent: Math.min(numVal * 10, 100), color: accent }
    }
    if (val.includes('%')) {
        return { type: 'donut', percent: numVal, color: accent }
    }
    if (val.includes('$') || val.includes('₹')) {
        return { type: 'progress', value: val, max: 100, percent: 85, color: accent }
    }
    return { type: 'tile', color: accent }
}

/* ── Single Campaign Card ── */
const CampaignCard = ({ exp, index }) => {
    const [expanded, setExpanded] = useState(false)
    const cardRef = useRef(null)

    const Icon = (label) => metricIcons[label] || Zap

    return (
        <div ref={cardRef} className="campaign-card glass-card" style={{ '--card-accent': exp.accent }}>
            {/* Decorative accent strip */}
            <div className="campaign-card__accent-strip" />

            {/* ── Header Zone ── */}
            <div className="campaign-card__header">
                <div className="campaign-card__header-left">
                    <div className="campaign-card__badge">{exp.badge}</div>
                    <h3 className="campaign-card__company">{exp.company}</h3>
                    <div className="campaign-card__meta">
                        <span className="campaign-card__role">
                            <Briefcase size={14} /> {exp.role}
                        </span>
                        <span className="campaign-card__period">
                            <Calendar size={14} /> {exp.period}
                        </span>
                    </div>
                </div>
                {/* Big accent number — the hero metric */}
                <div className="campaign-card__hero-metric">
                    <span className="campaign-card__hero-value">
                        <CountUp
                            value={exp.metrics[0]?.val}
                            prefix={exp.metrics[0]?.val.startsWith('$') ? '$' : exp.metrics[0]?.val.startsWith('₹') ? '₹' : ''}
                            suffix={exp.metrics[0]?.val.replace(/[\d.$₹]/g, '')}
                        />
                    </span>
                    <span className="campaign-card__hero-label">{exp.metrics[0]?.label}</span>
                </div>
            </div>

            {/* ── Infographic Zone ── */}
            <div className="campaign-card__infographics">
                {exp.metrics.map((m, j) => {
                    const config = getMetricVisualConfig(m, exp.accent)
                    const MetricIcon = Icon(m.label)
                    return (
                        <div key={j} className="campaign-infographic">
                            <div className="campaign-infographic__visual">
                                {config.type === 'donut' ? (
                                    <div className="campaign-infographic__donut-wrap">
                                        <DonutRing percent={config.percent} color={config.color} size={72} />
                                        <span className="campaign-infographic__donut-value">
                                            <CountUp
                                                value={m.val}
                                                prefix={m.val.startsWith('$') ? '$' : m.val.startsWith('₹') ? '₹' : ''}
                                                suffix={m.val.replace(/[\d.$₹]/g, '')}
                                            />
                                        </span>
                                    </div>
                                ) : (
                                    <div className="campaign-infographic__icon-wrap" style={{ '--metric-color': config.color }}>
                                        <MetricIcon size={22} strokeWidth={1.5} />
                                    </div>
                                )}
                            </div>
                            {config.type !== 'donut' && (
                                <span className="campaign-infographic__value">
                                    <CountUp
                                        value={m.val}
                                        prefix={m.val.startsWith('$') ? '$' : m.val.startsWith('₹') ? '₹' : ''}
                                        suffix={m.val.replace(/[\d.$₹]/g, '')}
                                    />
                                </span>
                            )}
                            <span className="campaign-infographic__label">{m.label}</span>
                        </div>
                    )
                })}
            </div>

            {/* ── Key highlights strip (visible only when collapsed or for hero items) ── */}
            {exp.highlights && !expanded && (
                <div className="campaign-card__highlights-strip">
                    {exp.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="campaign-highlight">
                            <span className="campaign-highlight__dot" style={{ background: exp.accent }} />
                            <span className="campaign-highlight__text">{h}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Expandable details ── */}
            {exp.sections && (
                <button
                    className="campaign-card__expand"
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label={expanded ? 'Hide project details' : 'View project details'}
                >
                    <span>{expanded ? 'Hide details' : 'View details'}</span>
                    {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
            )}

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="campaign-card__details"
                        style={{ overflow: 'hidden' }}
                    >
                        {exp.sections ? (
                            exp.sections.map((section, si) => (
                                <div key={si} className="campaign-card__section" style={{ paddingBottom: '16px' }}>
                                    <h4 className="campaign-card__section-title">{section.title}</h4>
                                    <ul className="campaign-card__bullets">
                                        {section.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <ul className="campaign-card__bullets">
                                {exp.highlights.map((b, j) => <li key={j}>{b}</li>)}
                            </ul>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient glow */}
            <div className="campaign-card__glow" />
        </div>
    )
}

const Campaigns = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline progress animation
            gsap.to('.campaigns__timeline-progress', {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.campaigns__timeline-container',
                    start: 'top 70%',
                    end: 'bottom 70%',
                    scrub: true
                }
            })

            const cards = sectionRef.current.querySelectorAll('.campaign-card')
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { x: 50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 88%' }
                    }
                )
            })

            // Dot animations
            const dots = sectionRef.current.querySelectorAll('.campaign-timeline-dot')
            dots.forEach((dot, i) => {
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
                        scrollTrigger: { trigger: dot, start: 'top 80%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    const sorted = [...experiences].reverse()

    return (
        <section ref={sectionRef} className="scene campaigns" id="campaigns">
            <div className="campaigns__inner">
                <div className="campaigns__header">
                    <span className="label-tag">Experience</span>
                    <h2 className="display-heading display-heading--lg" style={{ marginTop: '16px' }}>
                        Career<br />
                        <span className="accent-text">campaigns</span>
                    </h2>
                    <p className="campaigns__subtitle">
                        From building petabyte-scale data pipelines to driving $80M+ in gaming revenue.
                    </p>
                </div>

                <div className="campaigns__timeline-container">
                    {/* Vertical line that fills on scroll */}
                    <div className="campaigns__timeline-line">
                        <div className="campaigns__timeline-progress" />
                    </div>

                    <div className="campaigns__cards">
                        {sorted.map((exp, i) => (
                            <div key={exp.id} className="campaign-timeline-item">
                                <div className="campaign-timeline-node">
                                    <div className="campaign-timeline-dot" style={{ '--node-accent': exp.accent }} />
                                </div>
                                <CampaignCard exp={exp} index={i} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Campaigns
