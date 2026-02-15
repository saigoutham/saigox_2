import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'
import { photography } from '../../data/imageManifest'

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
                <img src={image.src} alt={image.alt} className="lightbox__img" />
                <div className="lightbox__info">
                    <span className="lightbox__alt">{image.alt}</span>
                    <span className="lightbox__cat">{image.category}</span>
                </div>
                <button className="lightbox__close" onClick={onClose}>✕</button>
            </motion.div>
        </motion.div>
    )
}

/* ── Photo Card ── */
const PhotoCard = ({ photo, index }) => {
    const openLightbox = useGameStore(s => s.openLightbox)

    return (
        <motion.div
            className="photo-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.06 }}
            onClick={() => openLightbox(photo)}
        >
            <div className="photo-card__img-wrap">
                <img src={photo.src} alt={photo.alt} className="photo-card__img" loading="lazy" />
                <div className="photo-card__overlay">
                    <span className="photo-card__view">VIEW</span>
                </div>
            </div>
            <div className="photo-card__meta">
                <span className="photo-card__alt">{photo.alt}</span>
                <span className="photo-card__cat">{photo.category}</span>
            </div>
        </motion.div>
    )
}

const PhotoVault = () => {
    const [filter, setFilter] = useState('ALL')
    const lightboxImage = useGameStore(s => s.lightboxImage)
    const closeLightbox = useGameStore(s => s.closeLightbox)

    const filtered = filter === 'ALL' ? photography : photography.filter(p => p.category === filter)

    return (
        <section className="photo-vault">
            <motion.div
                className="photo-vault__header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <span className="section-tag">05 // VAULT</span>
                <h2 className="section-heading">
                    Through the <span className="glow-text glow-text--cryo">Lens</span>
                </h2>
            </motion.div>

            {/* Filter pills */}
            <div className="photo-vault__filters">
                {categories.map(cat => (
                    <motion.button
                        key={cat}
                        className={`photo-vault__filter ${filter === cat ? 'photo-vault__filter--active' : ''}`}
                        onClick={() => setFilter(cat)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {cat}
                    </motion.button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="photo-vault__grid">
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
        </section>
    )
}

export default PhotoVault
