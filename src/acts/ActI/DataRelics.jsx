import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'
import { actI } from '../../data/resume'
import useTilt from '../../hooks/useTilt'

const ItemCard = ({ item, index }) => {
    const [isInspected, setIsInspected] = useState(false)
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(10)

    const rarityColors = {
        electro: 'var(--electro)',
        pyro: 'var(--pyro)',
        cryo: 'var(--cryo)',
        dendro: 'var(--dendro)',
        geo: 'var(--geo)'
    }

    return (
        <motion.div
            ref={ref}
            className={`item-card card-root item-card--${item.element}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
            }}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onClick={() => setIsInspected(!isInspected)}
        >
            {/* Holographic Suffix */}
            <div className="item-card__rarity-glow" style={{ background: rarityColors[item.element] }} />

            <div className="item-card__frame">
                <div className="item-card__corner item-card__corner--tl" />
                <div className="item-card__corner item-card__corner--tr" />
                <div className="item-card__corner item-card__corner--bl" />
                <div className="item-card__corner item-card__corner--br" />
            </div>

            <div className="item-card__header">
                <span className="item-card__type">LEGENDARY_ARTIFACT</span>
                <span className="item-card__id">#0{index + 1}</span>
            </div>

            <div className="item-card__visual">
                <div className="item-card__orb-wrap">
                    <div className="item-card__orb" />
                    <span className="item-card__icon">{item.icon}</span>
                </div>
                <div className="item-card__scanline" />
            </div>

            <div className="item-card__content">
                <h3 className="item-card__title">{item.metric}</h3>
                <p className="item-card__subtitle">{item.label}</p>
            </div>

            <AnimatePresence>
                {isInspected && (
                    <motion.div
                        className="item-card__inspect"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="inspect-divider" />
                        <p className="inspect-lore">
                            {item.context || "Direct data pipeline impact from the Visa mainframe archives. Reconstructing high-scale infrastructure."}
                        </p>
                        <div className="inspect-stats">
                            <div className="inspect-stat"><span>CLASS:</span> <span>ENG_LEGACY</span></div>
                            <div className="inspect-stat"><span>XP:</span> <span>+5000</span></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isInspected && (
                <div className="item-card__footer">
                    <span className="item-card__action">CLICK_TO_INSPECT</span>
                </div>
            )}

            {/* Interactive Layers */}
            <div className="hud-glint" />
            <motion.div
                className="hud-scanner"
                animate={{ top: ['0%', '100%'], opacity: [0, 0.4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.3 }}
            />
        </motion.div>
    )
}

const DataRelics = () => {
    const relics = actI.relics

    return (
        <section className="loot-archive" id="relics">
            <div className="loot-archive__ambient">
                <div className="loot-archive__grid-bg" />
            </div>

            <motion.div
                className="loot-archive__header"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="loot-archive__header-hud">
                    <span className="section-tag">ZONE_01 // SECTION_01</span>
                    <h2 className="section-heading">LOOT <span className="glow-text glow-text--electro">ARCHIVE</span></h2>
                    <p className="section-subheading">Recovered artifacts from the Global Finance mainframe</p>
                </div>
            </motion.div>

            <div className="loot-archive__grid">
                {relics.map((relic, i) => (
                    <ItemCard key={relic.id} item={relic} index={i} />
                ))}
            </div>

            {/* Sidebar Tactical Panel */}
            <aside className="loot-archive__sidebar">
                <div className="tactical-info">
                    <div className="tactical-info__header">INTEL_LOG</div>
                    <div className="tactical-info__body">
                        <p>Accessing <strong>VISA_METRICS_V2</strong></p>
                        <p>Source confirmed: Chennai Mainframe</p>
                        <p>Status: All fragments recovered</p>
                    </div>
                    <div className="tactical-info__footer">
                        <div className="tactical-bar" />
                        <span>SYNCH_STABLE</span>
                    </div>
                </div>
            </aside>
        </section>
    )
}

export default DataRelics
