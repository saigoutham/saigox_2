import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'

const DataGateScene = () => {
    const gateUnlocked = useGameStore(s => s.gateUnlocked)

    return (
        <section className="data-gate" id="gate">
            <div className="data-gate__label">
                <motion.span
                    className="data-gate__status"
                    animate={{ opacity: gateUnlocked ? [1, 0.5, 1] : 0.6 }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {gateUnlocked ? '▶ GATE OPEN — PROCEED' : '◆ LOCKED — COLLECT 3 RELICS'}
                </motion.span>
            </div>

            <div className="data-gate__2d-wrap">
                {/* Background glow */}
                <motion.div
                    className="data-gate__portal-glow"
                    animate={{
                        opacity: gateUnlocked ? 0.8 : 0.1,
                        scale: gateUnlocked ? 1.2 : 1
                    }}
                />

                <div className="data-gate__doors">
                    {/* Left Door */}
                    <motion.div
                        className="data-gate__door data-gate__door--left"
                        animate={{
                            rotateY: gateUnlocked ? -110 : 0,
                            x: gateUnlocked ? -50 : 0,
                            opacity: gateUnlocked ? 0.3 : 1
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="data-gate__door-inner">
                            <div className="data-gate__door-pattern" />
                        </div>
                    </motion.div>

                    {/* Right Door */}
                    <motion.div
                        className="data-gate__door data-gate__door--right"
                        animate={{
                            rotateY: gateUnlocked ? 110 : 0,
                            x: gateUnlocked ? 50 : 0,
                            opacity: gateUnlocked ? 0.3 : 1
                        }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="data-gate__door-inner">
                            <div className="data-gate__door-pattern" />
                        </div>
                    </motion.div>
                </div>

                {/* Center Unlock Effect */}
                <AnimatePresence>
                    {gateUnlocked && (
                        <motion.div
                            className="data-gate__unlock-burst"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 4, opacity: [1, 0] }}
                            transition={{ duration: 1.2 }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default DataGateScene
