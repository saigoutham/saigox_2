import React, { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Identity.css'
import { identity } from '../data/resume'
import { selfPhotos } from '../data/imageManifest'
import CountUp from '../components/CountUp'

gsap.registerPlugin(ScrollTrigger)

const Identity = () => {
    const sectionRef = useRef(null)
    const photoRef = useRef(null)
    const contentRef = useRef(null)
    const statementRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Photo Cinematic Scale Scrub
            gsap.fromTo(photoRef.current,
                { scale: 1.15, yPercent: -5 },
                {
                    scale: 1,
                    yPercent: 5,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            )

            // Split text reveal for statement
            const words = statementRef.current.querySelectorAll('.word-reveal')
            gsap.fromTo(words,
                { y: 50, opacity: 0, rotateX: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    stagger: 0.05,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statementRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )

            // Bio & Stats stagger reveal
            const otherElements = contentRef.current.querySelectorAll('.reveal-item')
            gsap.from(otherElements, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.5, // Wait for text
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: statementRef.current, // Sync with statement
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Helper to split text into words
    const renderSplitText = (text, highlight = false) => {
        return text.split(' ').map((word, i) => (
            <span key={i} className={`word-reveal ${highlight ? 'accent-text' : ''}`} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {word}
            </span>
        ))
    }

    return (
        <section ref={sectionRef} className="scene identity" id="identity">
            <div className="identity__photo-wrapper">
                <img
                    ref={photoRef}
                    src={selfPhotos.hero}
                    alt={`${identity.name} - Professional Portrait`}
                    className="identity__photo"
                    loading="lazy"
                />
                <div className="identity__photo-overlay" />
                <div className="identity__photo-frame" />
            </div>

            <div ref={contentRef} className="identity__content">
                <span className="label-tag reveal-item">About</span>

                <h2 ref={statementRef} className="identity__statement">
                    {renderSplitText("I build")}
                    {renderSplitText("monetization systems", true)}
                    {renderSplitText("that generate")}
                    {renderSplitText("$80M+", true)}
                    {renderSplitText("in annual revenue — and photograph")}
                    {renderSplitText("wildlife", true)}
                    {renderSplitText("in my downtime.")}
                </h2>

                <p className="identity__bio reveal-item">
                    Product Manager at Scopely, ex-Visa Data Engineer, IIM Lucknow MBA.
                    I've scaled live games, built petabyte-scale data infrastructure, and
                    ran IIML's official merchandise store as CEO. When I'm not optimizing player segments,
                    you'll find me in parks with a Nikon.
                </p>

                <div className="identity__stats reveal-item">
                    <div className="identity__stat">
                        <span className="identity__stat-value">
                            <CountUp value="80" prefix="$" suffix="M+" />
                        </span>
                        <span className="identity__stat-label">Revenue</span>
                    </div>
                    <div className="identity__stat">
                        <span className="identity__stat-value">
                            <CountUp value="100" suffix="M+" />
                        </span>
                        <span className="identity__stat-label">Transactions</span>
                    </div>
                    <div className="identity__stat">
                        <span className="identity__stat-value">
                            <CountUp value="2" suffix="×" />
                        </span>
                        <span className="identity__stat-label">EOY Awards</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Identity
