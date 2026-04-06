'use client'

import { useEffect, useRef } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import styles from './Doctors.module.css'
import { DOCTORS } from '@/data'

export default function Doctors() {
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
            '.section-header-doctors',
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: '.section-header-doctors',
                start: 'top 80%',
              },
            }
          )

          gsap.fromTo(
            '.doctor-card-item',
            { opacity: 0, y: 60, scale: 0.94 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.doctors-grid',
                start: 'top 75%',
              },
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
    <Box component="section" id="doctors" ref={sectionRef} className={styles.section}>
      <Box className="container">
        <Box className={`section-header section-header-doctors`}>
          <Box component="span" className="section-eyebrow">
            <LocalHospitalIcon sx={{ fontSize: 14 }} />
            Our Specialists
          </Box>
          <Typography variant="h2" className="section-title">
            Meet Our Expert Doctors
          </Typography>
          <Typography className="section-subtitle">
            Our team of highly experienced specialists brings world-class expertise and unwavering commitment to your health and recovery.
          </Typography>
        </Box>

        <Box className={`${styles.grid} doctors-grid`}>
          {DOCTORS.map((doctor) => (
            <Box key={doctor.id} className={`${styles.card} doctor-card-item`}>
              <Box className={styles.imageWrapper}>
                <Box
                  component="img"
                  src={doctor.image}
                  alt={doctor.name}
                  className={styles.image}
                  loading="lazy"
                />
                <Box className={styles.imageOverlay}>
                  <Box className={styles.experienceBadge}>
                    <WorkspacePremiumIcon sx={{ fontSize: 14 }} />
                    {doctor.experience}
                  </Box>
                </Box>
              </Box>

              <Box className={styles.cardBody}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'var(--primary-dark)',
                    mb: 0.3,
                  }}
                >
                  {doctor.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: 'var(--primary-light)',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {doctor.designation}
                </Typography>

                <Chip
                  label={doctor.specialization}
                  size="small"
                  sx={{
                    background: 'var(--gray-50)',
                    color: 'var(--gray-600)',
                    fontSize: '0.74rem',
                    fontWeight: 500,
                    mb: 1,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: '0.78rem',
                    color: 'var(--gray-400)',
                    fontStyle: 'italic',
                  }}
                >
                  {doctor.qualification}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
