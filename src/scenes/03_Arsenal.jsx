import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Arsenal.css'
import {
    Target, BarChart3, Code2, Gamepad2, Brain,
    Layers, Zap, Rocket, Users, PieChart,
    Database, FlaskConical, LayoutGrid, TrendingUp,
    DollarSign, CreditCard
} from 'lucide-react'
import { skillCategories, characterStats } from '../data/resume'
import CountUp from '../components/CountUp'

gsap.registerPlugin(ScrollTrigger)

/* ── Metric tiles for visual impact ── */
const impactMetrics = [
    { icon: DollarSign, value: '$80M+', label: 'Revenue Owned', color: '#84CC16' },
    { icon: TrendingUp, value: '10×', label: 'Revenue Lift', color: '#FF6B35' },
    { icon: Users, value: '30+', label: 'Daily Cohorts', color: '#22D3EE' },
    { icon: FlaskConical, value: '50+', label: 'A/B Tests Run', color: '#A855F7' },
    { icon: Database, value: '1PB+', label: 'Data Processed', color: '#FFD700' },
    { icon: CreditCard, value: '100M+', label: 'Transactions', color: '#FF6B35' },
    { icon: Rocket, value: '15K+', label: 'Offers Launched', color: '#84CC16' },
    { icon: BarChart3, value: '22%', label: 'Margin Increase', color: '#22D3EE' },
]

const skillIcons = {
    'Roadmap Planning': Target, 'Feature Design': Layers, 'LiveOps Scheduling': Zap,
    'Monetization Systems': TrendingUp, 'Player Segmentation': Users, 'Revenue Forecasting': BarChart3,
    'Retention Optimization': Rocket, 'A/B Testing': FlaskConical, 'ARPDAU/ARPPU/LTV Tracking': PieChart,
    'Config Automation': LayoutGrid, 'Tableau': BarChart3, 'SQL': Database,
    'Python': Code2, 'React': Code2, 'JavaScript': Code2, 'Spark': Zap,
    'Hadoop': Database, 'Data Pipelines': Layers, 'DevOps': Rocket,
}

/* ── Radar Chart ── */
const RadarChart = ({ stats }) => {
    const cx = 150, cy = 150, maxR = 120
    const n = stats.length
    const points = stats.map((s, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        const r = (s.value / 100) * maxR
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle, stat: s }
    })
    const gridLevels = [0.25, 0.5, 0.75, 1]

    return (
        <svg viewBox="0 0 300 300" className="radar-svg">
            {gridLevels.map((lvl) => (
                <polygon key={lvl}
                    points={Array.from({ length: n }, (_, i) => {
                        const a = (Math.PI * 2 * i) / n - Math.PI / 2
                        return `${cx + maxR * lvl * Math.cos(a)},${cy + maxR * lvl * Math.sin(a)}`
                    }).join(' ')}
                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            {points.map((p, i) => (
                <line key={i} x1={cx} y1={cy}
                    x2={cx + maxR * Math.cos(p.angle)} y2={cy + maxR * Math.sin(p.angle)}
                    stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            <polygon points={points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="rgba(255, 107, 53, 0.08)" stroke="rgba(255, 107, 53, 0.6)" strokeWidth="1.5" />
            {points.map((p, i) => (
                <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4" fill="var(--accent)" opacity="0.9" />
                    <circle cx={p.x} cy={p.y} r="6" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.3">
                        <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
                    </circle>
                    <text
                        x={cx + (maxR + 25) * Math.cos(p.angle)}
                        y={cy + (maxR + 25) * Math.sin(p.angle)}
                        fill="var(--text-secondary)"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="var(--font-mono)"
                        textAnchor={p.angle > Math.PI / 2 || p.angle < -Math.PI / 2 ? 'end' : 'start'}
                        dominantBaseline="middle"
                    >{p.stat.axis}</text>
                </g>
            ))}
        </svg>
    )
}

const Arsenal = () => {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)
    const [flippedSkill, setFlippedSkill] = useState(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Safe animation — only transform, never opacity on inner elements
            const cards = sectionRef.current.querySelectorAll('.metric-tile')
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 40, scale: 0.95 },
                    {
                        y: 0, scale: 1, duration: 0.6, delay: i * 0.05, ease: 'back.out(1.4)',
                        scrollTrigger: { trigger: card, start: 'top 90%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="scene arsenal" id="arsenal">
            <div className="arsenal__inner">
                <div ref={headerRef} className="arsenal__header">
                    <span className="label-tag">Impact & Skills</span>
                    <h2 className="display-heading display-heading--lg" style={{ marginTop: '16px' }}>
                        Core<br />
                        <span className="accent-text">competencies</span>
                    </h2>
                </div>

                {/* ── IMPACT METRICS: 8-tile infographic grid ── */}
                <div className="arsenal__metrics-grid">
                    {impactMetrics.map((m, i) => {
                        const Icon = m.icon
                        // Extract prefix/suffix from the value string
                        const prefix = m.value.startsWith('$') ? '$' : m.value.startsWith('₹') ? '₹' : ''
                        const suffix = m.value.replace(/[\d.$₹]/g, '')

                        return (
                            <div key={i} className="metric-tile glass-card" style={{ '--tile-accent': m.color }}>
                                <div className="metric-tile__icon">
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <span className="metric-tile__value">
                                    <CountUp value={m.value} prefix={prefix} suffix={suffix} delay={i * 0.1} />
                                </span>
                                <span className="metric-tile__label">{m.label}</span>
                                <div className="metric-tile__glow" />
                            </div>
                        )
                    })}
                </div>

                {/* ── SKILLS: categorized visual tiles ── */}
                <div className="arsenal__skills-layout">
                    <div className="arsenal__skills-cats">
                        {skillCategories.map((cat, ci) => (
                            <div key={ci} className="skill-category glass-card">
                                <h3 className="skill-category__title">{cat.category}</h3>
                                <div className="skill-category__pills">
                                    {cat.skills.map((skill, si) => {
                                        const Icon = skillIcons[skill] || Code2
                                        return (
                                            <div key={si} className="skill-chip"
                                                onMouseEnter={() => setFlippedSkill(`${ci}-${si}`)}
                                                onMouseLeave={() => setFlippedSkill(null)}>
                                                <Icon size={14} strokeWidth={1.5} />
                                                <span>{skill}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="arsenal__radar-wrap glass-card">
                        <h3 className="skill-category__title" style={{ textAlign: 'center', marginBottom: '12px' }}>
                            Character Stats
                        </h3>
                        <RadarChart stats={characterStats} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Arsenal
