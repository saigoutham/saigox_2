import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useGameStore from '../../store/useGameStore'
import { actII } from '../../data/resume'

const { skillTree } = actII

/* ── Expanded Node Detail ── */
const NodeDetail = ({ node }) => (
    <motion.div
        className="skill-node__detail"
        initial={{ opacity: 0, height: 0, y: -10 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
        <h4 className="skill-node__detail-title">{node.title}</h4>
        <div className="skill-node__metrics">
            {node.metrics.map((m, i) => (
                <div key={i} className="skill-node__metric">
                    <span className="skill-node__metric-val">{m.val}</span>
                    <span className="skill-node__metric-lbl">{m.label}</span>
                </div>
            ))}
        </div>
        <p className="skill-node__detail-desc">{node.desc}</p>
    </motion.div>
)

/* ── Single Branch ── */
const SkillBranch = ({ branch, index, total }) => {
    const expanded = useGameStore(s => s.skillNodesExpanded)
    const toggle = useGameStore(s => s.toggleSkillNode)
    const isExpanded = expanded.includes(branch.id)

    // Position branches in a radial layout
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    const radius = 280

    return (
        <motion.div
            className={`skill-branch ${isExpanded ? 'skill-branch--expanded' : ''}`}
            style={{
                '--branch-x': `${Math.cos(angle) * radius}px`,
                '--branch-y': `${Math.sin(angle) * radius}px`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.button
                className="skill-branch__node"
                onClick={() => toggle(branch.id)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="skill-branch__label">{branch.label}</span>
                <span className="skill-branch__indicator">{isExpanded ? '−' : '+'}</span>
            </motion.button>

            <AnimatePresence>
                {isExpanded && <NodeDetail node={branch.node} />}
            </AnimatePresence>
        </motion.div>
    )
}

const SkillTree = () => {
    const branches = skillTree.branches

    return (
        <section className="skill-tree" id="skills">
            <motion.div
                className="skill-tree__header"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="section-tag">02 // SKILL TREE</span>
                <h2 className="section-heading">
                    The <span className="glow-text glow-text--dendro">Strategist's</span> Arsenal
                </h2>
            </motion.div>

            <div className="skill-tree__canvas">
                {/* Center hub */}
                <motion.div
                    className="skill-tree__center"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="skill-tree__center-label">{skillTree.center.label}</span>
                    <span className="skill-tree__center-sub">{skillTree.center.sub}</span>
                    <span className="skill-tree__center-metric">{skillTree.center.metric}</span>
                </motion.div>

                {/* SVG connecting lines */}
                <svg className="skill-tree__lines" viewBox="-350 -350 700 700">
                    {branches.map((_, i) => {
                        const angle = (i / branches.length) * Math.PI * 2 - Math.PI / 2
                        const x2 = Math.cos(angle) * 280
                        const y2 = Math.sin(angle) * 280
                        return (
                            <motion.line
                                key={i}
                                x1="0" y1="0" x2={x2} y2={y2}
                                stroke="rgba(132, 204, 22, 0.15)"
                                strokeWidth="1.5"
                                strokeDasharray="6 8"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                            />
                        )
                    })}
                </svg>

                {/* Branches */}
                {branches.map((branch, i) => (
                    <SkillBranch key={branch.id} branch={branch} index={i} total={branches.length} />
                ))}
            </div>
        </section>
    )
}

export default SkillTree
