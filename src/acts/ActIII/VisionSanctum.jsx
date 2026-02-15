import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'
import { photography } from '../../data/imageManifest'
import useTilt from '../../hooks/useTilt'

const categories = ['ALL', ...new Set(photography.map(p => p.category))]

/* ── Lightbox ── */
const Lightbox = ({ image, onClose }) => {
    if (!image) return null
    return (
        <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="lightbox__inner"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
            >
                <div className="lightbox__frame">
                    <img src={image.src} alt={image.alt} className="lightbox__img" />
                    <div className="lightbox__scanline" />
                </div>
                <div className="lightbox__info">
                    <div className="lightbox__meta">
                        <span className="lightbox__alt">{image.alt}</span>
                        <span className="lightbox__cat">CATEGORY // {image.category.toUpperCase()}</span>
                    </div>
                    <button className="lightbox__close" onClick={onClose}>
                        <span className="close-icon">✕</span>
                        <span className="close-text">CLOSE_UPLINK</span>
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

/* ── Photo Card ── */
const PhotoCard = ({ photo, index }) => {
    const openLightbox = useGameStore(s => s.openLightbox)
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(10)

    const getBentoClass = (idx) => {
        const pattern = [
            'photo-card--large', // 0
            '', // 1
            '', // 2
            'photo-card--wide', // 3
            '', // 4
            '', // 5
            'photo-card--large' // 6
        ]
        return pattern[idx % pattern.length] || ''
    }

    return (
        <motion.div
            ref={ref}
            className={`photo-card card-root ${getBentoClass(index)}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.06 }}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={() => openLightbox(photo)}
        >
            <div className="photo-card__img-wrap">
                <img src={photo.src} alt={photo.alt} className="photo-card__img" loading="lazy" />

                {/* Interactive Layers */}
                <div className="hud-glint" />
                <motion.div
                    className="hud-scanner"
                    animate={{ top: ['0%', '100%'], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: index * 0.4 }}
                />

                <div className="photo-card__overlay">
                    <div className="photo-card__hud">
                        <span className="hud-coord">X-RAY_{index + 1}</span>
                        <span className="hud-view">INITIATE_PREVIEW</span>
                    </div>
                </div>
            </div>
            <div className="photo-card__meta">
                <span className="photo-card__alt">{photo.alt}</span>
                <span className="photo-card__cat">{photo.category}</span>
            </div>
            <div className="photo-card__border" />
        </motion.div>
    )
}

const VisionSanctum = () => {
    const [filter, setFilter] = useState('ALL')
    const lightboxImage = useGameStore(s => s.lightboxImage)
    const closeLightbox = useGameStore(s => s.closeLightbox)

    const filtered = filter === 'ALL' ? photography : photography.filter(p => p.category === filter)

    return (
        <section className="vision-sanctum">
            <div className="sanctum-container">
                <motion.div
                    className="sanctum-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="section-tag">ZONE_03 // VISION_SANCTUM</span>
                    <h2 className="section-heading">THROUGH THE <span className="glow-text glow-text--cryo">LENS</span></h2>
                    <p className="section-subheading">Cinematic captures from exploration cycles and aesthetic studies</p>
                </motion.div>

                {/* Filter pills */}
                <div className="sanctum-filters">
                    {categories.map(cat => (
                        <motion.button
                            key={cat}
                            className={`sanctum-filter ${filter === cat ? 'sanctum-filter--active' : ''}`}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="filter-bracket">[</span>
                            <span className="filter-text">{cat}</span>
                            <span className="filter-bracket">]</span>
                        </motion.button>
                    ))}
                </div>

                {/* Bento Grid */}
                <div className="sanctum-grid">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((photo, i) => (
                            <PhotoCard key={photo.src} photo={photo} index={i} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxImage && (
                        <Lightbox image={lightboxImage} onClose={closeLightbox} />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default VisionSanctum
