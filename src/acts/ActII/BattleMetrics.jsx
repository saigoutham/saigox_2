import React from 'react'
import { motion } from 'framer-motion'
import { actII } from '../../data/resume'
import useTilt from '../../hooks/useTilt'

const TacticalGauge = ({ label, value, delta, color, delay }) => (
    <div className="tactical-gauge">
        <div className="tactical-gauge__header">
            <span className="tactical-gauge__label">{label}</span>
            <span className="tactical-gauge__delta" style={{ color: delta > 0 ? 'var(--dendro)' : 'var(--pyro)' }}>
                {delta > 0 ? `+${delta}%` : `${delta}%`}
            </span>
        </div>
        <div className="tactical-gauge__track">
            <motion.div
                className="tactical-gauge__fill"
                style={{ background: color, boxShadow: `0 0 15px ${color}` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1.5, delay, ease: "easeOut" }}
            />
            <div className="tactical-gauge__marker" style={{ left: '50%' }} />
        </div>
        <div className="tactical-gauge__footer">
            <span className="tactical-gauge__val">{value}%</span>
            <span className="tactical-gauge__limit">MAX_CAP</span>
        </div>
    </div>
)

const IntelPanel = ({ test }) => {
    const { ref, style, onMouseMove, onMouseLeave } = useTilt(5)

    return (
        <motion.div
            ref={ref}
            className="intel-panel card-root"
            style={style}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            <div className="intel-panel__header">INTELLIGENCE_REPORT</div>
            <div className="intel-panel__body">
                <div className="intel-item">
                    <span className="intel-item__key">EXPERIMENT:</span>
                    <span className="intel-item__val">{test.name}</span>
                </div>
                <div className="intel-item">
                    <span className="intel-item__key">HYPOTHESIS:</span>
                    <span className="intel-item__val">Cohort-based offer segmentation increases conversion via personalized value perception.</span>
                </div>
                <div className="intel-item">
                    <span className="intel-item__key">RESULT:</span>
                    <span className="intel-item__val text-glow-dendro">CONFIRMED — SIGNIFICANT LIFT</span>
                </div>
            </div>
            <div className="intel-panel__footer">
                <div className="intel-scanner" />
                <span>SCAN_COMPLETE</span>
            </div>

            {/* Interactive Layers */}
            <div className="hud-glint" />
            <motion.div
                className="hud-scanner"
                animate={{ top: ['0%', '100%'], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    )
}

const BattleMetrics = () => {
    const test = actII.abTests[0] // Primary test: Offer Segmentation
    const { variantA: vA, variantB: vB } = test

    const metrics = [
        { label: 'ARPDAU_LIFT', val: vB.arpdau, delta: 15, color: 'var(--cryo)' },
        { label: 'CONV_EFFICIENCY', val: vB.conversion * 10, delta: 16.7, color: 'var(--dendro)' },
        { label: 'REV_VELOCITY', val: vB.revenue / 1.5, delta: 22, color: 'var(--geo)' }
    ]

    return (
        <section className="battle-metrics" id="metrics">
            <div className="battle-metrics__bg">
                <div className="battle-metrics__grid-lines" />
            </div>

            <div className="battle-metrics__header">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <span className="section-tag">ZONE_02 // SECTION_02</span>
                    <h2 className="section-heading">BATTLE <span className="glow-text glow-text--cryo">METRICS</span></h2>
                    <p className="section-subheading">LiveOps Experimentation Center — Terminal 02.B</p>
                </motion.div>

                <div className="battle-metrics__status">
                    <div className="status-node status-node--active">
                        <span className="status-node__dot" />
                        <span>TACTICAL_VIEW_ACTIVE</span>
                    </div>
                </div>
            </div>

            <div className="battle-metrics__dashboard">
                {/* Left: Tactical Gauges */}
                <div className="battle-metrics__gauges">
                    {metrics.map((m, i) => (
                        <TacticalGauge
                            key={m.label}
                            {...m}
                            delay={0.2 + (i * 0.2)}
                        />
                    ))}
                </div>

                {/* Right: Intelligence Panel (With Tilt) */}
                <aside className="battle-metrics__intel">
                    <IntelPanel test={test} />
                </aside>
            </div>

            {/* Bottom Comparison Ticker */}
            <div className="battle-metrics__ticker">
                <div className="ticker-label">VARIANT_B_DOMINANCE</div>
                <div className="ticker-bar">
                    <motion.div
                        className="ticker-fill"
                        animate={{ x: ['-100%', '0%'] }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    />
                </div>
                <div className="ticker-val">100% CONFIDENCE</div>
            </div>
        </section>
    )
}

export default BattleMetrics
