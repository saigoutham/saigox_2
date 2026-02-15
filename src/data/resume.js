// ═══════════════════════════════════════════════════════════
// resume.js — THE SINGLE SOURCE OF TRUTH
// Every metric here is real. Zero fabrication.
// ═══════════════════════════════════════════════════════════

export const identity = {
    name: 'Venkata Sai Goutham Vaddi',
    shortName: 'Sai Goutham',
    monogram: 'SGV',
    title: 'Product Manager — Mobile Social & Casino Gaming',
    tagline: 'Data-driven Monetization Architect & Photographer',
    summary: 'Product Manager with 4.5 years of experience, including 2.5+ years in mobile social and casino gaming. Previously worked as a Data Engineer, bringing analytical depth to product decision-making. Owned monetization strategy, LiveOps sales, and player segmentation for a game generating $80M+ annually, significantly improving ARPDAU, ARPPU, and conversion.',
    email: 'saigoutham.vaddi@gmail.com',
    phone: '+91 9494140609',
    linkedin: 'https://linkedin.com/in/saigouthamvaddi/',
    location: 'Bangalore, India',
}

// ───────────────── EXPERIENCES ─────────────────
export const experiences = [
    {
        id: 'visa',
        company: 'Visa Inc.',
        role: 'Data Engineer',
        period: 'JUL 2019 — JUN 2021',
        location: 'Bangalore',
        badge: 'DATA ENGINEERING',
        accent: '#22D3EE',
        highlights: [
            'Built 1PB+ data pipelines for processing 100M+ transactions, improving reporting speed and business visibility.',
            'Automated 100+ deployments using DevOps, cutting manual effort by 60% and accelerating release cycles.',
            'Validated 30+ global data sources, saving 480+ QA hours & boosting accuracy for 14K+ client reports.',
        ],
        metrics: [
            { val: '1PB+', label: 'DATA PROCESSED' },
            { val: '100M+', label: 'TRANSACTIONS' },
            { val: '2×', label: 'EMPLOYEE OF YEAR' },
        ],
    },
    {
        id: 'hellmark',
        company: 'Hel(l)Mark',
        role: 'Chief Executive Officer',
        period: 'MAY 2022 — APR 2023',
        location: 'IIM Lucknow',
        badge: 'FOUNDER',
        accent: '#FF6B35',
        highlights: [
            'Won operational bid to run IIML\'s official merchandise store, driving ₹20L+ in national sales within 12 months with 94% YoY growth.',
            'Launched 35+ products and managed a 7-member team across sales, inventory, and fulfillment, delivering 2K+ orders with strong seasonal sell-through.',
        ],
        metrics: [
            { val: '₹20L+', label: 'REVENUE' },
            { val: '94%', label: 'YOY GROWTH' },
            { val: '35+', label: 'PRODUCTS' },
            { val: '2K+', label: 'ORDERS' },
        ],
    },
    {
        id: 'scopely',
        company: 'Scopely',
        role: 'Product Manager — Mobile Social & Casino Gaming',
        period: 'APR 2023 — PRESENT',
        location: 'Bangalore',
        badge: 'CURRENT',
        accent: '#84CC16',
        sections: [
            {
                title: 'Feature Development & LiveOps Execution',
                bullets: [
                    'Rebuilt the legacy Spin Wheel with segmented rewards and jackpot mechanics, driving 10× revenue (~$3K/day) and adding 1,000+ daily payers.',
                    'Developed monetization sale constructs from competitive research and player behavior, delivering 20% ARPDAU lift on active sale days.',
                    'Automated config generation by converting CSV inputs into deployable JSON, enabling 15K+ offer launches with 40% faster turnaround and 30% fewer errors.',
                    'Launched fair-style LiveOps with limited-time sales and thematic content, boosting event window revenue by 15–20% and increasing payer frequency.',
                ],
            },
            {
                title: 'Monetization & Player Segmentation',
                bullets: [
                    'Launched a segmented Direct To Customer (D2C) store with personalized web offers, scaling revenue share from 0% to 5% in 10 months and increasing margin per transaction by 22%.',
                    'Redefined monetization logic from 6 to 30+ daily cohorts based on spend behavior, driving granular pricing and improving ARPDAU by 15%.',
                    'Built layered pricing and value strategies atop base economy curves, tailored to 30+ cohorts to lift ARPPU by 10% for active payers and improve conversion by 5% for lapsers and non-spenders.',
                    'Ran 50+ A/B tests on pricing, segmentation, and sale design, driving adoption of new sale formats and shaping long-term monetization strategy.',
                ],
            },
        ],
        highlights: [
            'Own end-to-end monetization for live mobile titles generating $80M+ annually.',
            'Drive revenue strategy across IAP, D2C web stores, and LiveOps events.',
        ],
        metrics: [
            { val: '$80M+', label: 'ANNUAL REVENUE' },
            { val: '10×', label: 'REVENUE LIFT' },
            { val: '30+', label: 'DAILY COHORTS' },
            { val: '50+', label: 'A/B TESTS' },
        ],
    },
]

