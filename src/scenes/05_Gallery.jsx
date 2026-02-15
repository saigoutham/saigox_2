import React, { useEffect, useRef, useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/Gallery.css'
import { Camera, X, ChevronLeft, ChevronRight, Aperture } from 'lucide-react'
import { photography } from '../data/imageManifest'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
    const sectionRef = useRef(null)
    const headerRef = useRef(null)
    const gridRef = useRef(null)
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const [activeFilter, setActiveFilter] = useState('All')

    const categories = useMemo(() => {
        const cats = [...new Set(photography.map((p) => p.category))]
        return ['All', ...cats]
    }, [])

    const filteredPhotos = useMemo(() => {
        if (activeFilter === 'All') return photography
        return photography.filter((p) => p.category === activeFilter)
    }, [activeFilter])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current.children, {
                y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    useEffect(() => {
        if (!gridRef.current) return
        const items = gridRef.current.querySelectorAll('.gallery__item')
        gsap.fromTo(items,
            { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.1 },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                scale: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
    }, [activeFilter])

    const goNext = (e) => {
        e.stopPropagation()
        setLightboxIndex((i) => (i + 1) % filteredPhotos.length)
    }
    const goPrev = (e) => {
        e.stopPropagation()
        setLightboxIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length)
    }

    useEffect(() => {
        const handleKey = (e) => {
            if (lightboxIndex === null) return
            if (e.key === 'Escape') setLightboxIndex(null)
            if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % filteredPhotos.length)
            if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [lightboxIndex, filteredPhotos.length])

    return (
        <section ref={sectionRef} className="scene gallery" id="gallery">
            <div className="gallery__inner">
                <div ref={headerRef} className="gallery__header">
                    <div className="gallery__header-top">
                        <div>
                            <span className="label-tag">
                                <Aperture size={12} style={{ marginRight: '8px', verticalAlign: '-1px' }} />
                                Photography
                            </span>
                            <h2 className="display-heading display-heading--lg" style={{ marginTop: '16px' }}>
                                Through the<br />
                                <span className="accent-text">viewfinder</span>
                            </h2>
                            <p className="body-text" style={{ marginTop: '16px' }}>
                                Wildlife, macro, and landscapes from national parks across India. Shot on Nikon.
                            </p>
                        </div>

                    </div>

                    {/* Category filters */}
                    <div className="gallery__filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`gallery__filter ${activeFilter === cat ? 'gallery__filter--active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={gridRef} className="gallery__grid">
                    {filteredPhotos.map((photo, i) => (
                        <div
                            key={photo.src + activeFilter}
                            className="gallery__item"
                            onClick={() => setLightboxIndex(i)}
                        >
                            <img src={photo.src} alt={photo.alt} loading="lazy" />
                            <div className="gallery__item-overlay">
                                <div className="gallery__item-info">
                                    <span className="gallery__item-title">{photo.alt}</span>
                                    <span className="gallery__item-category">{photo.category}</span>
                                </div>
                                <div className="gallery__item-lens">
                                    <Camera size={16} />
                                </div>
                            </div>
                            {/* Film strip decoration */}
                            <div className="gallery__item-strip" />
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setLightboxIndex(null)}
                    >
                        <button className="lightbox__close" onClick={() => setLightboxIndex(null)}>
                            <X size={18} />
                        </button>

                        <button className="lightbox__nav lightbox__nav--prev" onClick={goPrev}>
                            <ChevronLeft size={24} />
                        </button>

                        <motion.img
                            key={filteredPhotos[lightboxIndex].src}
                            src={filteredPhotos[lightboxIndex].src}
                            alt={filteredPhotos[lightboxIndex].alt}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />

                        <button className="lightbox__nav lightbox__nav--next" onClick={goNext}>
                            <ChevronRight size={24} />
                        </button>

                        <div className="lightbox__info">
                            <span className="lightbox__title">{filteredPhotos[lightboxIndex].alt}</span>
                            <span className="lightbox__category">{filteredPhotos[lightboxIndex].category}</span>
                            <span className="lightbox__counter">
                                {lightboxIndex + 1} / {filteredPhotos.length}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Gallery
