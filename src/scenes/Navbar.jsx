import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NAV_ITEMS = [
    { id: 'intro', label: 'Home' },
    { id: 'identity', label: 'About' },
    { id: 'arsenal', label: 'Skills' },
    { id: 'campaigns', label: 'Career' },
    { id: 'credentials', label: 'Education' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'signal', label: 'Contact' },
]

const Navbar = () => {
    const navRef = useRef(null)
    const [activeSection, setActiveSection] = useState('intro')
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
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

        // Auto-hide on scroll down, show on scroll up
        const handleScroll = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 60)
            if (currentY > lastScrollY.current && currentY > 300) {
                setHidden(true)
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
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav
            ref={navRef}
            className={`navbar ${hidden ? 'navbar--hidden' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}
        >
            <div className="navbar__inner">
                <button className="navbar__logo" onClick={() => scrollTo('intro')}>
                    SGV
                </button>

                <div className="navbar__links">
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

                <button className="navbar__cta" onClick={() => scrollTo('signal')}>
                    Let's Talk
                </button>
            </div>
        </nav>
    )
}

export default Navbar
