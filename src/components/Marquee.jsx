import React from 'react'
import { motion } from 'framer-motion'

const Marquee = () => {
    const items = [
        'PRODUCT STRATEGY',
        'LIVE OPERATIONS',
        'MONETIZATION',
        'DATA ENGINEERING',
        'WILDLIFE PHOTOGRAPHY',
        'MOBILE GAMING',
        'USER ACQUISITION',
        'MACRO PHOTOGRAPHY',
        'GAME ECONOMIES',
        'A/B TESTING',
        'IAP DESIGN',
        'PLAYER RETENTION',
    ]

    return (
        <div className="marquee">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="marquee__track"
            >
                {[...items, ...items, ...items].map((item, i) => (
                    <span key={i} className="marquee__item">
                        {item} <span className="marquee__separator">◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

export default Marquee
