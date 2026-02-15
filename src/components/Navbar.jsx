import React, { useState } from 'react'

const Navbar = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }))

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <nav className="navbar">
            <div className="navbar__left">
                <span className="navbar__logo">SGV</span>
                <span className="navbar__divider">/</span>
                <span className="navbar__tagline">Portfolio '26</span>
            </div>
            <div className="navbar__center">
                <a href="#about" className="navbar__link">About</a>
                <a href="#experience" className="navbar__link">Work</a>
                <a href="#photography" className="navbar__link">Photography</a>
                <a href="#contact" className="navbar__link">Contact</a>
            </div>
            <div className="navbar__right">
                <span className="navbar__time">{time} IST</span>
            </div>
        </nav>
    )
}

export default Navbar
