import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'
import { actII } from '../../data/resume'

const ABChamber = () => {
    const variant = useGameStore(s => s.abTestActive)
    const setVariant = useGameStore(s => s.setABVariant)
    const test = actII.abTests[0] // Primary test: Offer Segmentation

    const data = variant === 'A' ? test.variantA : test.variantB
    const baseData = test.variantA

    const metrics = [
        {
            label: 'ARPDAU',
            value: data.arpdau,
            base: baseData.arpdau,
            suffix: '%',
            color: 'var(--dendro)',
        },
        {
            label: 'CONVERSION',
            value: data.conversion,
            base: baseData.conversion,
            suffix: '%',
            color: 'var(--cryo)',
        },
        {
            label: 'REVENUE INDEX',
            value: data.revenue,
            base: baseData.revenue,
            suffix: '',
            color: 'var(--geo)',
        },
    ]

    return (
        <section className="ab-chamber" id="ab-chamber">
            <motion.div
                className="ab-chamber__header"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="section-tag">02.5 // EXPERIMENTATION</span>
                <h2 className="section-heading">
                    A/B <span className="glow-text glow-text--cryo">Chamber</span>
                </h2>
                <p className="ab-chamber__subtitle">
                    Toggle between variants to see real impact
                </p>
            </motion.div>

            {/* Toggle */}
            <div className="ab-chamber__toggle">
                <button
                    className={`ab-chamber__toggle-btn ${variant === 'A' ? 'ab-chamber__toggle-btn--active' : ''}`}
                    onClick={() => setVariant('A')}
                >
                    <span className="ab-chamber__toggle-letter">A</span>
                    <span className="ab-chamber__toggle-label">{test.variantA.label}</span>
                </button>
                <div className="ab-chamber__toggle-divider">VS</div>
                <button
                    className={`ab-chamber__toggle-btn ${variant === 'B' ? 'ab-chamber__toggle-btn--active' : ''}`}
                    onClick={() => setVariant('B')}
                >
                    <span className="ab-chamber__toggle-letter">B</span>
                    <span className="ab-chamber__toggle-label">{test.variantB.label}</span>
                </button>
            </div>

            {/* Metrics Dashboard */}
            <div className="ab-chamber__dashboard">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={variant}
                        className="ab-chamber__metrics"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {metrics.map((m, i) => {
                            const delta = m.value - m.base
                            const deltaPercent = m.base > 0 ? ((delta / m.base) * 100).toFixed(1) : 0
                            return (
                                <motion.div
                                    key={m.label}
                                    className="ab-metric"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <span className="ab-metric__label">{m.label}</span>
                                    <div className="ab-metric__bar-wrap">
                                        <motion.div
                                            className="ab-metric__bar"
                                            style={{ background: m.color }}
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${m.value}%` }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        />
                                    </div>
                                    <div className="ab-metric__values">
                                        <span className="ab-metric__val">{m.value}{m.suffix}</span>
                                        {delta > 0 && (
                                            <span className="ab-metric__delta ab-metric__delta--up">
                                                +{deltaPercent}%
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Test name badge */}
            <div className="ab-chamber__test-name">
                <span className="ab-chamber__test-label">EXPERIMENT:</span>
                <span className="ab-chamber__test-value">{test.name}</span>
            </div>
        </section>
    )
}

export default ABChamber
