import React from 'react'
import { motion } from 'framer-motion'
import useTilt from '../hooks/useTilt'

const items = [
    { icon: '🏆', title: 'Employee of the Year', sub: 'VISA INC. — 2020 & 2021', desc: 'Twice recognized across entire org for Judgment, Ownership & Execution excellence.', rarity: 'LEGENDARY' },
    { icon: '⚡', title: '5× Spot Awards', sub: 'SCOPELY — 2023–2025', desc: 'Exceptional cross-functional impact across monetization, LiveOps, and D2C launch.', rarity: 'LEGENDARY' },
    { icon: '📊', title: 'CAT 99.22 Percentile', sub: 'TOP 0.78% OF 200K+', desc: 'Among top 0.78% of 200K+ candidates nationally.', rarity: 'LEGENDARY' },
    { icon: '💰', title: '$80M+ Revenue Owner', sub: 'SCOPELY', desc: 'Direct P&L ownership of live mobile gaming monetization.', rarity: 'LEGENDARY' },
    { icon: '🎓', title: "Dean's Merit — MBA", sub: 'IIM LUCKNOW', desc: 'Top academic cohort. National Case Finalist. Co-founded Hel(l)Mark.', rarity: 'EPIC' },
    { icon: '🎮', title: 'Google Play Featured', sub: 'HEL(L)MARK', desc: 'Top 20 Google Play Games. Featured in New & Noteworthy.', rarity: 'EPIC' },
    { icon: '🎓', title: 'B.Tech CS (Honors)', sub: 'NIT TRICHY — 9.27 CGPA', desc: 'Major: CS, Minor: Management. Honors Degree.', rarity: 'EPIC' },
    { icon: '📸', title: 'Wildlife Photographer', sub: 'NIKON × INDIAN PARKS', desc: 'Multi-genre shooter: wildlife, macro, landscape across India.', rarity: 'RARE' },
]

const rarityConfig = {
    LEGENDARY: { color: '#ff8c00', bg: 'rgba(255, 140, 0, 0.06)', border: 'rgba(255, 140, 0, 0.2)' },
    EPIC: { color: '#c8ff00', bg: 'rgba(200, 255, 0, 0.04)', border: 'rgba(200, 255, 0, 0.15)' },
    RARE: { color: '#00d4ff', bg: 'rgba(0, 212, 255, 0.04)', border: 'rgba(0, 212, 255, 0.15)' },
}

const LootCard = ({ item, idx }) => {
    const tilt = useTilt(10)
    const conf = rarityConfig[item.rarity]
    return (
        <motion.div
            initial={{ opacity: 0, y: 60, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, margin: '-50px' }}
            transition={{ duration: 0.7, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="loot-card"
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
            <div className="loot-card__shine" />
            <div className="loot-card__glow" />
            <div className="loot-card__noise" />
            <div className="loot-card__header">
                <span className="loot-card__rarity">{item.rarity}</span>
                <span className="loot-card__icon">{item.icon}</span>
            </div>
            <h3 className="loot-card__title">{item.title}</h3>
            <span className="loot-card__sub">{item.sub}</span>
            <p className="loot-card__desc">{item.desc}</p>
        </motion.div>
    )
}

const Achievements = () => (
    <section className="achievements" id="achievements">
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="section-tag"
        >
            04 // INVENTORY
        </motion.span>
        <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading"
        >
            Loot <span className="glow-text glow-text--cyan">Collected</span>
        </motion.h2>
        <div className="achievements__grid">
            {items.map((item, idx) => (
                <LootCard key={idx} item={item} idx={idx} />
            ))}
        </div>
    </section>
)

export default Achievements
