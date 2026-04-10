// lib/whatsapp.ts

import { HOSPITAL_INFO } from '@/data'
import type { AppointmentData } from './generatePDF'

export function buildWhatsAppMessage(data: AppointmentData): string {
  const message = `*🏥 ${HOSPITAL_INFO.name} – OPD Registration Request*

Hello! I would like to confirm my outpatient appointment online.

*Patient Details*
• Name: ${data.fullName}
• Age: ${data.age} years | Gender: ${data.gender}
• Phone: ${data.phone}

*Appointment Details*
• Doctor: ${data.doctor}
• Date: ${data.date}
• Time: ${data.time}
• Registration ID: ${data.registrationId}

*Notes:*
Please confirm this appointment on WhatsApp and send back the registration details.

📍 ${HOSPITAL_INFO.name}
📞 ${HOSPITAL_INFO.phone}

_Thank you._`

  return message
}

export function openWhatsApp(message: string, number?: string): void {
  const rawPhone = number || HOSPITAL_INFO.whatsapp || HOSPITAL_INFO.phone
  const phone = rawPhone.replace(/[^0-9]/g, '')
  if (!phone) {
    console.warn('WhatsApp number missing, cannot open WhatsApp.')
    return
  }
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
