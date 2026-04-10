'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemText, useScrollTrigger,
  Slide, alpha, useTheme, useMediaQuery,
} from '@mui/material'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PhoneIcon from '@mui/icons-material/Phone'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Our Doctors', href: '#doctors' },
  { label: 'Our Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Locate Us', href: '#map' },
]

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger({ threshold: 100 })
  return <Slide appear={false} direction="down" in={!trigger}>{children}</Slide>
}

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = useCallback((href: string) => {
    setDrawerOpen(false)
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          elevation={0}
          className={styles.appBar}
          sx={{
            background: scrolled
              ? 'rgba(255,255,255,0.96)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? `1px solid rgba(11,83,148,0.1)` : 'none',
            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: scrolled ? '0 2px 24px rgba(11,83,148,0.08)' : 'none',
          }}
        >
          <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1, minHeight: { xs: '68px', md: '76px' } }}>
            {/* Logo */}
            <Box
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer', flexShrink: 0 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(11,83,148,0.35)',
                }}
              >
                <Image
                  src="/atharva-logo-removebg-preview.png"
                  alt="Atharva logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Box
                  component="span"
                  sx={{
                    display: 'block',
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: scrolled ? 'primary.dark' : '#fff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    transition: 'color 0.4s',
                  }}
                >
                  Atharva children's hospital
                </Box>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Nav */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {NAV_LINKS.map(link => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <Button
                      key={link.label}
                      onClick={() => handleNav(link.href)}
                      sx={{
                        color: scrolled ? (isActive ? 'primary.main' : 'text.primary') : '#fff',
                        fontWeight: isActive ? 600 : 500,
                        fontSize: '0.88rem',
                        px: 1.5,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 6,
                          left: '50%',
                          transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                          transformOrigin: 'center',
                          width: '60%',
                          height: '2px',
                          background: isActive
                            ? (scrolled ? '#0B5394' : '#fff')
                            : (scrolled ? '#0B5394' : '#fff'),
                          borderRadius: '2px',
                          transition: 'transform 0.3s ease',
                        },
                        '&:hover::after': { transform: 'translateX(-50%) scaleX(1)' },
                        '&:hover': {
                          background: scrolled
                            ? alpha('#0B5394', 0.06)
                            : alpha('#fff', 0.1),
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                  )
                })}

                {/* Emergency CTA */}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PhoneIcon sx={{ fontSize: '1rem !important' }} />}
                  href="#op-registration"
                  onClick={(e) => { e.preventDefault(); handleNav('#op-registration') }}
                  sx={{ ml: 1.5, fontSize: '0.85rem', py: 1, px: 2.5 }}
                >
                  Book Appointment
                </Button>
              </Box>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setDrawerOpen(true)}
                sx={{ color: scrolled ? 'primary.main' : '#fff', ml: 1 }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: '20px 0 0 20px',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: 'white',
              }}
            >
              <Image
                src="/atharva-logo-removebg-preview.png"
                alt="Atharva logo"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Box
              component="span"
              sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, fontSize: '1.15rem', color: 'primary.dark' }}
            >
              Atharva
            </Box>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {NAV_LINKS.map(link => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => handleNav(link.href)}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  color: activeSection === link.href.slice(1) ? 'primary.main' : 'text.primary',
                  fontWeight: activeSection === link.href.slice(1) ? 600 : 400,
                  background: activeSection === link.href.slice(1) ? alpha('#0B5394', 0.06) : 'transparent',
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 'inherit' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3, px: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleNav('#op-registration')}
            startIcon={<PhoneIcon />}
          >
            Book Appointment
          </Button>
        </Box>

        <Box sx={{ mt: 3, px: 1, pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
          <Box sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>Emergency</Box>
          <Box
            component="a"
            href="tel:+919876543210"
            sx={{ fontSize: '1rem', color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
          >
            +91 98765 43210
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
