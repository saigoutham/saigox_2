import { useState, useEffect } from 'react'

const glitchChars = '!<>-_\\/[]{}—=+*^?#________'

const useGlitchText = (text, delay = 0, speed = 35) => {
    const [displayed, setDisplayed] = useState('')
    const [done, setDone] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            let iteration = 0
            const interval = setInterval(() => {
                setDisplayed(
                    text.split('').map((char, idx) => {
                        if (char === ' ') return ' '
                        if (idx < iteration) return char
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    }).join('')
                )
                iteration += 0.5
                if (iteration >= text.length) {
                    clearInterval(interval)
                    setDisplayed(text)
                    setDone(true)
                }
            }, speed)
            return () => clearInterval(interval)
        }, delay)
        return () => clearTimeout(timeout)
    }, [text, delay, speed])

    return { displayed: displayed || '\u00A0'.repeat(text.length), done }
}

export default useGlitchText
