import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
    { src: '/images/photography/DSC_2134-Enhanced-NR.jpg', alt: 'Wildlife — Red Fox', category: 'Wildlife' },
    { src: '/images/photography/DSC_2846.jpg', alt: 'Macro — Dragonfly', category: 'Macro' },
    { src: '/images/photography/DSC_3015.jpg', alt: 'Macro — Ant Detail', category: 'Macro' },
    { src: '/images/photography/DSC_2767.jpg', alt: 'Landscape — High Peaks', category: 'Landscape' },
    { src: '/images/photography/DSC_1946.jpg', alt: 'Wildlife — Majestic Lion', category: 'Wildlife' },
    { src: '/images/photography/DSC_1971.jpg', alt: 'Wildlife — Spotted Deer', category: 'Wildlife' },
    { src: '/images/photography/DSC_2074.jpg', alt: 'Wildlife — Kingfisher', category: 'Wildlife' },
    { src: '/images/photography/DSC_2106.jpg', alt: 'Wildlife — Eagle Perched', category: 'Wildlife' },
    { src: '/images/photography/DSC_2136-Enhanced-NR.jpg', alt: 'Macro — Butterfly Wings', category: 'Macro' },
    { src: '/images/photography/DSC_2203-Enhanced-NR.jpg', alt: 'Macro — Spider Web', category: 'Macro' },
    { src: '/images/photography/DSC_2281.jpg', alt: 'Landscape — River Valley', category: 'Landscape' },
    { src: '/images/photography/DSC_2347-Enhanced-NR-2.jpg', alt: 'Macro — Beetle Close-up', category: 'Macro' },
    { src: '/images/photography/DSC_2386.jpg', alt: 'Landscape — Mountain Mist', category: 'Landscape' },
    { src: '/images/photography/DSC_2505.jpg', alt: 'Wildlife — Heron Fishing', category: 'Wildlife' },
]

const categories = ['ALL', ...new Set(images.map(i => i.category))]

const Photography = () => {
    const [filter, setFilter] = useState('ALL')
    const [selectedImg, setSelectedImg] = useState(null)
    const trackRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const filtered = filter === 'ALL' ? images : images.filter(i => i.category === filter)

    // Mouse drag scroll
    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - trackRef.current.offsetLeft)
        setScrollLeft(trackRef.current.scrollLeft)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - trackRef.current.offsetLeft
        const walk = (x - startX) * 1.5
        trackRef.current.scrollLeft = scrollLeft - walk
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    return (
        <section className="photography" id="photography">
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                className="section-tag"
            >
                03 // GALLERY
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="section-heading"
            >
                Through the <span className="glow-text glow-text--cyan">Lens</span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                className="photography__subtitle"
            >
                Wildlife & macro photography across India's national parks — drag to explore →
            </motion.p>

            {/* Filter bar */}
            <div className="photography__filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'filter-btn--active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                        {filter === cat && (
                            <motion.div layoutId="filter-indicator" className="filter-btn__indicator" />
                        )}
                    </button>
                ))}
            </div>

            {/* Horizontal scroll reel — preserves aspect ratios */}
            <div
                className="photography__reel"
                ref={trackRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((img, idx) => (
                        <motion.div
                            key={img.src}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="reel-card"
                            onClick={() => !isDragging && setSelectedImg(img)}
                        >
                            <img src={img.src} alt={img.alt} className="reel-card__img" draggable={false} />
                            <div className="reel-card__overlay">
                                <span className="reel-card__category">{img.category}</span>
                                <span className="reel-card__title">{img.alt}</span>
                            </div>
                            <div className="reel-card__border" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Drag hint */}
            <div className="photography__drag-hint">
                <span>◀</span>
                <span className="photography__drag-text">DRAG TO EXPLORE</span>
                <span>▶</span>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lightbox"
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ ease: [0.16, 1, 0.3, 1] }}
                            src={selectedImg.src}
                            alt={selectedImg.alt}
                            className="lightbox__image"
                        />
                        <div className="lightbox__info">
                            <div>
                                <span className="lightbox__category">{selectedImg.category}</span>
                                <span className="lightbox__title">{selectedImg.alt}</span>
                            </div>
                            <span className="lightbox__close">ESC / CLICK TO CLOSE</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Photography
