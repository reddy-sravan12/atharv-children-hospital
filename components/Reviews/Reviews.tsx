'use client'

import { useRef } from 'react'
import { Box, Typography, Rating } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import StarIcon from '@mui/icons-material/Star'
import styles from './Reviews.module.css'
import { REVIEWS } from '@/data'

export default function Reviews() {
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  const DOUBLED = [...REVIEWS, ...REVIEWS]

  return (
    <Box component="section" id="reviews" className={styles.section}>
      <Box className="container">
        <Box className="section-header">
          <Box component="span" className="section-eyebrow">
            <StarIcon sx={{ fontSize: 14 }} />
            Patient Voices
          </Box>
          <Typography variant="h2" className="section-title">
            What Our Patients Say
          </Typography>
          <Typography className="section-subtitle">
            Thousands of patients trust MedCare for their most critical healthcare needs. Here is what some of them share.
          </Typography>
        </Box>
      </Box>

      {/* Infinite carousel – Row 1: left */}
      <Box className={styles.carouselWrapper}>
        <Box className={`${styles.carouselTrack} ${styles.scrollLeft}`} ref={track1Ref}>
          {DOUBLED.map((review, i) => (
            <ReviewCard key={`row1-${review.id}-${i}`} review={review} />
          ))}
        </Box>
      </Box>

      {/* Infinite carousel – Row 2: right — hidden on mobile to halve animation workload */}
      <Box className={styles.carouselWrapper} sx={{ mt: 2, display: { xs: 'none', sm: 'block' } }}>
        <Box className={`${styles.carouselTrack} ${styles.scrollRight}`} ref={track2Ref}>
          {[...DOUBLED].reverse().map((review, i) => (
            <ReviewCard key={`row2-${review.id}-${i}`} review={review} />
          ))}
        </Box>
      </Box>

      {/* Edge fades */}
      <Box className={styles.fadeLeft} />
      <Box className={styles.fadeRight} />
    </Box>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <Box className={styles.card}>
      <FormatQuoteIcon
        sx={{
          fontSize: 32,
          color: 'var(--primary-light)',
          opacity: 0.3,
          mb: 1,
          display: 'block',
        }}
      />
      <Typography
        sx={{
          fontSize: '0.9rem',
          color: 'var(--gray-600)',
          lineHeight: 1.7,
          mb: 1.5,
          fontStyle: 'italic',
        }}
      >
        "{review.text}"
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary-dark)' }}>
            {review.name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
            {review.date}
          </Typography>
        </Box>
        <Rating
          value={review.rating}
          readOnly
          size="small"
          sx={{ '& .MuiRating-iconFilled': { color: '#F59E0B' } }}
        />
      </Box>
    </Box>
  )
}
