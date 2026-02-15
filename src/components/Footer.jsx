import React from 'react'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="portfolio-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h2 className="footer-logo">SAI GOUTHAM</h2>
                    <p>© 2026 Crafted with precision & passion.</p>
                </div>

                <div className="footer-links">
                    <a href="https://linkedin.com/in/saigouthamvaddi/" target="_blank" rel="noreferrer" className="social-link">
                        <Linkedin size={24} />
                    </a>
                    <a href="mailto:saigoutham.vaddi@gmail.com" className="social-link">
                        <Mail size={24} />
                    </a>
                    <a href="#" className="social-link">
                        <Instagram size={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
