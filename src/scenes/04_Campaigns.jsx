import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Briefcase, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { experiences } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

const CampaignCard = ({ exp }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="campaign-entry glass-card" style={{ '--entry-accent': exp.accent }}>
            {/* Company name — THE HERO */}
            <h3 className="campaign-entry__company">{exp.company}</h3>

            <div className="campaign-entry__accent-bar" />

            <div className="campaign-entry__badge">{exp.badge}</div>

            <div className="campaign-entry__meta">
                <span className="campaign-entry__role">
                    <Briefcase size={14} /> {exp.role}
                </span>
                <span className="campaign-entry__period">
                    <Calendar size={14} /> {exp.period}
                </span>
            </div>

            {/* METRICS — visual first, always visible */}
            <div className="campaign-entry__metrics">
                {exp.metrics.map((m, j) => (
                    <div key={j} className="campaign-metric">
                        <span className="campaign-metric__value">{m.val}</span>
                        <span className="campaign-metric__label">{m.label}</span>
                    </div>
                ))}
            </div>

            {/* Expandable detail — text on demand */}
            <button className="campaign-entry__expand" onClick={() => setExpanded(!expanded)}>
                <span>{expanded ? 'Hide details' : 'View details'}</span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {expanded && (
                <div className="campaign-entry__details">
                    {exp.sections ? (
                        exp.sections.map((section, si) => (
                            <div key={si} className="campaign-entry__section">
                                <h4 className="campaign-entry__section-title">{section.title}</h4>
                                <ul className="campaign-entry__bullets">
                                    {section.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <ul className="campaign-entry__bullets">
                            {exp.highlights.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

const Campaigns = () => {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Safe animation — only y transform
            const entries = sectionRef.current.querySelectorAll('.campaign-entry')
            entries.forEach((entry, i) => {
                gsap.fromTo(entry,
                    { y: 60 },
                    {
                        y: 0, duration: 0.8, ease: 'power3.out',
                        scrollTrigger: { trigger: entry, start: 'top 85%' }
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
                <div ref={headerRef} className="campaigns__header">
                    <span className="label-tag">Experience</span>
                    <h2 className="display-heading display-heading--lg" style={{ marginTop: '16px' }}>
                        Career<br />
                        <span className="accent-text">campaigns</span>
                    </h2>
                </div>

                {sorted.map((exp) => (
                    <CampaignCard key={exp.id} exp={exp} />
                ))}
            </div>
        </section>
    )
}

export default Campaigns
