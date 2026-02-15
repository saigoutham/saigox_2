import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'
import '../styles/CaseStudies.css'

gsap.registerPlugin(ScrollTrigger)

const CASE_STUDIES = [
    {
        id: 'spin-wheel',
        title: 'Spin Wheel Architecture',
        company: 'Scopely',
        category: 'Monetization & LiveOps',
        impact: '10× Revenue Lift',
        description: 'Reengineered a legacy monetization mechanic into a high-conversion jackpot system with segmented reward tiers.',
        tags: ['Segmentation', 'Jackpot Mechanics', 'LiveOps'],
        metrics: [
            { label: 'Daily Revenue', val: '+$3K', color: '#84CC16' },
            { label: 'New Payers', val: '1,000+', color: '#22D3EE' }
        ],
        accent: '#84CC16'
    },
    {
        id: 'd2c-store',
        title: 'Direct-to-Customer Store',
        company: 'Scopely',
        category: 'Strategic Growth',
        impact: '5% Revenue Share',
        description: 'Launched a segmented web store with personalized offers, scaling from concept to 5% of total revenue in 10 months.',
        tags: ['D2C', 'Personalization', 'Pricing Strategy'],
        metrics: [
            { label: 'Margin Lift', val: '22%', color: '#FF6B35' },
            { label: 'Rev Share', val: '5%', color: '#FFD700' }
        ],
        accent: '#FFD700'
    },
    {
        id: 'hellmark-growth',
        title: 'Hel(l)Mark Turnaround',
        company: 'IIM Lucknow',
        category: 'Operations & Strategy',
        impact: '94% YoY Growth',
        description: 'Transformed the official merchandise store through an operational overhaul and aggressive product expansion.',
        tags: ['Entrepreneurship', 'Retail Operations', 'NPS'],
        metrics: [
            { label: 'Total Revenue', val: '₹20L+', color: '#FF6B35' },
            { label: 'YoY Growth', val: '94%', color: '#22D3EE' }
        ],
        accent: '#FF6B35'
    }
]

const CaseStudies = () => {
    const sectionRef = useRef(null)
    const cardsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.case-study-card', {
                y: 60,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 85%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="scene case-studies" id="case-studies">
            <div className="case-studies__inner">
                <div className="case-studies__header">
                    <span className="label-tag">Tactical Reports</span>
                    <h2 className="display-heading display-heading--lg">
                        Strategic <span className="accent-text">Missions</span>
                    </h2>
                </div>

                <div ref={cardsRef} className="case-studies__grid">
                    {CASE_STUDIES.map((study) => (
                        <div key={study.id} className="case-study-card glass-card">
                            <div className="case-study-card__accent" style={{ background: study.accent }} />

                            <div className="case-study-card__content">
                                <div className="case-study-card__top">
                                    <div className="case-study-card__meta">
                                        <span className="case-study-card__company">{study.company}</span>
                                        <span className="case-study-card__category">{study.category}</span>
                                    </div>
                                    <div className="case-study-card__impact-badge" style={{ color: study.accent, borderColor: `${study.accent}40` }}>
                                        {study.impact}
                                    </div>
                                </div>

                                <h3 className="case-study-card__title">{study.title}</h3>
                                <p className="case-study-card__desc">{study.description}</p>

                                <div className="case-study-card__metrics">
                                    {study.metrics.map((m, idx) => (
                                        <div key={idx} className="case-study-metric">
                                            <span className="case-study-metric__val" style={{ color: m.color }}>{m.val}</span>
                                            <span className="case-study-metric__label">{m.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="case-study-card__footer">
                                    <div className="case-study-card__tags">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="case-study-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <button className="case-study-card__btn" style={{ '--accent': study.accent }}>
                                        View Report <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CaseStudies
