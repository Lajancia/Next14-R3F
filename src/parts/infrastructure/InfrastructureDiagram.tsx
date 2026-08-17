'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaShieldAlt, FaBolt, FaNetworkWired, FaCogs, FaGithub, FaLock } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { css } from '../../../styled-system/css'

/* ─── Types ─── */
export interface NodeInfo {
  id: string
  label: string
  subtitle: string
  title: string
  desc: string
}

interface InfrastructureDiagramProps {
  nodes: NodeInfo[]
  hint?: string
}

/* ─── Node config ─── */
interface NodeMeta {
  icon: IconType
  color: string
  x: number
  y: number
}

const nodeMeta: Record<string, NodeMeta> = {
  user: { icon: FaUser, color: '#f54927', x: 135, y: 190 },
  nginx: { icon: FaShieldAlt, color: '#0cf', x: 375, y: 190 },
  nextjs: { icon: FaBolt, color: '#E9E9E9', x: 615, y: 190 },
  k3s: { icon: FaNetworkWired, color: '#00d4aa', x: 855, y: 190 },
  jenkins: { icon: FaCogs, color: '#d24939', x: 615, y: 405 },
  github: { icon: FaGithub, color: '#6e5494', x: 375, y: 405 },
  tailscale: { icon: FaLock, color: '#6b3fa0', x: 135, y: 405 },
}

const connections: { from: string; to: string; d: string; dashed?: boolean }[] = [
  { from: 'user', to: 'nginx', d: 'M 230 190 L 280 190' },
  { from: 'nginx', to: 'nextjs', d: 'M 470 190 L 520 190' },
  { from: 'nextjs', to: 'k3s', d: 'M 710 190 L 760 190' },
  { from: 'github', to: 'jenkins', d: 'M 470 405 L 520 405' },
  { from: 'jenkins', to: 'k3s', d: 'M 710 405 C 710 300, 760 300, 760 190', dashed: true },
  { from: 'tailscale', to: 'nginx', d: 'M 230 405 C 230 300, 280 300, 280 190', dashed: true },
]

const CARD_W = 190
const CARD_H = 112

/* ─── SVG helpers ─── */
function ArrowDefs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#888" />
      </marker>
    </defs>
  )
}

function FlowDot({ d, color, dur = 3.2, begin = 0 }: { d: string; color: string; dur?: number; begin?: number }) {
  return (
    <circle r="4" fill={color} opacity="0.9">
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} begin={`${begin}s`} />
    </circle>
  )
}

/* ─── Node card ─── */
function NodeCard({
  node,
  isActive,
  isDark,
  onSelect,
}: {
  node: NodeInfo
  isActive: boolean
  isDark: boolean
  onSelect: () => void
}) {
  const meta = nodeMeta[node.id]
  const Icon = meta.icon

  const bg = isDark ? 'rgba(42,42,42,0.85)' : 'rgba(255,255,255,0.85)'
  const border = isActive ? meta.color : isDark ? '#3a3a3a' : '#d8d8d8'
  const shadow = isActive
    ? `0 10px 32px rgba(0,0,0,${isDark ? 0.45 : 0.18}), 0 0 0 1px ${meta.color}`
    : `0 6px 24px rgba(0,0,0,${isDark ? 0.35 : 0.1})`

  return (
    <motion.button
      type='button'
      className={CardBaseStyle}
      style={{
        left: `${(meta.x - CARD_W / 2) / 10}%`,
        top: `${(meta.y - CARD_H / 2) / 5.4}%`,
        width: `${CARD_W / 10}%`,
        height: `${CARD_H / 5.4}%`,
        background: bg,
        borderColor: border,
        boxShadow: shadow,
        transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + (meta.x / 1000) * 0.8 }}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={`${node.label}: ${node.title}`}
    >
      <Icon style={{ color: meta.color, fontSize: '1.5rem' }} />
      <div className={CardTextStyle}>
        <div className={CardLabelStyle}>{node.label}</div>
        <div className={CardSubStyle}>{node.subtitle}</div>
      </div>
    </motion.button>
  )
}

