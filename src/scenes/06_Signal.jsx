import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react'
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

            <h2
                className="display-heading display-heading--lg signal__heading signal-reveal"
                style={{ marginTop: '16px' }}
            >
                Let's build<br />
                <span className="accent-text">something</span>
            </h2>

            <p className="signal__sub signal-reveal">
                Open to product leadership roles, consulting, and creative collaborations.
            </p>

            <div className="signal__links signal-reveal">
                <a
                    href={`mailto:${identity.email}`}
                    className="signal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Mail /> Email
                </a>
                <a
                    href={identity.linkedin}
                    className="signal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Linkedin /> LinkedIn
                </a>
                <a
                    href={`tel:${identity.phone}`}
                    className="signal__link"
                >
                    <Phone /> Call
                </a>
                <div className="signal__link">
                    <MapPin /> {identity.location}
                </div>
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
