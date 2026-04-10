'use client'

import { useEffect, useState } from 'react'
import {
  Box, Typography, TextField, Button, Grid,
  MenuItem, InputAdornment, Stepper, Step,
  StepLabel, CircularProgress, Alert, Chip, Divider,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { useForm, Controller, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { generateAppointmentPDF, generateRegistrationId, AppointmentData } from '@/lib/generatePDF'
import { buildWhatsAppMessage, openWhatsApp } from '@/lib/whatsapp'
import styles from './OPRegistration.module.css'

interface OPFormData {
  fullName: string
  age: string
  gender: string
  phone: string
  email: string
  address: string
  symptoms: string
  doctor: string
  date: string
  time: string
}

const PREFERRED_DOCTOR_VALUE = 'Dr. Challa Chaitanya — Pediatric Consultant'
const DOCTOR_OPTIONS = [
  {
    id: 1,
    name: 'Dr. Challa Chaitanya',
    specialization: 'Pediatric Consultant',
    value: PREFERRED_DOCTOR_VALUE,
  },
]

const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say']
const MON_SAT_TIME_SLOTS = [
  '08:00 AM', '08:30 AM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
]
const SUN_TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
]

const STEPS = ['Personal Details', 'Appointment', 'Confirmation']

export default function OPRegistration() {
  const [activeStep, setActiveStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [sendingConfirmation, setSendingConfirmation] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null)

  const {
    register,
    handleSubmit,
    control,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<OPFormData>({
    defaultValues: { gender: '', doctor: PREFERRED_DOCTOR_VALUE, time: '' },
  })

  const selectedDate = useWatch({ control, name: 'date' })
  const timeSlots = getTimeSlotsForDate(selectedDate)

  useEffect(() => {
    const currentTime = getValues('time')
    if (currentTime && !timeSlots.includes(currentTime)) {
      setValue('time', '')
    }
  }, [selectedDate, setValue, getValues, timeSlots])

  const STEP_FIELDS: (keyof OPFormData)[][] = [
    ['fullName', 'age', 'gender', 'phone', 'email', 'address'],
    ['symptoms', 'doctor', 'date', 'time'],
  ]

  function getTimeSlotsForDate(dateValue?: string) {
    if (!dateValue) return MON_SAT_TIME_SLOTS
    const selected = new Date(dateValue)
    const day = selected.getDay()
    return day === 0 ? SUN_TIME_SLOTS : MON_SAT_TIME_SLOTS
  }

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[activeStep])
    if (valid) setActiveStep(prev => prev + 1)
  }

  const onSubmit = async (data: OPFormData) => {
    setSubmitting(true)

    await new Promise(r => setTimeout(r, 1200))

    const regId = generateRegistrationId()
    const now = new Date()
    const formattedDate = new Date(data.date).toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const apptData: AppointmentData = {
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      email: data.email,
      address: data.address,
      symptoms: data.symptoms,
      doctor: data.doctor,
      date: formattedDate,
      time: data.time,
      registrationId: regId,
      generatedAt: now.toLocaleString('en-IN'),
    }

    setAppointmentData(apptData)
    setSubmitting(false)
    setConfirmed(true)
    setActiveStep(2)
    toast.success('Appointment registered successfully!', { duration: 4000 })
  }

  const handleWhatsApp = async () => {
    if (!appointmentData) return
    setSendingConfirmation(true)
    try {
      const message = buildWhatsAppMessage(appointmentData)
      openWhatsApp(message)
      await generateAppointmentPDF(appointmentData)
      toast.success('WhatsApp sent and confirmation slip downloaded.')
    } catch (err) {
      console.error(err)
      toast.error('Failed to send WhatsApp confirmation or download slip. Please try again.')
    } finally {
      setSendingConfirmation(false)
    }
  }

  const handleNewRegistration = () => {
    setActiveStep(0)
    setConfirmed(false)
    setAppointmentData(null)
  }

  // Tomorrow's date as min
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  // 3 months max
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <Box component="section" id="op-registration" className={styles.section}>
      <Box className="container">
        <Box className="section-header">
          <Box component="span" className="section-eyebrow">
            <AssignmentIcon sx={{ fontSize: 14 }} />
            Book Now
          </Box>
          <Typography variant="h2" className="section-title">
            OP Registration
          </Typography>
          <Typography className="section-subtitle">
            Register for an outpatient appointment in minutes. Receive a confirmation slip you can save and share instantly.
          </Typography>
        </Box>

        <Box className={styles.formWrapper}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} className={styles.stepper} alternativeLabel>
            {STEPS.map((label, i) => (
              <Step key={label} completed={activeStep > i}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': { color: 'primary.main' },
                      '&.Mui-completed': { color: 'success.main' },
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, fontFamily: '"DM Sans", sans-serif' }}>
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* ───── STEP 0: Personal Details ───── */}
            {activeStep === 0 && (
              <Box className={styles.stepContent}>
                <Typography variant="h6" className={styles.stepTitle}>
                  Patient Information
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name *"
                      placeholder="As per medical records"
                      InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
                      {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <TextField
                      fullWidth
                      label="Age *"
                      type="number"
                      inputProps={{ min: 0, max: 120 }}
                      {...register('age', {
                        required: 'Required',
                        min: { value: 0, message: 'Invalid' },
                        max: { value: 120, message: 'Invalid' },
                      })}
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: 'Required' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Gender *"
                          error={!!errors.gender}
                          helperText={errors.gender?.message}
                        >
                          {GENDER_OPTIONS.map(g => (
                            <MenuItem key={g} value={g}>{g}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number *"
                      placeholder="+91 XXXXX XXXXX"
                      InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[+]?[0-9\s\-()]{7,15}$/, message: 'Invalid phone number' },
                      })}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      type="email"
                      placeholder="For confirmation email"
                      InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
                      {...register('email', {
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address *"
                      multiline
                      rows={2}
                      placeholder="Street, City, State, PIN"
                      {...register('address', {
                        required: 'Address is required',
                        minLength: { value: 10, message: 'Please enter full address' },
                      })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>
                </Grid>

                <Box className={styles.stepNav}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleNext}
                    sx={{ minWidth: 180 }}
                  >
                    Next: Appointment →
                  </Button>
                </Box>
              </Box>
            )}

            {/* ───── STEP 1: Appointment ───── */}
            {activeStep === 1 && (
              <Box className={styles.stepContent}>
                <Typography variant="h6" className={styles.stepTitle}>
                  Appointment Details
                </Typography>
                <Grid container spacing={2.5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Symptoms / Reason for Visit *"
                      multiline
                      rows={3}
                      placeholder="Describe your symptoms or reason for visiting..."
                      {...register('symptoms', {
                        required: 'Please describe your symptoms',
                        minLength: { value: 5, message: 'Please provide more detail' },
                      })}
                      error={!!errors.symptoms}
                      helperText={errors.symptoms?.message}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="doctor"
                      control={control}
                      rules={{ required: 'Please select a doctor' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Preferred Doctor *"
                          error={!!errors.doctor}
                          helperText={errors.doctor?.message}
                          InputProps={{ startAdornment: <InputAdornment position="start"><MedicalServicesIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
                        >
                          {DOCTOR_OPTIONS.map(d => (
                            <MenuItem key={d.id} value={d.value}>
                              <Box>
                                <Box sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.name}</Box>
                                <Box sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{d.specialization}</Box>
                              </Box>
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Appointment Date *"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: minDate, max: maxDateStr }}
                      InputProps={{ startAdornment: <InputAdornment position="start"><CalendarMonthIcon sx={{ fontSize: 18, color: 'text.secondary' }} /></InputAdornment> }}
                      {...register('date', {
                        required: 'Date is required',
                        validate: value => !!value || 'Date is required',
                      })}
                      error={!!errors.date}
                      helperText={errors.date?.message || 'OPD hours: Mon–Sat 8–9 AM, 4–6 PM; Sun 9 AM–12 PM'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="time"
                      control={control}
                      rules={{ required: 'Please select a time slot' }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="Preferred Time *"
                          error={!!errors.time}
                          helperText={errors.time?.message}
                        >
                          {timeSlots.map(slot => (
                            <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>

                <Box className={styles.stepNav}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => setActiveStep(0)}
                    sx={{ minWidth: 120 }}
                  >
                    ← Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={18} color="inherit" /> : undefined}
                    sx={{ minWidth: 200 }}
                  >
                    {submitting ? 'Registering…' : 'Confirm Appointment'}
                  </Button>
                </Box>
              </Box>
            )}

            {/* ───── STEP 2: Confirmation ───── */}
            {activeStep === 2 && confirmed && appointmentData && (
              <Box className={styles.confirmationPanel}>
                <Box className={styles.confirmIcon}>
                  <CheckCircleIcon sx={{ fontSize: 52, color: 'success.main' }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, color: 'var(--primary-dark)', mb: 0.5 }}
                >
                  Confirm via WhatsApp
                </Typography>
                <Typography sx={{ color: 'var(--gray-600)', mb: 3 }}>
                  Click the button below to send your OP registration to the hospital and download the confirmation slip automatically.
                </Typography>

                <Box className={styles.confirmSlip}>
                  <Box className={styles.slipHeader}>
                    <Typography sx={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1rem' }}>
                      Atharva Children's Hospital
                    </Typography>
                    <Chip
                      label="CONFIRMED"
                      size="small"
                      sx={{ background: 'rgba(46,125,50,0.1)', color: 'success.dark', fontWeight: 700, fontSize: '0.7rem' }}
                    />
                  </Box>

                  <Typography sx={{ fontSize: '0.75rem', color: 'var(--gray-400)', mb: 1.5, fontFamily: 'monospace' }}>
                    {appointmentData.registrationId}
                  </Typography>

                  <Divider sx={{ mb: 1.5 }} />

                  {[
                    ['Patient', appointmentData.fullName],
                    ['Age / Gender', `${appointmentData.age} yrs · ${appointmentData.gender}`],
                    ['Phone', appointmentData.phone],
                    ['Doctor', appointmentData.doctor],
                    ['Date', appointmentData.date],
                    ['Time', appointmentData.time],
                  ].map(([label, value]) => (
                    <Box key={label} className={styles.slipRow}>
                      <Typography sx={{ fontSize: '0.8rem', color: 'var(--gray-400)', minWidth: 90 }}>{label}</Typography>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-800)' }}>{value}</Typography>
                    </Box>
                  ))}

                  {appointmentData.symptoms && (
                    <>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography sx={{ fontSize: '0.78rem', color: 'var(--gray-400)', mb: 0.3 }}>Reason for Visit</Typography>
                      <Typography sx={{ fontSize: '0.85rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>
                        {appointmentData.symptoms}
                      </Typography>
                    </>
                  )}
                </Box>

                {/* Action Buttons */}
                <Box className={styles.confirmActions}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWhatsApp}
                    disabled={sendingConfirmation}
                    endIcon={sendingConfirmation ? <CircularProgress size={18} color="inherit" /> : undefined}
                    sx={{
                      flex: 1,
                      minWidth: 180,
                      background: '#25D366',
                      '&:hover': { background: '#1DA851', transform: 'translateY(-2px)' },
                    }}
                  >
                    {sendingConfirmation ? 'Sending…' : 'Send WhatsApp & Download Slip'}
                  </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={handleNewRegistration}
                    sx={{ fontSize: '0.85rem' }}
                  >
                    Register Another Patient
                  </Button>
                </Box>
              </Box>
            )}

          </Box>
        </Box>
      </Box>
    </Box>
  )
}
