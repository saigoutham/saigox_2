import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { identity } from '../data/resume'
import { selfPhotos } from '../data/imageManifest'

gsap.registerPlugin(ScrollTrigger)

const Identity = () => {
    const sectionRef = useRef(null)
    const photoRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Photo parallax
            gsap.to(photoRef.current, {
                yPercent: -15,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // Content stagger reveal
            const elements = contentRef.current.querySelectorAll('.reveal-item')
            gsap.from(elements, {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
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
        <section ref={sectionRef} className="scene identity" id="identity">
            <div className="identity__photo-wrapper">
                <img
                    ref={photoRef}
                    src={selfPhotos.hero}
                    alt={identity.name}
                    className="identity__photo"
                    loading="lazy"
                />
                <div className="identity__photo-overlay" />
                <div className="identity__photo-frame" />
            </div>

            <div ref={contentRef} className="identity__content">
                <span className="label-tag reveal-item">About</span>

                <h2 className="identity__statement reveal-item">
                    I build <span>monetization systems</span> that generate{' '}
                    <span>$80M+</span> in annual revenue — and photograph{' '}
                    <span>wildlife</span> in my downtime.
                </h2>

                <p className="identity__bio reveal-item">
                    Product Manager at Scopely, ex-Visa Senior Engineer, IIM Lucknow MBA.
                    I've scaled live games, built petabyte-scale data infrastructure, and
                    co-founded an indie gaming studio. When I'm not optimizing player segments,
                    you'll find me in Indian national parks with a Nikon.
                </p>

                <div className="identity__stats reveal-item">
                    <div className="identity__stat">
                        <span className="identity__stat-value">$80M+</span>
                        <span className="identity__stat-label">Revenue</span>
                    </div>
                    <div className="identity__stat">
                        <span className="identity__stat-value">100M+</span>
                        <span className="identity__stat-label">Daily TXN</span>
                    </div>
                    <div className="identity__stat">
                        <span className="identity__stat-value">2×</span>
                        <span className="identity__stat-label">EOY Awards</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Identity
