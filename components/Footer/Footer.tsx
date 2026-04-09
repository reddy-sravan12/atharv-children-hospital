'use client'

import { Box, Typography, Grid, IconButton, Divider } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { HOSPITAL_INFO, SERVICES } from '@/data'
import styles from './Footer.module.css'

const QUICK_LINKS = [
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Services', href: '#services' },
  { label: 'OPD Registration', href: '#op-registration' },
  { label: 'Patient Reviews', href: '#reviews' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Find Us', href: '#map' },
]

// const SPECIALTIES = [
//   'Cardiology', 'Neurology', 'Orthopaedics',
//   'Paediatrics', 'Oncology', 'Emergency Care',
//   'Ophthalmology', 'Pulmonology',
// ]

const SOCIALS = [
  { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
  { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
  { icon: <YouTubeIcon />, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const handleNav = (href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <Box component="footer" className={styles.footer}>
      <Box className="container" width={"100%"}>
        <Grid container spacing={5}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box className={styles.logoIcon}>
                <LocalHospitalIcon sx={{ color: '#fff', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    color: '#fff',
                    lineHeight: 1.2,
                  }}
                >
                  Atharva children's <br />hospital
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.7, mb: 2.5, maxWidth: 280 }}>
              Experienced pediatrician with 6+ years of caring for children.Provides reliable diagnosis and treatment for common childhood illnesses.Friendly, gentle approach that keeps kids comfortable and parents confident.
            </Typography>

            {/* Contact quick links */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2.5 }}>
              <Box
                component="a"
                href={`tel:${HOSPITAL_INFO.phone}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#90E0EF' } }}
              >
                <PhoneIcon sx={{ fontSize: 16, color: '#90E0EF' }} />
                {HOSPITAL_INFO.phone}
              </Box>
              <Box
                component="a"
                href={`mailto:${HOSPITAL_INFO.email}`}
                sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#90E0EF' } }}
              >
                <EmailIcon sx={{ fontSize: 16, color: '#90E0EF' }} />
                {HOSPITAL_INFO.email}
              </Box>
            </Box>

            {/* Socials */}
            {/* <Box sx={{ display: 'flex', gap: 0.5 }}>
              {SOCIALS.map(s => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: 'rgba(255,255,255,0.5)',
                    transition: 'all 0.2s',
                    '&:hover': { color: '#90E0EF', background: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box> */}
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2.5}>
            <Typography className={styles.colTitle}>Quick Links</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {QUICK_LINKS.map(link => (
                <Box component="li" key={link.label} sx={{ mb: 0.9 }}>
                  <Box
                    component="button"
                    onClick={() => handleNav(link.href)}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={6} md={2.5}>
            <Typography className={styles.colTitle}>Services</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {SERVICES.map(sp => (
                <Box component="li" key={sp.id} sx={{ mb: 0.9 }}>
                  <Box component="span" className={styles.footerText}>{sp.title}</Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Accreditations */}
          {/* <Grid item xs={12} md={3}>
            <Typography className={styles.colTitle}>Accreditations</Typography>
            {['NABL Accredited Lab', 'JCI Certified', 'ISO 9001:2015', 'NABH Accredited', 'Green OT Certified'].map(item => (
              <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.9 }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#00B4D8', flexShrink: 0 }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem' }}>{item}</Typography>
              </Box>
            ))}

            <Box className={styles.emergencyCard}>
              <Box sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFD700', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.3 }}>
                24/7 Emergency
              </Box>
              <Box
                component="a"
                href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.05em' }}
              >
                {HOSPITAL_INFO.emergencyPhone}
              </Box>
            </Box>
          </Grid> */}
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 3.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Atharva children's hospital. All rights reserved.
          </Typography>
          {/* <Box sx={{ display: 'flex', gap: 2.5 }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map(item => (
              <Typography
                key={item}
                component="a"
                href="#"
                sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none', '&:hover': { color: 'rgba(255,255,255,0.7)' } }}
              >
                {item}
              </Typography>
            ))}
          </Box> */}
        </Box>
      </Box>
    </Box>
  )
}
