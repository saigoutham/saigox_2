import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/SectionProgress.css'

const SECTIONS = [
    { id: 'intro', label: 'Home' },
    { id: 'identity', label: 'About' },
    { id: 'arsenal', label: 'Skills' },
    { id: 'campaigns', label: 'Career' },
    { id: 'credentials', label: 'Exp' },
    { id: 'gallery', label: 'Lens' },
    { id: 'case-studies', label: 'Ops' },
    { id: 'testimonials', label: 'Intel' },
    { id: 'signal', label: 'Signal' },
]

const SectionProgress = () => {
    const [activeSection, setActiveSection] = useState('intro')

    useEffect(() => {
        SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return

            ScrollTrigger.create({
                trigger: el,
                start: 'top 40%',
                end: 'bottom 40%',
                onToggle: (self) => {
                    if (self.isActive) setActiveSection(id)
                },
            })
        })
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <nav className="section-nav" aria-label="Section navigation">
            <div className="section-nav__track">
                {SECTIONS.map((section) => (
                    <button
                        key={section.id}
                        className={`section-nav__dot ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => scrollTo(section.id)}
                        aria-label={`Scroll to ${section.label}`}
                    >
                        <span className="section-nav__label">{section.label}</span>
                        <div className="section-nav__point" />
                    </button>
                ))}
            </div>
        </nav>
    )
}

export default SectionProgress
