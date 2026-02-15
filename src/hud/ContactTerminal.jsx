import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useGlitchText from '../hooks/useGlitchText'
import { identity } from '../data/resume'

const ContactTerminal = () => {
    const headerGlitch = useGlitchText('INCOMING TRANSMISSION', 500, 30)
    const [showContent, setShowContent] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setShowContent(true), 2000)
        return () => clearTimeout(t)
    }, [])

    const contactLines = [
        { key: 'CHANNEL', val: 'EMAIL', link: `mailto:${identity.email}`, display: identity.email },
        { key: 'COMMS', val: 'LINKEDIN', link: identity.linkedin, display: 'linkedin.com/in/saigouthamvaddi' },
        { key: 'SIGNAL', val: 'PHONE', link: `tel:${identity.phone}`, display: identity.phone },
    ]

    return (
        <div className="contact-terminal" id="terminal">
            <motion.div
                className="contact-terminal__screen"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="contact-terminal__scanlines" />
                <div className="contact-terminal__noise" />

                {/* Header */}
                <div className="contact-terminal__header">
                    <div className="contact-terminal__dots">
                        <span className="contact-terminal__dot contact-terminal__dot--red" />
                        <span className="contact-terminal__dot contact-terminal__dot--yellow" />
                        <span className="contact-terminal__dot contact-terminal__dot--green" />
                    </div>
                    <span className="contact-terminal__title">COMM_TERMINAL v2.6</span>
                </div>

                {/* Content */}
                <div className="contact-terminal__body">
                    <div className="contact-terminal__transmission">
                        <span className={`contact-terminal__header-text ${headerGlitch.done ? 'contact-terminal__header-text--done' : ''}`}>
                            {'> '}{headerGlitch.displayed}
                        </span>
                    </div>

                    {showContent && (
                        <motion.div
                            className="contact-terminal__lines"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="contact-terminal__separator">
                                {'─'.repeat(40)}
                            </div>

                            {contactLines.map((line, i) => (
                                <motion.div
                                    key={line.key}
                                    className="contact-terminal__line"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.15 }}
                                >
                                    <span className="contact-terminal__key">{`> ${line.key}:`}</span>
                                    <span className="contact-terminal__val">{line.val}</span>
                                    <a href={line.link} target="_blank" rel="noreferrer" className="contact-terminal__link">
                                        {line.display}
                                        <span className="contact-terminal__status">● ACTIVE</span>
                                    </a>
                                </motion.div>
                            ))}

                            <div className="contact-terminal__separator">
                                {'─'.repeat(40)}
                            </div>

                            <motion.div
                                className="contact-terminal__footer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <span className="contact-terminal__end">{'> END OF TRANSMISSION'}</span>
                                <span className="contact-terminal__cursor">█</span>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </motion.div>

        </div>
    )
}

export default ContactTerminal
