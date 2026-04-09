'use client'

import { useState } from 'react'
import {
  Box, Typography, TextField, Button,
  Grid, Alert, CircularProgress,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import SendIcon from '@mui/icons-material/Send'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styles from './Contact.module.css'
import { HOSPITAL_INFO } from '@/data'

const WHATSAPP_NUMBER='8019884588'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const INFO_ITEMS = [
  {
    icon: <PhoneIcon />,
    label: 'Phone',
    value: HOSPITAL_INFO.phone,
    href: `tel:${HOSPITAL_INFO.phone}`,
  },
  {
    icon: <EmailIcon />,
    label: 'Email',
    value: HOSPITAL_INFO.email,
    href: `mailto:${HOSPITAL_INFO.email}`,
  },
  {
    icon: <LocationOnIcon />,
    label: 'Address',
    value: HOSPITAL_INFO.address,
    href: HOSPITAL_INFO.googleMapsUrl,
  },
  {
    icon: <AccessTimeIcon />,
    label: 'Hours',
    value: 'OPD Hours: Mon–Sat (8–9 AM, 4–6 PM) · Sun (9 AM–12 PM)',
    href: null,
  },
]

export default function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>()

  const onSubmit = (data: ContactForm) => {
  const text = encodeURIComponent(
    `Hi, I'm ${data.name}.\n\nSubject: ${data.subject}\n\n${data.message}\n\nPhone: ${data.phone}\nEmail: ${data.email}`
  )
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
  reset()
  toast.success('Opening WhatsApp...')
}

  return (
    <Box component="section" id="contact" className={styles.section}>
      <Box className="container">
        <Box className="section-header">
          <Box component="span" className="section-eyebrow">
            <EmailIcon sx={{ fontSize: 14 }} />
            Get In Touch
          </Box>
          <Typography variant="h2" className="section-title">
            Contact Us
          </Typography>
          <Typography className="section-subtitle">
            Have a question or need to schedule a consultation? Our team is here to help — reach out anytime.
          </Typography>
        </Box>

        <Box className={styles.grid}>
          {/* Info Panel */}
          <Box className={styles.infoPanel}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#fff',
                mb: 0.5,
              }}
            >
              We are here for you
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', mb: 3 }}>
              Reach our team for appointments, queries, or emergency assistance.
            </Typography>

            <Box className={styles.infoItems}>
              {INFO_ITEMS.map((item) => (
                <Box
                  key={item.label}
                  className={styles.infoItem}
                  component={item.href ? 'a' : 'div'}
                  href={item.href || undefined}
                  target={item.href && !item.href.startsWith('tel') && !item.href.startsWith('mailto') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <Box className={styles.infoIcon}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Box sx={{ fontSize: '0.72rem', color: 'rgba(144,224,239,0.8)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.2 }}>
                      {item.label}
                    </Box>
                    <Box sx={{ fontSize: '0.9rem', color: '#fff', lineHeight: 1.5 }}>
                      {item.value}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Emergency Banner */}
            {/* <Box className={styles.emergencyBanner}>
              <Box sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFD700', mb: 0.3 }}>
                24/7 Emergency
              </Box>
              <Box
                component="a"
                href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                sx={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.04em' }}
              >
                {HOSPITAL_INFO.emergencyPhone}
              </Box>
            </Box> */}
          </Box>

          {/* Contact Form */}
          <Box className={styles.formPanel}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: 'var(--primary-dark)',
                mb: 0.5,
                fontSize: '1.25rem',
              }}
            >
              Send us a message
            </Typography>
            <Typography sx={{ color: 'var(--gray-600)', fontSize: '0.88rem', mb: 3 }}>
              We typically respond within 24 hours on business days.
            </Typography>

            {submitted && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: '10px' }}>
                Thank you! Your message has been sent successfully.
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[0-9+\s\-()]{7,15}$/, message: 'Invalid phone number' },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    {...register('subject', { required: 'Subject is required' })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message too short (min 10 chars)' },
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
                    sx={{ py: 1.4 }}
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