// ───────────────── EDUCATION ─────────────────
export const education = [
    {
        degree: 'MBA — IT Systems, Strategy & Operations',
        school: 'IIM Lucknow',
        period: '2021 — 2023',
        badge: 'TOP 1%',
        accent: '#84CC16',
        highlights: [
            "Dean's Merit List",
            'National Finalist — Microsoft PM Engage',
            'National Finalist — XLRI Case Competitions',
            'Won operational bid to run IIML\'s official merchandise store',
        ],
    },
    {
        degree: 'B.Tech — Computer Science (Honors)',
        school: 'NIT Trichy',
        period: '2015 — 2019',
        badge: '9.27',
        accent: '#22D3EE',
        highlights: [
            'CGPA: 9.27 — Top of department',
            'Honors Degree with distinction',
            'Minor in Management',
        ],
    },
    {
        degree: 'JEE Main (2015)',
        school: 'National Level',
        period: '2015',
        badge: '995',
        accent: '#FFD700',
        highlights: [
            'AIR 995 / 12.34L+ candidates',
            '99.66 Percentile',
            'Class XII (AP Board): 98.5%, Top 1% Statewide',
        ],
    },
]

// ───────────────── AWARDS ─────────────────
export const awards = [
    { title: 'Employee of the Year (2×)', org: 'Visa Inc.', detail: 'High Judgment (2020), Ownership (2021)', icon: '🏆' },
    { title: 'Spot Award (5×)', org: 'Scopely', detail: 'Product execution and performance (2023–2025)', icon: '⚡' },
    { title: 'Visa Intern → PPO', org: 'Visa Inc.', detail: 'Pre-placement offer after internship; recognized for top performance', icon: '💼' },
    { title: 'Deloitte USI Intern', org: 'Deloitte', detail: 'Consulting intern; recognized for top performance', icon: '💼' },
    { title: 'JEE Main AIR 995', org: 'National', detail: '99.66 Percentile out of 12.34L+ candidates', icon: '🎯' },
    { title: "Dean's Merit List", org: 'IIM Lucknow', detail: 'Top academic cohort in MBA program', icon: '🎓' },
    { title: 'National Case Finalist', org: 'Microsoft PM Engage, XLRI', detail: 'Multiple national-level case competition finals', icon: '🎖️' },
]

// ───────────────── SKILLS ─────────────────
export const skillCategories = [
    {
        category: 'Product Strategy & LiveOps',
        skills: [
            'Roadmap Planning', 'Feature Design', 'LiveOps Scheduling',
            'Monetization Systems', 'Player Segmentation', 'Revenue Forecasting',
            'Retention Optimization',
        ],
    },
    {
        category: 'Product Analytics & Experimentation',
        skills: [
            'A/B Testing', 'ARPDAU/ARPPU/LTV Tracking', 'Config Automation',
            'Tableau', 'SQL',
        ],
    },
]

export const skills = [
    'Product Strategy', 'Monetization', 'LiveOps', 'A/B Testing',
    'Data Engineering', 'Python', 'SQL', 'Spark', 'Hadoop',
    'React', 'JavaScript', 'Game Design', 'User Research',
    'Revenue Optimization', 'Segmentation', 'Analytics',
]

// ───────────────── CHARACTER STATS ─────────────────
export const characterStats = [
    { axis: 'Revenue Ownership', value: 95, basis: '$80M+ P&L ownership' },
    { axis: 'Analytical Depth', value: 90, basis: '1PB+ data pipelines' },
    { axis: 'Product Intuition', value: 88, basis: '35+ products, PM role' },
    { axis: 'Technical Skills', value: 85, basis: 'CS Honors, Spark, Python' },
    { axis: 'Leadership', value: 82, basis: '7-member team, CEO' },
    { axis: 'Creativity', value: 78, basis: 'Photography, game design' },
]

