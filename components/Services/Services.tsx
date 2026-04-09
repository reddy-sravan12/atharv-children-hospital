'use client'

import { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styles from './Services.module.css'
import { SERVICES } from '@/data'

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: any
    const initGSAP = async () => {
      try {
        const gsap = (await import('gsap')).default
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          gsap.fromTo(
            '.section-header-services',
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: '.section-header-services', start: 'top 80%' },
            }
          )

          gsap.fromTo(
            '.service-card-item',
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.55,
              stagger: 0.09,
              ease: 'power3.out',
              scrollTrigger: { trigger: '.services-grid', start: 'top 78%' },
            }
          )
        }, sectionRef)
      } catch (e) {
        console.warn('GSAP failed', e)
      }
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <Box component="section" id="services" ref={sectionRef} className={styles.section}>
      <Box className="container">
        <Box className={`section-header section-header-services`}>
          <Box component="span" className="section-eyebrow">
            <MedicalServicesIcon sx={{ fontSize: 14 }} />
            What We Offer
          </Box>
          <Typography variant="h2" className="section-title">
            Our Clinical Services
          </Typography>
          <Typography className="section-subtitle">
            From preventive care to complex interventions, our departments are equipped with cutting-edge technology and expert teams.
          </Typography>
        </Box>

        <Box className={`${styles.grid} services-grid`}>
          {SERVICES.map((service) => (
            <Box key={service.id} className={`${styles.card} service-card-item`}>
              <Box className={styles.iconBox}>
                <span className={styles.emoji} role="img" aria-label={service.title}>
                  {service.icon}
                </span>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  color: 'var(--primary-dark)',
                  mb: 0.8,
                }}
              >
                {service.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.88rem',
                  color: 'var(--gray-600)',
                  lineHeight: 1.65,
                  flexGrow: 1,
                }}
              >
                {service.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
