import React from 'react'
import { skills } from '../data/resume'

const Marquee = () => {
    const items = [...skills, ...skills] // double for seamless loop

    return (
        <div className="marquee">
            <div className="marquee__track">
                {items.map((skill, i) => (
                    <span key={i} className="marquee__item">
                        <span className="marquee__diamond">◆</span>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Marquee
