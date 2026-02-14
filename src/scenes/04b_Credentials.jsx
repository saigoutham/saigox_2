import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Trophy } from 'lucide-react'
import { education, awards } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

const Credentials = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Safe — only transform, never opacity
            const cards = sectionRef.current.querySelectorAll('.edu-card, .award-tile')
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { y: 30, scale: 0.97 },
                    {
                        y: 0, scale: 1, duration: 0.5, delay: i * 0.04, ease: 'back.out(1.2)',
                        scrollTrigger: { trigger: card, start: 'top 92%' }
                    }
                )
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="scene credentials" id="credentials">
            <div className="credentials__inner">
                <div className="credentials__header">
                    <span className="label-tag">
                        <GraduationCap size={12} style={{ marginRight: '8px' }} />
                        Education & Recognition
                    </span>
                    <h2 className="display-heading display-heading--lg" style={{ marginTop: '16px' }}>
                        Academic<br />
                        <span className="accent-text">credentials</span>
                    </h2>
                </div>

                {/* Education: visual stat cards — big number as hero */}
                <div className="credentials__edu-grid">
                    {education.map((edu, i) => (
                        <div key={i} className="edu-card glass-card" style={{ '--card-accent': edu.accent }}>
                            {/* Hero badge — the main visual */}
                            <div className="edu-card__hero-badge">{edu.badge}</div>

                            <h3 className="edu-card__school">{edu.school}</h3>
                            <p className="edu-card__degree">{edu.degree}</p>
                            <span className="edu-card__period">{edu.period}</span>

                            {/* Highlights — compact list */}
                            <div className="edu-card__highlights">
                                {edu.highlights.map((h, j) => (
                                    <span key={j} className="edu-card__tag">{h}</span>
                                ))}
                            </div>

                            <div className="edu-card__glow" />
                        </div>
                    ))}
                </div>

                {/* Awards */}
                <div className="credentials__awards-header">
                    <span className="label-tag">
                        <Trophy size={12} style={{ marginRight: '8px' }} />
                        Awards & Achievements
                    </span>
                </div>

                <div className="credentials__awards-grid">
                    {awards.map((award, i) => (
                        <div key={i} className="award-tile glass-card">
                            <span className="award-tile__icon">{award.icon}</span>
                            <h4 className="award-tile__title">{award.title}</h4>
                            <span className="award-tile__org">{award.org}</span>
                            {/* Detail on hover */}
                            <div className="award-tile__detail-overlay">
                                <p>{award.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Credentials
