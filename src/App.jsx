import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Preloader from './scenes/Preloader'
import Intro from './scenes/01_Intro'
import Identity from './scenes/02_Identity'
import Arsenal from './scenes/03_Arsenal'
import Campaigns from './scenes/04_Campaigns'
import Credentials from './scenes/04b_Credentials'
import Gallery from './scenes/05_Gallery'
import Signal from './scenes/06_Signal'

import './design/tokens.css'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
    const [ready, setReady] = useState(false)
    const lenisRef = useRef(null)

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
        })
        lenisRef.current = lenis

        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add((time) => lenis.raf(time * 1000))
        gsap.ticker.lagSmoothing(0)

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [])

    return (
        <>
            <AnimatePresence>
                {!ready && <Preloader onComplete={() => setReady(true)} />}
            </AnimatePresence>

            <div className="noise-overlay" />

            <main className={`main ${ready ? 'main--ready' : ''}`}>
                <Intro />
                <Identity />
                <Arsenal />
                <Campaigns />
                <Credentials />
                <Gallery />
                <Signal />
            </main>
        </>
    )
}

export default App
