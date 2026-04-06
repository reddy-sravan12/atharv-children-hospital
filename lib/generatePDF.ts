// lib/generatePDF.ts

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
  const margin = 20

  // --- Header Band ---
  doc.setFillColor(11, 83, 148)
  doc.rect(0, 0, W, 42, 'F')

  // Accent stripe
  doc.setFillColor(0, 180, 216)
  doc.rect(0, 42, W, 4, 'F')

  // Hospital Name
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(255, 255, 255)
  doc.text('MedCare Hospital', margin, 20)

  // Tagline
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(144, 224, 239)
  doc.text('Compassionate Care, Advanced Medicine', margin, 28)

  // Contact info right side
  doc.setFontSize(8)
  doc.setTextColor(200, 220, 240)
  doc.text('care@medcarehospital.in', W - margin, 20, { align: 'right' })
  doc.text('+91 98765 43210', W - margin, 27, { align: 'right' })
  doc.text('42 Healthcare Ave, Bandra West, Mumbai', W - margin, 34, { align: 'right' })

  // --- Title ---
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(11, 83, 148)
  doc.text('OUTPATIENT REGISTRATION SLIP', W / 2, 58, { align: 'center' })

  // Divider
  doc.setDrawColor(194, 211, 223)
  doc.setLineWidth(0.4)
  doc.line(margin, 63, W - margin, 63)

  // --- Registration Meta ---
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(74, 98, 116)
  doc.text(`Registration ID: ${data.registrationId}`, margin, 71)
  doc.text(`Generated: ${data.generatedAt}`, W - margin, 71, { align: 'right' })

  // --- Status Badge ---
  doc.setFillColor(232, 245, 233)
  doc.roundedRect(W / 2 - 28, 74, 56, 10, 5, 5, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(46, 125, 50)
  doc.text('CONFIRMED', W / 2, 80.5, { align: 'center' })

  // --- Patient Section ---
  const sectionY = 92
  doc.setFillColor(240, 247, 255)
  doc.roundedRect(margin, sectionY, W - margin * 2, 8, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(11, 83, 148)
  doc.text('PATIENT INFORMATION', margin + 4, sectionY + 5.5)

  const patientFields = [
    ['Full Name', data.fullName],
    ['Age', `${data.age} years`],
    ['Gender', data.gender],
    ['Phone Number', data.phone],
    ['Email Address', data.email],
    ['Address', data.address],
  ]

  let yPos = sectionY + 14
  patientFields.forEach(([label, value], idx) => {
    if (idx % 2 === 0 && idx > 0) {
      doc.setDrawColor(225, 235, 245)
      doc.setLineWidth(0.3)
      doc.line(margin, yPos - 2.5, W - margin, yPos - 2.5)
    }
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(74, 98, 116)
    doc.text(label + ':', margin + 2, yPos)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 43, 54)
    doc.text(value || '—', margin + 50, yPos)
    yPos += 8
  })

  // --- Appointment Section ---
  const apptY = yPos + 6
  doc.setFillColor(240, 247, 255)
  doc.roundedRect(margin, apptY, W - margin * 2, 8, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(11, 83, 148)
  doc.text('APPOINTMENT DETAILS', margin + 4, apptY + 5.5)

  const apptFields = [
    ['Assigned Doctor', data.doctor],
    ['Appointment Date', data.date],
    ['Appointment Time', data.time],
  ]

  yPos = apptY + 14
  apptFields.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(74, 98, 116)
    doc.text(label + ':', margin + 2, yPos)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 43, 54)
    doc.text(value || '—', margin + 50, yPos)
    yPos += 8
  })

  // --- Symptoms Section ---
  const sympY = yPos + 4
  doc.setFillColor(240, 247, 255)
  doc.roundedRect(margin, sympY, W - margin * 2, 8, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(11, 83, 148)
  doc.text('REASON FOR VISIT / SYMPTOMS', margin + 4, sympY + 5.5)

  yPos = sympY + 16
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(30, 43, 54)
  const sympLines = doc.splitTextToSize(data.symptoms || 'General consultation', W - margin * 2 - 8)
  doc.text(sympLines, margin + 4, yPos)
  yPos += sympLines.length * 6 + 8

  // --- Instructions Box ---
  doc.setFillColor(255, 253, 231)
  doc.roundedRect(margin, yPos, W - margin * 2, 32, 3, 3, 'F')
  doc.setDrawColor(255, 214, 0)
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, yPos, W - margin * 2, 32, 3, 3, 'S')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(120, 80, 0)
  doc.text('IMPORTANT INSTRUCTIONS', margin + 4, yPos + 7)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(100, 70, 0)
  const instructions = [
    '• Please arrive 15 minutes before your scheduled appointment time.',
    '• Carry a valid photo ID and any previous medical records or reports.',
    '• Present this slip at the OPD Reception Counter before consulting.',
    '• For rescheduling, call +91 98765 43210 at least 24 hours in advance.',
  ]
  instructions.forEach((line, i) => {
    doc.text(line, margin + 4, yPos + 14 + i * 5)
  })

  // --- Footer ---
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setDrawColor(194, 211, 223)
  doc.setLineWidth(0.4)
  doc.line(margin, footerY - 4, W - margin, footerY - 4)

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(7.5)
  doc.setTextColor(100, 130, 150)
  doc.text('This is a computer-generated document. No signature required.', W / 2, footerY, { align: 'center' })
  doc.text('MedCare Hospital • 42 Healthcare Ave, Bandra West, Mumbai 400050', W / 2, footerY + 5, { align: 'center' })

  doc.save(`MedCare-Appointment-${data.registrationId}.pdf`)
}

export function generateRegistrationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `MC-${timestamp}-${random}`
}
