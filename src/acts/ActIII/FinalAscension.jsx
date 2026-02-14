import React from 'react'
import { motion } from 'framer-motion'
import useTilt from '../../hooks/useTilt'
import { loot } from '../../data/resume'
import ContactTerminal from '../../hud/ContactTerminal'

const FinalAscension = () => {
    return (
        <section className="final-ascension" id="final">
            <div className="ascension-container">
                {/* ── THE SEAL ── */}
                <div className="ascension-seal-wrap">
                    <motion.div
                        className="ascension-seal"
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="seal-outer" />
                        <div className="seal-inner" />
                        <div className="seal-core" />
                        <div className="seal-glow" />
                    </motion.div>
                </div>

                <div className="ascension-grid ascension-grid--tri">
                    {/* LEADERBOARD/STATS */}
                    <motion.div
                        className="ascension-block ascension-stats card-root"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="hud-glint" />
                        <h3 className="block-title">ADVENTURE_SUMMARY</h3>
                        <div className="summary-meter">
                            <span className="meter-label">QUESTS_COMPLETED</span>
                            <div className="meter-track"><div className="meter-fill" style={{ width: '100%' }} /></div>
                            <span className="meter-val">100%</span>
                        </div>
                        <div className="summary-meter">
                            <span className="meter-label">RELICTS_DISCOVERED</span>
                            <div className="meter-track"><div className="meter-fill" style={{ width: '85%' }} /></div>
                            <span className="meter-val">85%</span>
                        </div>
                        <div className="summary-meter">
                            <span className="meter-label">LEVEL_REACHED</span>
                            <div className="meter-track"><div className="meter-fill" style={{ width: '92%' }} /></div>
                            <span className="meter-val">92_ASCENDED</span>
                        </div>
                    </motion.div>

                    {/* INCOMING TRANSMISSION (ContactTerminal) */}
                    <motion.div
                        className="ascension-block ascension-transmission"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ContactTerminal />
                    </motion.div>

                    {/* FINAL UPLINK (Socials) */}
                    <motion.div
                        className="ascension-block ascension-uplink card-root"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="hud-glint" />
                        <h3 className="block-title">SOCIAL_UPLINK</h3>
                        <div className="uplink-buttons">
                            <a href="https://linkedin.com/in/goutham-saigo" className="uplink-btn" target="_blank" rel="noreferrer">
                                <span className="btn-label">LINKED_IN</span>
                                <span className="btn-status">ONLINE</span>
                            </a>
                            <a href="https://github.com/saigox" className="uplink-btn" target="_blank" rel="noreferrer">
                                <span className="btn-label">GIT_HUB</span>
                                <span className="btn-status">ACTIVE</span>
                            </a>
                            <a href="mailto:goutham@example.com" className="uplink-btn uplink-btn--primary">
                                <span className="btn-label">COMM_UPLINK (EMAIL)</span>
                                <span className="btn-status">READY</span>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* THE LOOT ARCHIVE MINI (Horizontal Scroll) */}
                <div className="ascension-loot-mini">
                    <h4 className="mini-title">INVENTORY_SNAPSHOT</h4>
                    <div className="mini-loot-track">
                        {loot.map((item, idx) => (
                            <motion.div
                                key={idx}
                                className={`mini-loot-item card-root mini-loot-item--${item.rarity.toLowerCase()}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <div className="hud-glint" />
                                <span className="m-icon">{item.icon}</span>
                                <span className="m-rarity">{item.rarity}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <footer className="ascension-footer">
                    <div className="footer-line" />
                    <div className="footer-meta">
                        <span>© 2024 GOUTHAM_SAIGO</span>
                        <span>v1.0.4_BETA</span>
                    </div>
                    <div className="footer-credits">
                        BUILT WITH REACT / FRAMER_MOTION / THREE_JS / MMORPG_AESTHETICS
                    </div>
                </footer>
            </div>
        </section>
    )
}

export default FinalAscension