/* ─── Main component ─── */
export default function InfrastructureDiagram({ nodes, hint }: InfrastructureDiagramProps) {
  const [isDark, setIsDark] = useState(true)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const check = () => {
      const mode = document.documentElement.getAttribute('data-color-mode')
      setIsDark(mode !== 'light')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-mode'] })
    return () => observer.disconnect()
  }, [])

  const activeNode = useMemo(() => nodes.find((n) => n.id === activeId) || null, [nodes, activeId])
  const activeMeta = activeNode ? nodeMeta[activeNode.id] : null

  const selectNode = (id: string) => setActiveId((current) => (current === id ? null : id))
  const isLineActive = (from: string, to: string) => activeId === from || activeId === to
  const lineOpacity = (from: string, to: string) => {
    if (!activeId) return 0.4
    return isLineActive(from, to) ? 0.95 : 0.12
  }

  return (
    <div className={DiagramRootStyle}>
      <div className={DiagramScrollStyle}>
        <div className={DiagramStageStyle}>
          {/* SVG layer */}
          <svg className={SvgStyle} viewBox="0 0 1000 540" preserveAspectRatio="none">
            <ArrowDefs />
            {connections.map((c) => {
              const fromMeta = nodeMeta[c.from]
              const opacity = lineOpacity(c.from, c.to)
              return (
                <g key={`${c.from}-${c.to}`}>
                  <motion.path
                    d={c.d}
                    fill="none"
                    stroke={fromMeta.color}
                    strokeWidth={opacity > 0.4 ? 3.5 : 2}
                    strokeDasharray={c.dashed ? '8 6' : undefined}
                    strokeLinecap="round"
                    opacity={opacity}
                    markerEnd="url(#arrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.9, delay: 0.4 + (fromMeta.x / 1000) * 0.6 }}
                  />
                  <FlowDot d={c.d} color={fromMeta.color} dur={opacity > 0.4 ? 2 : 3.5} begin={0} />
                  <FlowDot d={c.d} color={fromMeta.color} dur={opacity > 0.4 ? 2 : 3.5} begin={opacity > 0.4 ? 1 : 1.75} />
                </g>
              )
            })}
          </svg>

          {/* Node cards */}
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              isActive={activeId === node.id}
              isDark={isDark}
              onSelect={() => selectNode(node.id)}
            />
          ))}

          {/* Info panel */}
          <AnimatePresence>
            {activeNode && (
              <motion.div
                className={InfoPanelStyle}
                style={{
                  background: isDark ? 'rgba(30,30,30,0.88)' : 'rgba(233,233,233,0.88)',
                  borderColor: isDark ? '#333' : '#ccc',
                  left: `${activeMeta!.x / 10}%`,
                  top: activeMeta!.y < 300 ? '42%' : '33%',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <span className={InfoTagStyle} style={{ color: nodeMeta[activeNode.id].color }}>
                  {activeNode.title}
                </span>
                <p className={InfoDescStyle}>{activeNode.desc}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={MobileNodeListStyle}>
        {nodes.map((node) => {
          const meta = nodeMeta[node.id]
          const Icon = meta.icon
          const isActive = activeId === node.id
          return (
            <button
              key={node.id}
              type='button'
              className={MobileNodeStyle({ active: isActive })}
              onClick={() => selectNode(node.id)}
              aria-expanded={isActive}
            >
              <span className={MobileIconStyle} style={{ color: meta.color }}>
                <Icon />
              </span>
              <span className={MobileNodeCopyStyle}>
                <strong>{node.label}</strong>
                <small>{node.subtitle}</small>
                {isActive && <em>{node.desc}</em>}
              </span>
              <span className={MobileExpandStyle}>{isActive ? '−' : '+'}</span>
            </button>
          )
        })}
      </div>

      {/* Footer hints */}
      <div className={HintRowStyle}>
        {hint && <span className={isDark ? HintDark : HintLight}>{hint}</span>}
      </div>
    </div>
  )
}

/* ─── Styles ─── */
const DiagramRootStyle = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})

const DiagramScrollStyle = css({
  flex: 1,
  minHeight: 0,
  overflow: 'hidden',
  display: 'none',
  justifyContent: 'center',
  md: { display: 'flex' },
})

const DiagramStageStyle = css({
  position: 'relative',
  flex: '0 1 auto',
  height: '100%',
  width: 'auto',
  maxWidth: '100%',
  aspectRatio: '1000 / 540',
})

const SvgStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
})

const CardBaseStyle = css({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.3rem',
  borderRadius: '14px',
  cursor: 'pointer',
  appearance: 'none',
  padding: 0,
  fontFamily: 'inherit',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
  border: '1px solid transparent',
  boxSizing: 'border-box',
})

const CardTextStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.1rem',
})

const CardLabelStyle = css({
  fontSize: '1.05rem',
  fontWeight: 700,
  color: 'MainText',
  fontFamily: "'Do Hyeon', sans-serif",
  whiteSpace: 'nowrap',
})

const CardSubStyle = css({
  fontSize: '0.62rem',
  color: 'orange',
  fontFamily: "'Do Hyeon', sans-serif",
  whiteSpace: 'nowrap',
})

const InfoPanelStyle = css({
  position: 'absolute',
  transform: 'translateX(-50%)',
  display: 'none',
  width: '28%',
  minWidth: '240px',
  maxWidth: '340px',
  padding: '0.7rem 1.1rem',
  borderRadius: '12px',
  textAlign: 'center',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
  zIndex: 2,
  md: { display: 'block' },
})

const InfoTagStyle = css({
  fontSize: '0.85rem',
  fontWeight: 700,
  fontFamily: "'Do Hyeon', sans-serif",
})

const InfoDescStyle = css({
  fontSize: '0.72rem',
  color: '#999',
  margin: 0,
  marginTop: '0.15rem',
  lineHeight: 1.5,
  fontFamily: "'Do Hyeon', sans-serif",
})

const HintRowStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.4rem 1rem',
  gap: '1rem',
  flexWrap: 'wrap',
})

const MobileNodeListStyle = css({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '0.75rem 1rem 1rem',
  gap: '0.65rem',
  md: { display: 'none' },
})

const MobileNodeStyle = (props: { active: boolean }) =>
  css({
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    gap: '0.8rem',
    padding: '0.9rem',
    textAlign: 'left',
    color: 'MainText',
    background: props.active ? 'rgba(127,127,127,0.16)' : 'rgba(127,127,127,0.08)',
    border: '1px solid',
    borderColor: props.active ? 'orange' : 'rgba(127,127,127,0.25)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease, background 0.2s ease',
  })

const MobileIconStyle = css({ fontSize: '1.25rem', paddingTop: '0.15rem' })
const MobileNodeCopyStyle = css({ display: 'flex', flex: 1, flexDirection: 'column', gap: '0.1rem', fontSize: '1rem' })
const MobileExpandStyle = css({ color: 'orange', fontSize: '1.3rem', lineHeight: 1 })

const HintDark = css({
  fontSize: '0.72rem',
  color: '#666',
  fontFamily: "'Do Hyeon', sans-serif",
  letterSpacing: '0.04em',
})

const HintLight = css({
  fontSize: '0.72rem',
  color: '#8a8a8a',
  fontFamily: "'Do Hyeon', sans-serif",
  letterSpacing: '0.04em',
})
