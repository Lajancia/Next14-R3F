'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaShieldAlt, FaBolt, FaNetworkWired, FaCogs, FaGithub, FaLock } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { css } from '../../../styled-system/css'

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

interface NodeMeta {
  icon: IconType
  color: string
}

const nodeMeta: Record<string, NodeMeta> = {
  user: { icon: FaUser, color: '#f54927' },
  nginx: { icon: FaShieldAlt, color: '#0cf' },
  nextjs: { icon: FaBolt, color: '#f3f3f3' },
  k3s: { icon: FaNetworkWired, color: '#00d4aa' },
  jenkins: { icon: FaCogs, color: '#d24939' },
  github: { icon: FaGithub, color: '#8b6ec8' },
  tailscale: { icon: FaLock, color: '#7350b7' },
}

function TimelineCard({ node, index, activeId, isDark, onSelect }: { node: NodeInfo; index: number; activeId: string | null; isDark: boolean; onSelect: () => void }) {
  const meta = nodeMeta[node.id]
  const Icon = meta.icon
  const active = activeId === node.id
  const side = index % 2 === 0 ? 'left' : 'right'
  const color = node.id === 'nextjs' && !isDark ? '#1e1e1e' : meta.color

  return (
    <div className={TimelineItemStyle}>
      <div className={TimelineRailStyle}>
        <motion.span
          className={TimelineDotStyle}
          style={{ backgroundColor: color, boxShadow: `0 0 0 6px ${color}22` }}
          animate={active ? { scale: [1, 1.5, 1], opacity: [1, 0.55, 1] } : { scale: 1, opacity: 0.9 }}
          transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
        />
      </div>
      <motion.button
        type='button'
        className={TimelineCardStyle({ side, active })}
        onClick={onSelect}
        onFocus={onSelect}
        initial={{ opacity: 0, y: 52, rotateX: -9 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: false, amount: 0.55 }}
        transition={{ duration: 0.62, ease: 'easeOut' }}
        whileHover={{ y: -8, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        aria-pressed={active}
      >
        <motion.span
          className={IconHaloStyle}
          style={{ backgroundColor: `${color}18`, color }}
          animate={active ? { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.85, repeat: active ? Infinity : 0, repeatDelay: 1.4 }}
        >
          <Icon />
        </motion.span>
        <span className={CardContentStyle}>
          <span className={CardKickerStyle} style={{ color }}>{`0${index + 1} · ${node.subtitle}`}</span>
          <strong className={CardTitleStyle}>{node.label}</strong>
          <span className={CardHeadlineStyle}>{node.title}</span>
          <span className={CardDescriptionStyle}>{node.desc}</span>
          <span className={CardFooterStyle}>
            <span>LIVE PIPELINE</span>
            <motion.i
              style={{ backgroundColor: color }}
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.35, repeat: Infinity, delay: index * 0.15 }}
            />
          </span>
        </span>
        <span className={CardActionStyle} style={{ color }}>{active ? 'ACTIVE' : 'EXPLORE'}</span>
      </motion.button>
    </div>
  )
}

