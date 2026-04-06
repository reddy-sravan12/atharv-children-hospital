// lib/whatsapp.ts

import { HOSPITAL_INFO } from '@/data'
import type { AppointmentData } from './generatePDF'

export function buildWhatsAppMessage(data: AppointmentData): string {
  const message = `*🏥 MedCare Hospital – Appointment Confirmation*

Hello! Your OPD appointment has been confirmed.

*Patient Details*
• Name: ${data.fullName}
• Age: ${data.age} years | Gender: ${data.gender}
• Phone: ${data.phone}

*Appointment Details*
• Doctor: ${data.doctor}
• Date: ${data.date}
• Time: ${data.time}
• Registration ID: ${data.registrationId}

*Instructions:*
Please arrive 15 minutes early with a valid ID and this confirmation.

📍 MedCare Hospital, 42 Healthcare Ave, Bandra West, Mumbai
📞 ${HOSPITAL_INFO.phone}

_Thank you for choosing MedCare Hospital._`

  return message
}

export function openWhatsApp(message: string, number?: string): void {
  const phone = number || HOSPITAL_INFO.whatsapp
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
