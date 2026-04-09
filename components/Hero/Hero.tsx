'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Button, Typography, Chip } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import VerifiedIcon from '@mui/icons-material/Verified'
import dynamic from 'next/dynamic'
import styles from './Hero.module.css'
import { HERO_BG_IMAGES } from '@/data'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const HERO_DOCTOR = {
  name: 'Dr. Challa Chaitanya',
  title: 'md consultant pediatric',
  subtitle: 'MBBS, MD, PGPN',
  description:
    'Experienced pediatrician with 6+ years of caring for children.\nProvides reliable diagnosis and treatment for common childhood illnesses.\nFriendly, gentle approach that keeps kids comfortable and parents confident.',
  image: 'https://atharv-children-hospital.s3.eu-north-1.amazonaws.com/chaitu_attha.jpeg',
}

const STATS = [
  { value: '3,000+', label: 'Happy Patients' },
  { value: '1', label: 'Experienced Doctor' },
  { value: '3', label: 'Support Staff' },
  { value: 'In-house', label: 'Pharmacy Available' },
  { value: 'In-house', label: 'Diagnostics Lab' },
]

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0)
  const [gsapLoaded, setGsapLoaded] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const doctorRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Background carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % HERO_BG_IMAGES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    let ctx: any
    const initGSAP = async () => {
      try {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)
        setGsapLoaded(true)

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.3 })

          // Staggered content entrance
          tl.fromTo(
            '.hero-eyebrow',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
          )
            .fromTo(
              '.hero-name',
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
              '-=0.4'
            )
            .fromTo(
              '.hero-title',
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
              '-=0.5'
            )
            .fromTo(
              '.hero-desc',
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
              '-=0.4'
            )
            .fromTo(
              '.hero-cta',
              { opacity: 0, y: 20, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
              '-=0.3'
            )
            .fromTo(
              '.hero-stat',
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
              '-=0.2'
            )

          // Doctor card entrance
          gsap.fromTo(
            '.hero-doctor-card',
            { opacity: 0, x: 60, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
          )

          // Floating shapes continuous animation
          gsap.to('.floating-shape-1', {
            y: -20, rotation: 5, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
          })
          gsap.to('.floating-shape-2', {
            y: 15, rotation: -8, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.8,
          })
          gsap.to('.floating-shape-3', {
            y: -12, x: 8, duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5,
          })
        }, heroRef)
      } catch (e) {
        console.warn('GSAP load failed', e)
      }
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  const handleBookAppointment = () => {
    const el = document.getElementById('op-registration')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <Box
      component="section"
      id="hero"
      ref={heroRef}
      className={styles.hero}
    >
      {/* Background Carousel */}
      <Box className={styles.bgCarousel}>
        {HERO_BG_IMAGES.map((img, i) => (
          <Box
            key={img}
            className={`${styles.bgSlide} ${i === currentBg ? styles.bgSlideActive : ''}`}
            sx={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <Box className={styles.bgOverlay} />
      </Box>

      {/* Floating Shapes */}
      <Box className={`${styles.floatingShape} ${styles.shape1} floating-shape-1`} />
      <Box className={`${styles.floatingShape} ${styles.shape2} floating-shape-2`} />
      <Box className={`${styles.floatingShape} ${styles.shape3} floating-shape-3`} />

      {/* Lottie Animation */}
      <Box className={styles.lottieWrapper}>
        <div style={{ width: 200, height: 200, opacity: 0.18 }}>
          {/* Lottie placeholder — swap with actual healthcare animation JSON */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
              <animateTransform attributeName="transform" type="rotate" dur="8s" repeatCount="indefinite" from="0 100 100" to="360 100 100" />
            </circle>
            <circle cx="100" cy="100" r="55" fill="none" stroke="rgba(0,180,216,0.6)" strokeWidth="1.5" strokeDasharray="20 10">
              <animateTransform attributeName="transform" type="rotate" dur="5s" repeatCount="indefinite" from="0 100 100" to="-360 100 100" />
            </circle>
            <path d="M85 100 h10 v-10 h10 v10 h10 v10 h-10 v10 h-10 v-10 h-10 z" fill="rgba(255,255,255,0.7)" />
          </svg>
        </div>
      </Box>

      {/* Content */}
      <Box className={styles.content} ref={contentRef}>
        <Box className={styles.textSide}>
         {/* Eyebrow */}
<Typography
  className="hero-eyebrow"
  sx={{
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: 'rgba(144,224,239,0.9)',
    textTransform: 'uppercase',
    mb: 1,
    opacity: 0,
  }}
>
  Pediatric Consultant
</Typography>

{/* Name */}
<Typography
  className="hero-name"
  variant="h1"
  sx={{
    fontSize: { xs: '2.2rem', md: '3.2rem', lg: '3.8rem' },
    fontFamily: '"Playfair Display", serif',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1.1,
    letterSpacing: '-0.01em',
    mb: 0.5,
    opacity: 0,
  }}
>
  {HERO_DOCTOR.name}
</Typography>

{/* Subtitle — qualifications */}
<Typography
  sx={{
    fontSize: '0.85rem',
    fontWeight: 400,
    color: 'rgba(144,224,239,0.85)',
    letterSpacing: '0.04em',
    mb: 1,
    textAlign:'right',
    mr:"30px"
  }}
>
  {HERO_DOCTOR.subtitle}
</Typography>

{/* Title — role */}
{/* <Typography
  className="hero-title"
  sx={{
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'capitalize',
    letterSpacing: '0.01em',
    mb: 2.5,
    opacity: 0,
  }}
>
  {HERO_DOCTOR.title}
</Typography> */}

{/* Divider accent */}
<Box sx={{ width: 36, height: '2px', background: 'rgba(144,224,239,0.6)', borderRadius: '2px', mb: 2.5 }} />

{/* Description */}
<Typography
  className="hero-desc"
  sx={{
    fontSize: { xs: '0.95rem', md: '1.05rem' },
    fontWeight: 400,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 1.75,
    maxWidth: 480,
    mb: 4,
    opacity: 0,
  }}
>
  {HERO_DOCTOR.description}
</Typography>
 <Box className="hero-cta" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', opacity: 0 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<CalendarMonthIcon />}
              onClick={handleBookAppointment}
              sx={{
                background: 'linear-gradient(135deg, #00B4D8, #0077B6)',
                boxShadow: '0 8px 30px rgba(0,180,216,0.4)',
                fontSize: '1rem',
                py: 1.6,
                px: 4,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 40px rgba(0,180,216,0.5)',
                },
              }}
            >
              Book Appointment
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                const el = document.getElementById('doctors')
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80
                  window.scrollTo({ top, behavior: 'smooth' })
                }
              }}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.5)',
                borderWidth: '2px',
                fontSize: '1rem',
                py: 1.5,
                px: 3.5,
                '&:hover': {
                  borderColor: '#fff',
                  background: 'rgba(255,255,255,0.1)',
                  borderWidth: '2px',
                },
              }}
            >
              Meet Our Doctors
            </Button>
          </Box>
        </Box>

        {/* Doctor Card */}
        <Box className={`${styles.doctorCard} hero-doctor-card`} ref={doctorRef}>
          <Box
            component="img"
            src={HERO_DOCTOR.image}
            alt={HERO_DOCTOR.name}
            className={styles.doctorImage}
          />
          <Box className={styles.doctorCardOverlay}>
            <Typography sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: '#fff', fontSize: '1.1rem' }}>
              {HERO_DOCTOR.name}
            </Typography>
            <Typography sx={{ color: 'rgba(144,224,239,0.9)', fontSize: '0.85rem', mt: 0.3 }}>
              {HERO_DOCTOR.title}
            </Typography>
          </Box>
          {/* <Box className={styles.availableBadge}>
            <Box className={styles.availableDot} />
            Available Today
          </Box> */}
        </Box>
      </Box>

      {/* Stats Bar */}
      <Box className={styles.statsBar} ref={statsRef}>
        {STATS.map((stat) => (
          <Box key={stat.label} className={`${styles.statItem} hero-stat`} sx={{ opacity: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: '#fff',
                fontSize: { xs: '1.5rem', md: '1.9rem' },
                lineHeight: 1,
              }}
            >
              {stat.value}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', fontWeight: 500, mt: 0.3 }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
