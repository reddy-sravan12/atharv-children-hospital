// lib/generatePDF.ts

import { HOSPITAL_INFO } from '@/data'

export interface AppointmentData {
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
  registrationId: string
  generatedAt: string
}

export async function generateAppointmentPDF(data: AppointmentData): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()
  const margin = 20
  const colWidth = (W - (margin * 2) - 10) / 2 // Width for two columns with 10mm gap

  // --- Header Band ---
  doc.setFillColor(11, 83, 148)
  doc.rect(0, 0, W, 42, 'F')
  doc.setFillColor(0, 180, 216)
  doc.rect(0, 42, W, 4, 'F')

  doc.setFont('helvetica', 'bold').setFontSize(22).setTextColor(255, 255, 255)
  doc.text(HOSPITAL_INFO.name, margin, 20)
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(144, 224, 239)
  doc.text(HOSPITAL_INFO.tagline, margin, 28)

  doc.setFontSize(8).setTextColor(200, 220, 240)
  doc.text(HOSPITAL_INFO.email, W - margin, 20, { align: 'right' })
  doc.text(HOSPITAL_INFO.phone, W - margin, 27, { align: 'right' })
  doc.text(HOSPITAL_INFO.address, W - margin, 34, { align: 'right' })

  // --- Title & Meta ---
  doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor(11, 83, 148)
  doc.text('OUTPATIENT REGISTRATION SLIP', W / 2, 58, { align: 'center' })
  
  doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(74, 98, 116)
  doc.text(`ID: ${data.registrationId}`, margin, 65)
  doc.text(`Date: ${data.generatedAt}`, W - margin, 65, { align: 'right' })

  // --- TWO COLUMN SECTION ---
  let currentY = 75

  // Column 1: Patient Info
  doc.setFillColor(240, 247, 255)
  doc.roundedRect(margin, currentY, colWidth, 7, 1, 1, 'F')
  doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(11, 83, 148)
  doc.text('PATIENT INFORMATION', margin + 3, currentY + 5)

  const leftFields = [
    ['Name', data.fullName],
    ['Age/Sex', `${data.age} / ${data.gender}`],
    ['Phone', data.phone],
    ['Address', data.address]
  ]

  let leftY = currentY + 13
  leftFields.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(74, 98, 116)
    doc.text(`${label}:`, margin, leftY)
    doc.setFont('helvetica', 'bold').setTextColor(30, 43, 54)
    doc.text(value || '—', margin + 15, leftY)
    leftY += 7
  })

  // Column 2: Appointment Info
  const col2X = margin + colWidth + 10
  doc.setFillColor(240, 247, 255)
  doc.roundedRect(col2X, currentY, colWidth, 7, 1, 1, 'F')
  doc.setFont('helvetica', 'bold').setTextColor(11, 83, 148)
  doc.text('APPOINTMENT DETAILS', col2X + 3, currentY + 5)

  const rightFields = [
    ['Doctor', data.doctor],
    ['Date', data.date],
    ['Time', data.time],
    ['Status', 'CONFIRMED']
  ]

  let rightY = currentY + 13
  rightFields.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(74, 98, 116)
    doc.text(`${label}:`, col2X, rightY)
    doc.setFont('helvetica', 'bold').setTextColor(label === 'Status' ? 46 : 30, label === 'Status' ? 125 : 43, label === 'Status' ? 50 : 54)
    doc.text(value || '—', col2X + 15, rightY)
    rightY += 7
  })

  currentY = Math.max(leftY, rightY) + 5

  // --- Symptoms (Full Width) ---
  doc.setFillColor(248, 249, 250)
  doc.rect(margin, currentY, W - margin * 2, 15, 'F')
  doc.setFont('helvetica', 'bold').setFontSize(8.5).setTextColor(11, 83, 148)
  doc.text('REASON FOR VISIT:', margin + 2, currentY + 6)
  doc.setFont('helvetica', 'normal').setTextColor(30, 43, 54)
  const sympLines = doc.splitTextToSize(data.symptoms || 'General consultation', W - margin * 2 - 35)
  doc.text(sympLines, margin + 32, currentY + 6)

  // --- PRESCRIPTION SPACE (The "Open" Area) ---
  currentY += 25
  doc.setDrawColor(200, 200, 200)
  doc.setLineWidth(0.5)
  // Large box for doctor to write in
  doc.rect(margin, currentY, W - margin * 2, 80) 
  
  // Rx Icon/Symbol
  doc.setFont('times', 'italic').setFontSize(24).setTextColor(180, 180, 180)
  doc.text('Rx', margin + 5, currentY + 12)
  
  // Watermark or subtle lines for writing
  doc.setDrawColor(240, 240, 240)
  for(let i = 1; i < 6; i++) {
    doc.line(margin + 5, currentY + 15 + (i * 12), W - margin - 5, currentY + 15 + (i * 12))
  }

  // --- Footer / Instructions ---
  const footerY = H - 35
  doc.setFillColor(255, 253, 231)
  doc.roundedRect(margin, footerY, W - margin * 2, 20, 2, 2, 'F')
  doc.setFont('helvetica', 'bold').setFontSize(7.5).setTextColor(120, 80, 0)
  doc.text('INSTRUCTIONS:', margin + 4, footerY + 6)
  doc.setFont('helvetica', 'normal').setTextColor(100, 70, 0)
  doc.text('• Arrive 15 mins early. • Carry this slip & valid ID. • Valid for 7 days from date of issue.', margin + 4, footerY + 12)

  doc.setFont('helvetica', 'italic').setFontSize(7).setTextColor(150, 150, 150)
  doc.text('This is a computer-generated slip.', W / 2, H - 8, { align: 'center' })

  doc.save(`Appointment-${data.registrationId}.pdf`)
}

export function generateRegistrationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `MC-${timestamp}-${random}`
}
