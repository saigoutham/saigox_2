import { create } from 'zustand'

const useGameStore = create((set, get) => ({
    // ── Zone Tracking ──
    currentAct: 1,
    activeZone: 'HERO', // 'HERO', 'ARCHIVE', 'GATE', 'CITADEL', 'VISION'

    setAct: (act) => set({ currentAct: act }),
    setActiveZone: (zone) => set({ activeZone: zone }),

    // ── UI State ──
    statsOverlayOpen: false,
    toggleStatsOverlay: () => set(s => ({ statsOverlayOpen: !s.statsOverlayOpen })),

    // ── Photography Lightbox ──
    lightboxImage: null,
    openLightbox: (img) => set({ lightboxImage: img }),
    closeLightbox: () => set({ lightboxImage: null }),

    // ── Navigation ──
    scrollToSection: (id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
}))

export default useGameStore
