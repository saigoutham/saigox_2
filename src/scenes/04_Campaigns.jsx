import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    Briefcase, Calendar, ChevronDown, ChevronUp,
    TrendingUp, DollarSign, Users, Target,
    FlaskConical, BarChart3, Database, CreditCard,
    Rocket, ShoppingBag, Package, Zap
} from 'lucide-react'
import { experiences } from '../data/resume'

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
                    <span className="campaign-card__hero-value">{exp.metrics[0]?.val}</span>
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
                                        <span className="campaign-infographic__donut-value">{m.val}</span>
                                    </div>
                                ) : (
                                    <div className="campaign-infographic__icon-wrap" style={{ '--metric-color': config.color }}>
                                        <MetricIcon size={22} strokeWidth={1.5} />
                                    </div>
                                )}
                            </div>
                            {config.type !== 'donut' && (
                                <span className="campaign-infographic__value">{m.val}</span>
                            )}
                            <span className="campaign-infographic__label">{m.label}</span>
                        </div>
                    )
                })}
            </div>

            {/* ── Key highlights strip (always visible summary) ── */}
            {exp.highlights && (
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
            <button className="campaign-card__expand" onClick={() => setExpanded(!expanded)}>
                <span>{expanded ? 'Hide details' : 'View details'}</span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {expanded && (
                <div className="campaign-card__details">
                    {exp.sections ? (
                        exp.sections.map((section, si) => (
                            <div key={si} className="campaign-card__section">
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
                </div>
            )}

            {/* Ambient glow */}
            <div className="campaign-card__glow" />
        </div>
    )
}

const Campaigns = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current.querySelectorAll('.campaign-card')
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 80, scale: 0.97 },
                    {
                        y: 0, scale: 1, duration: 1, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 88%' }
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

                <div className="campaigns__cards">
                    {sorted.map((exp, i) => (
                        <CampaignCard key={exp.id} exp={exp} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Campaigns