export default function InfrastructureDiagram({ nodes }: InfrastructureDiagramProps) {
  const [activeId, setActiveId] = useState<string | null>(nodes[0]?.id ?? null)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setActiveId(nodes[0]?.id ?? null)
  }, [nodes])

  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.getAttribute('data-color-mode') !== 'light')
    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-color-mode'] })
    return () => observer.disconnect()
  }, [])

  return (
    <section className={RootStyle} aria-label='Infrastructure timeline'>
      <div className={ScrollAreaStyle}>
        <div className={TimelineStyle}>
          <div className={MainLineStyle} />
          {nodes.map((node, index) => (
            <div key={node.id}>
              <TimelineCard node={node} index={index} activeId={activeId} isDark={isDark} onSelect={() => setActiveId(node.id)} />
              {index < nodes.length - 1 && (
                <div className={SignalSegmentStyle}>
                  <motion.span
                    className={SignalPacketStyle}
                    animate={{ y: ['0%', '460%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.7, delay: index * 0.17, repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={EndCapStyle}>END OF FLOW</div>
      </div>
    </section>
  )
}

const RootStyle = css({ width: '100%', height: '100%', overflow: 'hidden' })

const ScrollAreaStyle = css({
  height: '100%',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  scrollSnapType: 'y mandatory',
  padding: '1.5rem 1rem 5rem',
  md: { padding: '2.5rem 3rem 6rem' },
})

const TimelineStyle = css({ position: 'relative', maxWidth: '1180px', margin: '0 auto' })

const MainLineStyle = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: '1.55rem',
  width: '1px',
  background: 'linear-gradient(180deg, transparent, rgba(255,165,0,0.5) 7%, rgba(130,150,255,0.45) 92%, transparent)',
  md: { left: '50%' },
})

const TimelineItemStyle = css({
  position: 'relative',
  minHeight: '36dvh',
  display: 'flex',
  alignItems: 'center',
  scrollSnapAlign: 'center',
  md: { minHeight: '42dvh' },
})

const TimelineRailStyle = css({
  position: 'absolute',
  left: '1.05rem',
  zIndex: 2,
  md: { left: 'calc(50% - 0.5rem)' },
})

const TimelineDotStyle = css({ display: 'block', width: '1rem', height: '1rem', borderRadius: '50%', border: '2px solid #1e1e1e' })

const TimelineCardStyle = (props: { side: string; active: boolean }) =>
  css({
    width: 'calc(100% - 3.8rem)',
    marginLeft: '3.8rem',
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-start',
    gap: '1rem',
    padding: '1.25rem',
    color: 'MainText',
    textAlign: 'left',
    fontFamily: 'inherit',
    border: '1px solid',
    borderColor: props.active ? 'orange' : 'rgba(127,127,127,0.28)',
    borderRadius: '18px',
    background: props.active ? 'rgba(127,127,127,0.16)' : 'rgba(127,127,127,0.07)',
    boxShadow: props.active ? '0 14px 44px rgba(0,0,0,0.24)' : '0 8px 28px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    md: {
      width: 'calc(50% - 3rem)',
      marginLeft: props.side === 'left' ? 0 : 'calc(50% + 3rem)',
      padding: '1.5rem',
    },
  })

const IconHaloStyle = css({
  display: 'grid',
  flexShrink: 0,
  width: '3rem',
  height: '3rem',
  placeItems: 'center',
  borderRadius: '14px',
  fontSize: '1.35rem',
})

const CardContentStyle = css({ display: 'flex', flex: 1, flexDirection: 'column', gap: '0.2rem' })
const CardKickerStyle = css({ fontSize: '0.65rem', letterSpacing: '0.06em' })
const CardTitleStyle = css({ fontSize: '1.35rem', lineHeight: 1.1 })
const CardHeadlineStyle = css({ fontSize: '0.8rem', color: 'MainText', opacity: 0.75 })
const CardDescriptionStyle = css({ fontSize: '0.76rem', lineHeight: 1.55, color: '#999', marginTop: '0.35rem' })
const CardFooterStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.38rem',
  marginTop: '0.65rem',
  color: '#777',
  fontSize: '0.58rem',
  letterSpacing: '0.1em',
  '& i': { display: 'block', width: '5px', height: '5px', borderRadius: '50%' },
})
const CardActionStyle = css({ fontSize: '0.58rem', letterSpacing: '0.1em', paddingTop: '0.1rem' })

const SignalSegmentStyle = css({ position: 'relative', height: '1.4rem', marginLeft: '1.35rem', overflow: 'hidden', md: { marginLeft: 'calc(50% - 0.2rem)' } })
const SignalPacketStyle = css({ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'orange', boxShadow: '0 0 12px 4px rgba(255,165,0,0.45)' })
const EndCapStyle = css({ padding: '3rem 0 1rem', color: '#777', fontSize: '0.65rem', letterSpacing: '0.22em', textAlign: 'center' })
