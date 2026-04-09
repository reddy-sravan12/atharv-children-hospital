'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import Lottie from 'lottie-react'

// --- PLACEHOLDERS ---
// Replace these strings with your actual Lottie JSON objects or local paths
import kids from '../../lib/lottie-json/kids.json' 
import cuteTiger from '../../lib/lottie-json/cuteTiger.json'
import spaceTurtle from '../../lib/lottie-json/spaceTurtle.json'
import childrenLetters from '../../lib/lottie-json/childrenHoldingLetters.json'

import { HERO_DOCTOR } from '../Hero/Hero'

interface Disease {
  id: string
  label: string
  angle: number
  status: 'sick' | 'cured'
}

const INITIAL_DISEASES: Disease[] = [
  { id: 'fever',      label: 'Fever',          angle: 270, status: 'sick' },
  { id: 'cough',      label: 'Cough',          angle: 330, status: 'sick' },
  { id: 'nausea',     label: 'Nausea',         angle: 30,  status: 'sick' },
  { id: 'Other diseases', label: 'Other Diseases', angle: 90, status: 'sick' },
  { id: 'indigestion',label: 'Indigestion',    angle: 150, status: 'sick' },
  { id: 'cold',       label: 'Common Cold',    angle: 210, status: 'sick' },
]

// --- CONSTANTS ---
const RADIUS = 240 // Increased radius to accommodate bigger nodes
const toRad = (deg: number) => (deg * Math.PI) / 180

