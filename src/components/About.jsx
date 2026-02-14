import React from 'react'
import { motion } from 'framer-motion'

const skills = [
    'Monetization Design', 'LiveOps', 'IAP Systems', 'Player Segmentation',
    'A/B Testing', 'Data Pipelines', 'SQL / Python', 'Figma', 'JIRA',
    'Revenue Modeling', 'Web Store (D2C)', 'Retention Loops',
    'Reward Calendars', 'User Research', 'Feature Prioritization',
]

const statCards = [
    { value: '$80M+', label: 'Revenue Owned', icon: '💰' },
    { value: '10×', label: 'Revenue Lift', icon: '📈' },
    { value: '15K+', label: 'Game Installs', icon: '🎮' },
    { value: '1PB+', label: 'Data Processed', icon: '📊' },
]

const anim = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
}

const About = () => (
    <section className="about" id="about">
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: '-60px' }}
            className="section-tag"
        >
            01 // CHARACTER BIO
        </motion.span>

        <div className="about__grid">
            {/* LEFT — Heading + Stats */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.8 }}
                variants={anim}
                className="about__left"
            >
                <h2 className="section-heading about__heading">
                    The <span className="glow-text glow-text--fire">Player</span>
                    <br />Behind the
                    <br />Product
                </h2>

                {/* Stat cards in 2×2 grid */}
                <div className="about__stats-grid">
                    {statCards.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                            className="about__stat-card"
                        >
                            <span className="about__stat-icon">{s.icon}</span>
                            <span className="about__stat-value">{s.value}</span>
                            <span className="about__stat-label">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* RIGHT — Bio text + Skills */}
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
                variants={anim}
                className="about__right"
            >
                <p className="about__text">
                    I'm a <strong>Gaming Product Manager</strong> at Scopely, where I own monetization
                    for live titles generating <strong>$80M+ annually</strong>. I obsess over player behavior,
                    reward psychology, and turning game economies into growth engines.
                </p>
                <p className="about__text">
                    Before gaming, I engineered <strong>1PB+ data pipelines at Visa</strong> processing
                    100M+ daily transactions. My MBA from <strong>IIM Lucknow</strong> and B.Tech from
                    <strong> NIT Trichy</strong> (9.27 CGPA) give me a rare blend of
                    analytical depth and product intuition.
                </p>
                <p className="about__text">
                    Off-screen, I'm a <strong>wildlife & macro photographer</strong> — shooting with Nikon
                    across India's national parks. Same eye for detail, different canvas.
                </p>

                <div className="about__skills">
                    {skills.map((skill, idx) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: 0.3 + idx * 0.03 }}
                            className="about__skill-tag"
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
)

export default About
