import React, { useCallback } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine)
    }, [])

    const options = {
        fullScreen: { enable: true, zIndex: 0 },
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
            number: { value: 60, density: { enable: true, area: 1000 } },
            color: {
                value: ['#ff4500', '#ff6b00', '#ff8c00', '#ffae42', '#c8ff00'],
            },
            shape: { type: 'circle' },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: { enable: true, speed: 0.8, minimumValue: 0.05, sync: false },
            },
            size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false },
            },
            move: {
                enable: true,
                speed: { min: 0.3, max: 1.5 },
                direction: 'top',
                random: true,
                straight: false,
                outModes: { default: 'out' },
                drift: { min: -1, max: 1 },
            },
            wobble: {
                enable: true,
                distance: 10,
                speed: { min: -3, max: 3 },
            },
            life: {
                duration: { sync: false, value: { min: 3, max: 7 } },
                count: 0,
            },
            shadow: {
                enable: true,
                color: '#ff4500',
                blur: 10,
            },
        },
        interactivity: {
            detectsOn: 'window',
            events: {
                onHover: { enable: true, mode: 'bubble' },
                onClick: { enable: true, mode: 'push' },
            },
            modes: {
                bubble: { distance: 200, size: 6, duration: 0.4, opacity: 0.8 },
                push: { quantity: 8 },
            },
        },
        detectRetina: true,
    }

    return <Particles id="tsparticles" init={particlesInit} options={options} />
}

export default ParticleBackground
