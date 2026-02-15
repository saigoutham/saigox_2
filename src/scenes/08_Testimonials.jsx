import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'
import '../styles/Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
    {
        name: 'Senior Leadership',
        title: 'Visa Inc.',
        text: 'Venkata\'s ability to handle massive data pipelines with precision while maintaining ownership of complex outcomes was vital to our reporting success. A rare talent who bridges engineering and product judgment.',
        color: '#22D3EE'
    },
    {
        name: 'LiveOps Director',
        title: 'Scopely',
        text: 'A monetization architect who actually understands player psychology. The 10x revenue lift on our core mechanics speaks for itself. Extremely diligent and data-driven at every step.',
        color: '#84CC16'
    },
    {
        name: 'Executive Committee',
        title: 'Hel(l)Mark / IIML',
        text: 'Turned around a complex operational challenge into a high-growth retail success. Exceptional leadership and strategy skills showcased through tangible revenue milestones.',
        color: '#FF6B35'
    }
]

const Testimonials = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonial-card', {
                y: 60,
                autoAlpha: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.testimonials__grid',
                    start: 'top 85%',
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="scene testimonials" id="testimonials">
            <div className="testimonials__inner">
                <div className="testimonials__header">
                    <span className="label-tag">Field Reports</span>
                    <h2 className="display-heading display-heading--lg">
                        Direct <span className="accent-text">Endorsements</span>
                    </h2>
                </div>

                <div className="testimonials__grid">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="testimonial-card glass-card">
                            <Quote className="testimonial-card__quote-icon" style={{ color: t.color }} />
                            <p className="testimonial-card__text">"{t.text}"</p>
                            <div className="testimonial-card__footer">
                                <div className="testimonial-card__info">
                                    <span className="testimonial-card__name">{t.name}</span>
                                    <span className="testimonial-card__title" style={{ color: t.color }}>{t.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
