import React from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="contact__content"
            >
                <span className="section-label">05 — CONTACT</span>
                <h2 className="contact__heading">
                    Let's build<br />
                    <span className="text-accent">something great.</span>
                </h2>
                <a href="mailto:saigoutham.vaddi@gmail.com" className="contact__email">
                    saigoutham.vaddi@gmail.com
                </a>

                <div className="contact__links">
                    <a href="https://linkedin.com/in/saigouthamvaddi/" target="_blank" rel="noreferrer" className="contact__link">
                        LinkedIn ↗
                    </a>
                    <a href="mailto:saigoutham.vaddi@gmail.com" className="contact__link">
                        Email ↗
                    </a>
                    <a href="tel:+919494140609" className="contact__link">
                        +91 949 414 0609
                    </a>
                </div>
            </motion.div>

            <footer className="footer">
                <span>© 2026 Sai Goutham Vaddi</span>
                <span>Crafted with precision.</span>
            </footer>
        </section>
    )
}

export default Contact
