'use client'

import { useEffect, useRef } from 'react'
import { Box, Typography, Button } from '@mui/material'
import DirectionsIcon from '@mui/icons-material/Directions'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import StreetviewIcon from '@mui/icons-material/Streetview'
import styles from './MapSection.module.css'
import { HOSPITAL_INFO } from '@/data'

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    const initMap = async () => {
      try {
        const maplibregl = (await import('maplibre-gl')).default
        await import('maplibre-gl/dist/maplibre-gl.css')

        const map = new maplibregl.Map({
          container: mapRef.current!,
          style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
          center: [HOSPITAL_INFO.coordinates.lng, HOSPITAL_INFO.coordinates.lat],
          zoom: 14,
          attributionControl: false,
        })

        mapInstance.current = map

        map.addControl(new maplibregl.NavigationControl(), 'bottom-right')

        // Custom marker element
        const el = document.createElement('div')
        el.className = styles.markerEl
        el.innerHTML = `
          <div class="${styles.markerPulse}"></div>
          <div class="${styles.markerPin}">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `

        new maplibregl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([HOSPITAL_INFO.coordinates.lng, HOSPITAL_INFO.coordinates.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 10, closeButton: false })
              .setHTML(`
                <div style="font-family: 'DM Sans', sans-serif; padding: 4px 2px;">
                  <div style="font-weight: 700; color: #0B5394; font-size: 0.95rem; margin-bottom: 2px;">
                    ${HOSPITAL_INFO.name}
                  </div>
                  <div style="color: #4A6274; font-size: 0.8rem; line-height: 1.4;">
                    ${HOSPITAL_INFO.address}
                  </div>
                </div>
              `)
          )
          .addTo(map)
      } catch (err) {
        console.warn('MapLibre failed to load:', err)
      }
    }

    initMap()

    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  }, [])

  const handleGetDirections = () => {
    window.open(HOSPITAL_INFO.googleMapsUrl, '_blank', 'noopener,noreferrer')
  }

  const handleStreetView = () => {
    const url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${HOSPITAL_INFO.coordinates.lat},${HOSPITAL_INFO.coordinates.lng}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords
        const url = `https://www.google.com/maps/dir/${lat},${lng}/${HOSPITAL_INFO.coordinates.lat},${HOSPITAL_INFO.coordinates.lng}`
        window.open(url, '_blank', 'noopener,noreferrer')
      },
      () => alert('Unable to retrieve your location.')
    )
  }

  return (
    <Box component="section" id="map" className={styles.section}>
      <Box className="container">
        <Box className="section-header">
          <Box component="span" className="section-eyebrow">
            <LocationOnIcon sx={{ fontSize: 14 }} />
            Find Us
          </Box>
          <Typography variant="h2" className="section-title">
            Our Location
          </Typography>
          <Typography className="section-subtitle">
            Conveniently located in Bandra West, Mumbai with easy access by road, rail, and metro.
          </Typography>
        </Box>

        <Box className={styles.mapContainer}>
          {/* Map */}
          <Box ref={mapRef} className={styles.map} />

          {/* Info Overlay Card */}
          <Box className={styles.infoCard}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1.5 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mt: 0.2, flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.95rem' }}>
                  {HOSPITAL_INFO.name}
                </Typography>
                <Typography sx={{ color: 'var(--gray-600)', fontSize: '0.82rem', lineHeight: 1.5, mt: 0.3 }}>
                  {HOSPITAL_INFO.address}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<DirectionsIcon />}
                onClick={handleGetDirections}
                sx={{ fontSize: '0.78rem', py: 0.8, px: 1.8 }}
              >
                Get Directions
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<StreetviewIcon />}
                onClick={handleStreetView}
                sx={{ fontSize: '0.78rem', py: 0.8, px: 1.8, borderWidth: '1.5px' }}
              >
                Street View
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<MyLocationIcon />}
                onClick={handleLocateMe}
                sx={{ fontSize: '0.78rem', py: 0.8, px: 1.8, borderWidth: '1.5px' }}
              >
                From My Location
              </Button>
            </Box>

            {/* <Box className={styles.hours}>
              <Box className={styles.hoursRow}>
                <span>OPD Hours</span>
                <span>Mon – Sat: 9AM – 7PM</span>
              </Box>
              <Box className={styles.hoursRow}>
                <span>Emergency</span>
                <span className={styles.emergency247}>24 / 7</span>
              </Box>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
