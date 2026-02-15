import React, { useEffect, useState, useRef } from 'react'

const CustomCursor = () => {
    const cursorRef = useRef(null)
    const followerRef = useRef(null)

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            }
            if (followerRef.current) {
                setTimeout(() => {
                    if (followerRef.current) {
                        followerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
                    }
                }, 80)
            }
        }
        window.addEventListener('mousemove', moveCursor)
        return () => window.removeEventListener('mousemove', moveCursor)
    }, [])

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    )
}

export default CustomCursor