export default function HealingFlowDiagram() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number | null>(null)
  const stopRef = useRef(false)

  const [ready, setReady] = useState(false)
  const [inView, setInView] = useState(false)
  const [diseases, setDiseases] = useState<Disease[]>(INITIAL_DISEASES)
  const [healing, setHealing] = useState(false)
  const [status, setStatus] = useState('')
  const [size, setSize] = useState({ w: 800, h: 700 })

  // 1. Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (canvasRef.current) observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [])

  // 2. Resize Observer to handle responsive canvas dimensions
  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ w: width, h: height })
      setReady(true)
    })
    if (canvasRef.current) obs.observe(canvasRef.current)
    return () => obs.disconnect()
  }, [])

  const cx = size.w / 2
  const cy = size.h / 2

  const nodePos = (angle: number) => ({
    x: cx + RADIUS * Math.cos(toRad(angle)),
    y: cy + RADIUS * Math.sin(toRad(angle)),
  })

  // 3. Pulse Animation Logic
  const animatePulse = useCallback(
    (toX: number, toY: number, duration: number): Promise<void> => {
      return new Promise(resolve => {
        const pulse = pulseRef.current!
        pulse.style.opacity = '1'
        const start = performance.now()

        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
          
          pulse.style.left = (cx + (toX - cx) * ease) + 'px'
          pulse.style.top = (cy + (toY - cy) * ease) + 'px'

          if (t < 1 && !stopRef.current) {
            animRef.current = requestAnimationFrame(step)
          } else {
            pulse.style.opacity = '0'
            resolve()
          }
        }
        animRef.current = requestAnimationFrame(step)
      })
    },
    [cx, cy]
  )

  // 4. Main Healing Loop
  const startHealing = async () => {
    if (healing) return
    setHealing(true)

    while (!stopRef.current) {
      setDiseases(INITIAL_DISEASES)
      setStatus('Scanning Conditions...')
      await new Promise(r => setTimeout(r, 1000))

      for (let i = 0; i < INITIAL_DISEASES.length; i++) {
        if (stopRef.current) break
        const d = INITIAL_DISEASES[i]
        const { x, y } = nodePos(d.angle)

        setStatus(`Treating ${d.label}...`)
        await animatePulse(x, y, 700)

        setDiseases(prev =>
          prev.map(n => (n.id === d.id ? { ...n, status: 'cured' } : n))
        )
        await new Promise(r => setTimeout(r, 300))
      }

      setStatus('All conditions treated successfully!')
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  useEffect(() => {
    if (ready && inView) {
      stopRef.current = false
      startHealing()
    }
    return () => {
      stopRef.current = true
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [ready, inView])

  return (
    <Box 
      sx={{ 
        p: 4, 
        background: 'var(--color-background-secondary)', 
        borderRadius: 8, 
        position: 'relative',
        overflow: 'hidden',
        minHeight: 750 
      }}
    >
      {/* --- FLOATING LOTTIE DECORATIONS --- */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, width: 220, opacity: 0.5, pointerEvents: 'none' }}>
        <Lottie animationData={spaceTurtle} loop={true} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 350, opacity: 0.5, pointerEvents: 'none' }}>
        <Lottie animationData={kids} loop={true} />
      </Box>

      <Box sx={{ position: 'absolute', bottom: 20, left: 20, width: 220, opacity: 0.5, pointerEvents: 'none' }}>
        <Lottie animationData={cuteTiger} loop={true} />
      </Box>
      <Box sx={{ position: 'absolute', top: -10, right: -30, width: 350, opacity: 0.5, pointerEvents: 'none' }}>
        <Lottie animationData={childrenLetters} loop={true} />
      </Box>

      {/* --- CANVAS --- */}
      <Box ref={canvasRef} sx={{ position: 'relative', width: '100%', height: 700 }}>
        
        {/* SVG Lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}>
          {diseases.map(d => {
            const { x, y } = nodePos(d.angle)
            return (
              <line
                key={d.id}
                x1={cx} y1={cy} x2={x} y2={y}
                stroke={d.status === 'cured' ? '#4ade80' : '#cbd5e0'}
                strokeWidth={3}
                strokeDasharray="8 5"
                style={{ transition: 'stroke 0.5s' }}
              />
            )
          })}
        </svg>

        {/* Pulse Dot */}
        <Box
          ref={pulseRef}
          sx={{
            position: 'absolute',
            width: 22, height: 22,
            borderRadius: '50%',
            background: '#22c55e',
            opacity: 0,
            zIndex: 10,
            transform: 'translate(-50%,-50%)',
            boxShadow: '0 0 15px 5px rgba(34,197,94,0.5)',
          }}
        />

        {/* Doctor Center Node (BIGGER) */}
        <Box
          sx={{
            position: 'absolute',
            left: cx, top: cy,
            transform: 'translate(-50%,-50%)',
            textAlign: 'center',
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              width: 140, height: 140, // Enlarged
              borderRadius: '50%',
              background: '#fff',
              border: '5px solid #3b82f6',
              p: 0.5,
              boxShadow: '0 12px 30px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={HERO_DOCTOR.image}
              alt="Doctor"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </Box>
          <Typography sx={{ mt: 1.5, fontSize: '15px', fontWeight: 800, color: '#1e3a8a', textTransform: 'uppercase' }}>
            Dr. Chaitanya
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#60a5fa', fontWeight: 600 }}>
            Pediatrician Specialist
          </Typography>
        </Box>

        {/* Disease Nodes (BIGGER) */}
        {diseases.map(d => {
          const { x, y } = nodePos(d.angle)
          const cured = d.status === 'cured'
          return (
            <Box
              key={d.id}
              sx={{
                position: 'absolute',
                left: x, top: y,
                transform: 'translate(-50%,-50%)',
                zIndex: 4,
                padding: '14px 28px', // Increased padding
                borderRadius: '18px',
                background: cured ? '#f0fff4' : '#fff',
                border: cured ? '3px solid #22c55e' : '3px dashed #cbd5e0',
                color: cured ? '#166534' : '#64748b',
                fontSize: '16px', // Bigger text
                fontWeight: 700,
                whiteSpace: 'nowrap',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: cured ? '0 8px 20px rgba(34, 197, 94, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)',
                ...(cured && { animation: 'popIn 0.4s ease forwards' }),
              }}
            >
              {cured ? `✓ ${d.label}` : d.label}
            </Box>
          )
        })}
      </Box>

      {/* Bottom Status Info */}
      <Box sx={{ textAlign: 'center', mt: -2, zIndex: 10, position: 'relative' }}>
        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.1em' }}>
          {status.toUpperCase()}
        </Typography>
      </Box>

      <style>{`
        @keyframes popIn {
          0% { transform: translate(-50%,-50%) scale(0.9); }
          50% { transform: translate(-50%,-50%) scale(1.1); }
          100% { transform: translate(-50%,-50%) scale(1); }
        }
      `}</style>
    </Box>
  )
}