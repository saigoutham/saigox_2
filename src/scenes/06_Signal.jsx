import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Signal.css'
import { Mail, Linkedin, Phone, MapPin, Rocket } from 'lucide-react'
import { identity } from '../data/resume'

gsap.registerPlugin(ScrollTrigger)

const Signal = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = sectionRef.current.querySelectorAll('.signal-reveal')
            gsap.from(elements, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 65%',
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="scene signal" id="signal">
            <span className="label-tag signal-reveal">Contact</span>

            <div className="signal__header-split signal-reveal">
                <div className="signal__header-left">
                    <h2 className="display-heading display-heading--lg signal__heading">
                        Let's build<br />
                        <span className="accent-text">something</span>
                    </h2>
                    <p className="signal__sub">
                        Open to product leadership roles, consulting, and creative collaborations.
                    </p>

                    <a
                        href="/Goutham_Vaddi_Resume.pdf"
                        download
                        className="signal__resume-btn glass-card"
                    >
                        <Rocket size={16} />
                        <span>Download Resume</span>
                    </a>
                </div>

                <div className="signal__header-right">
                    <a
                        href="https://fat-fingers.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="signal__side-project glass-card"
                    >
                        <div className="side-project__visual">
                            <img src="/images/fat-fingers.png" alt="Fat Fingers Project Screenshot" className="side-project__screenshot" />
                            <div className="side-project__overlay">
                                <Rocket size={16} />
                            </div>
                        </div>
                        <div className="side-project__content">
                            <div className="side-project__label">SIDE PROJECT</div>
                            <div className="side-project__name">Fat Fingers</div>
                        </div>
                    </a>
                </div>
            </div>

            <div className="signal__grid">
                <div className="signal__info">

                    <div className="signal__links signal-reveal">
                        <a
                            href={`mailto:${identity.email}`}
                            className="signal__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Send email to ${identity.name}`}
                        >
                            <Mail /> Email
                        </a>
                        <a
                            href={identity.linkedin}
                            className="signal__link"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit LinkedIn profile"
                        >
                            <Linkedin /> LinkedIn
                        </a>
                        <a
                            href={`tel:${identity.phone}`}
                            className="signal__link"
                            aria-label={`Call ${identity.name}`}
                        >
                            <Phone /> Call
                        </a>
                        <div className="signal__link">
                            <MapPin /> {identity.location}
                        </div>
                    </div>
                </div>

                <form
                    action="https://formspree.io/f/mqkenvba" // Placeholder ID, user can update
                    method="POST"
                    className="signal__form glass-card signal-reveal"
                >
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="john@example.com" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="4" placeholder="How can I help you?" required></textarea>
                    </div>
                    <button type="submit" className="signal__form-submit">
                        Send Message <Rocket size={16} />
                    </button>
                    <p className="form-note">Powered by Formspree</p>
                </form>
            </div>

            <div className="signal__footer signal-reveal">
                <div className="signal__footer-line" />
                <span className="signal__footer-text">
                    © {new Date().getFullYear()} {identity.name}
                </span>
                <span className="signal__footer-text">
                    Built with React, GSAP & Lenis
                </span>
            </div>
        </section>
    )
}

export default Signal
