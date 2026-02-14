import React from 'react'
import { motion } from 'framer-motion'
import { actII } from '../../data/resume'
import useTilt from '../../hooks/useTilt'

const AbilityCard = ({ branch, index }) => {
    const { node } = branch
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(10)

    // Bento spans for abilities
    const getBentoClass = (idx) => {
        if (idx === 0) return 'ability-card--featured'
        return ''
    }

    return (
        <motion.div
            ref={ref}
            className={`ability-card card-root ${getBentoClass(index)}`}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            <div className="ability-card__header">
                <div className="ability-card__icon-wrap">
                    <span className="ability-card__icon">✦</span>
                    <div className="ability-card__glow" />
                </div>
                <div className="ability-card__identity">
                    <h4 className="ability-card__title">{branch.label}</h4>
                    <span className="ability-card__rank">RANK_LEGENDARY</span>
                </div>
            </div>

            <div className="ability-card__body">
                <p className="ability-card__desc">{node.title}: {node.desc}</p>
                <div className="ability-card__metrics">
                    {node.metrics.map((m, i) => (
                        <div key={i} className="ability-metric">
                            <span className="ability-metric__label">{m.label}</span>
                            <div className="ability-metric__bar-wrap">
                                <motion.div
                                    className="ability-metric__bar"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                                />
                                <span className="ability-metric__val">{m.val}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive Layers */}
            <div className="hud-glint" />
            <motion.div
                className="hud-scanner"
                animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
            />

            <div className="ability-card__scan" />
            <div className="ability-card__border" />
        </motion.div>
    )
}

const AbilityInventory = () => {
    const { skillTree } = actII

    return (
        <section className="ability-inventory" id="skills">
            <div className="inventory-container">
                <div className="inventory-header">
                    <motion.div
                        className="inventory-header__context"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <span className="section-tag">ZONE_02 // THE_STRATEGIST</span>
                        <h2 className="section-heading">ABILITY <span className="glow-text glow-text--dendro">INVENTORY</span></h2>
                        <p className="section-subheading">High-impact monetization and growth loadout</p>
                    </motion.div>

                    <div className="inventory-stats">
                        <div className="inv-stat">
                            <span className="inv-stat__label">PRIMARY_REALM</span>
                            <span className="inv-stat__val">SCOPELY_CITADEL</span>
                        </div>
                        <div className="inv-stat">
                            <span className="inv-stat__label">TOTAL_REVENUE_OWNED</span>
                            <span className="inv-stat__val">$80M+</span>
                        </div>
                    </div>
                </div>

                <div className="inventory-grid">
                    {skillTree.branches.map((branch, i) => (
                        <AbilityCard key={branch.id} branch={branch} index={i} />
                    ))}

                    {/* Loadout Status as an integrated Bento Card */}
                    <div className="ability-card ability-card--status">
                        <div className="ability-loadout-panel">
                            <div className="loadout-header">LOADOUT_STATUS</div>
                            <div className="loadout-slots">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="loadout-slot">
                                        <div className="loadout-slot__fill" />
                                    </div>
                                ))}
                            </div>
                            <div className="loadout-footer">OPTIMIZED_FOR_GROWTH</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AbilityInventory
