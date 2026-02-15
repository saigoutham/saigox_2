import React from 'react'
import { motion } from 'framer-motion'
import useTilt from '../../hooks/useTilt'
import { loot } from '../../data/resume'

const rarityConfig = {
    SSR: {
        color: 'var(--ssr-color)',
        bg: 'var(--ssr-bg)',
        border: 'var(--ssr-border)',
        stars: '★★★★★',
        className: 'loot-card--ssr',
    },
    SR: {
        color: 'var(--sr-color)',
        bg: 'var(--sr-bg)',
        border: 'var(--sr-border)',
        stars: '★★★★',
        className: 'loot-card--sr',
    },
    R: {
        color: 'var(--r-color)',
        bg: 'var(--r-bg)',
        border: 'var(--r-border)',
        stars: '★★★',
        className: 'loot-card--r',
    },
}

const LootCard = ({ item, idx }) => {
    const tilt = useTilt(10)
    const conf = rarityConfig[item.rarity]

    return (
        <motion.div
            className={`loot-card ${conf.className}`}
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
                '--loot-color': conf.color,
                '--loot-bg': conf.bg,
                '--loot-border': conf.border,
                ...tilt.style,
            }}
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
        >
            {/* Holographic shine overlay */}
            <div className="loot-card__holographic" />
            <div className="loot-card__glow" />
            <div className="loot-card__noise" />

            {/* SSR particle border */}
            {item.rarity === 'SSR' && <div className="loot-card__particles" />}

            <div className="loot-card__header">
                <span className="loot-card__rarity">{item.rarity}</span>
                <span className="loot-card__stars">{conf.stars}</span>
            </div>

            <span className="loot-card__icon">{item.icon}</span>
            <h3 className="loot-card__title">{item.title}</h3>
            <span className="loot-card__sub">{item.sub}</span>
            <p className="loot-card__desc">{item.desc}</p>
        </motion.div>
    )
}

const LootCollection = () => (
    <section className="loot-collection" id="loot">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
        >
            <span className="section-tag">06 // INVENTORY</span>
            <h2 className="section-heading">
                Loot <span className="glow-text glow-text--geo">Collected</span>
            </h2>
        </motion.div>

        <div className="loot-collection__grid">
            {loot.map((item, idx) => (
                <LootCard key={idx} item={item} idx={idx} />
            ))}
        </div>
    </section>
)

export default LootCollection
