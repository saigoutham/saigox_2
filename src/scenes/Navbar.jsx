import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Navbar.css'


const NAV_ITEMS = [
    { id: 'intro', label: 'Home' },
    { id: 'identity', label: 'About' },
    { id: 'arsenal', label: 'Skills' },
    { id: 'campaigns', label: 'Career' },
    { id: 'credentials', label: 'Education' },
    { id: 'gallery', label: 'Lens' },
    { id: 'case-studies', label: 'Missions' },
    { id: 'testimonials', label: 'Field' },
    { id: 'signal', label: 'Signal' },
]

const Navbar = () => {
    const navRef = useRef(null)
    const [activeSection, setActiveSection] = useState('intro')
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)
    const lastScrollY = useRef(0)

    useEffect(() => {
        // Track active section
        NAV_ITEMS.forEach(({ id }) => {
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

        // Auto-hide on scroll down, show on scroll up + progress
        const handleScroll = () => {
            const currentY = window.scrollY
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress((currentY / totalScroll) * 100)

            setScrolled(currentY > 60)
            if (currentY > lastScrollY.current && currentY > 300) {
                setHidden(true)
                setMobileMenuOpen(false)
            } else {
                setHidden(false)
            }
            lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            setMobileMenuOpen(false)
        }
    }

    return (
        <>
            <nav
                ref={navRef}
                className={`navbar ${hidden ? 'navbar--hidden' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}
            >
                {/* Scroll Progress Bar */}
                <div
                    className="navbar__progress"
                    style={{ width: `${scrollProgress}%` }}
                />

                <div className="navbar__inner">
                    <button className="navbar__logo" onClick={() => scrollTo('intro')}>
                        SGV
                    </button>

                    <div className="navbar__links navbar__links--desktop">
                        {NAV_ITEMS.map(({ id, label }) => (
                            <button
                                key={id}
                                className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                                onClick={() => scrollTo(id)}
                            >
                                {label}
                                {activeSection === id && <span className="navbar__link-indicator" />}
                            </button>
                        ))}
                    </div>

                    <div className="navbar__actions">
                        <button className="navbar__cta" onClick={() => scrollTo('signal')}>
                            Let's Talk
                        </button>

                        <button
                            className="navbar__mobile-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu--open' : ''}`}>
                <div className="mobile-menu__links">
                    {NAV_ITEMS.map(({ id, label }, i) => (
                        <button
                            key={id}
                            className="mobile-menu__link"
                            onClick={() => scrollTo(id)}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <span className="mobile-menu__num">0{i + 1}</span>
                            <span className="mobile-menu__label">{label}</span>
                        </button>
                    ))}
                    <button
                        className="mobile-menu__cta"
                        onClick={() => scrollTo('signal')}
                    >
                        Let's Talk
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
