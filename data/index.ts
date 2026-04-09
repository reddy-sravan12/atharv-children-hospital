// data/index.ts

export const HOSPITAL_INFO = {
  name: `Atharv Children's Hospital`,
  tagline: 'Compassionate Care, Advanced Medicine',
  phone: '+91 98765 43210',
  email: 'care@medcarehospital.in',
  address: 'Rotary Nagar, LN Peta, Jadapeta, Peddakota, Andhra Pradesh 532458',
  whatsapp: '919876543210',
  coordinates: { lat: 18.629303216224542, lng:  83.9406710667332 },
  googleMapsUrl: 'https://maps.google.com/?q=18.629303216224542,83.9406710667332',
  emergencyPhone: '1800-MED-CARE',
}

export const DOCTORS = [
  {
    id: 1,
    name: 'Dr. Ananya Sharma',
    designation: 'Chief of Cardiology',
    specialization: 'Interventional Cardiology',
    experience: '22 Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MD, DM (Cardiology)',
  },
  {
    id: 2,
    name: 'Dr. Rohan Mehta',
    designation: 'Senior Neurologist',
    specialization: 'Neurology & Stroke Care',
    experience: '18 Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MD, DM (Neurology)',
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    designation: 'Pediatric Specialist',
    specialization: 'Neonatology & Pediatrics',
    experience: '15 Years',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MD, DNB (Pediatrics)',
  },
  {
    id: 4,
    name: 'Dr. Vikram Joshi',
    designation: 'Orthopaedic Surgeon',
    specialization: 'Joint Replacement & Spine',
    experience: '20 Years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MS, MCh (Ortho)',
  },
  {
    id: 5,
    name: 'Dr. Kavitha Reddy',
    designation: 'Oncology Head',
    specialization: 'Medical Oncology',
    experience: '16 Years',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MD, DM (Oncology)',
  },
  {
    id: 6,
    name: 'Dr. Suresh Pillai',
    designation: 'General Surgeon',
    specialization: 'Laparoscopic & GI Surgery',
    experience: '24 Years',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face',
    qualification: 'MBBS, MS, FRCS',
  },
]

export const SERVICES = [
  {
    id: 1,
    icon: '👶',
    title: 'Child Consultation',
    description: 'General checkups and treatment for common childhood illnesses with a gentle and friendly approach.',
  },
  {
    id: 2,
    icon: '💉',
    title: 'Vaccination',
    description: 'Complete immunization services for infants and children as per recommended schedules.',
  },
  {
    id: 3,
    icon: '🩺',
    title: 'Child Health Checkups',
    description: 'Regular growth monitoring, nutrition guidance, and preventive healthcare for children.',
  },
  {
    id: 4,
    icon: '🤒',
    title: 'Fever & Infection Care',
    description: 'Diagnosis and treatment for fever, cold, cough, and common infections in children.',
  },
  {
    id: 5,
    icon: '🧪',
    title: 'Diagnostics Lab',
    description: 'In-house lab for basic tests to support quick and accurate diagnosis.',
  },
  {
    id: 6,
    icon: '💊',
    title: 'Pharmacy',
    description: 'In-house pharmacy providing prescribed medicines conveniently at one place.',
  },
]

export const REVIEWS = [
  {
    id: 1,
    name: 'Meera Iyer',
    rating: 5,
    text: 'The cardiac team at MedCare saved my father\'s life. Dr. Sharma is exceptional — calm, precise, and truly compassionate. The staff was attentive round the clock.',
    date: 'March 2024',
  },
  {
    id: 2,
    name: 'Arjun Kapoor',
    rating: 5,
    text: 'Had my knee replacement done by Dr. Joshi. Absolutely world-class surgery. I was walking in 3 days and back to normal life in 6 weeks. Highly recommended!',
    date: 'February 2024',
  },
  {
    id: 3,
    name: 'Sunita Bhatia',
    rating: 5,
    text: 'The paediatrics ward is so thoughtfully designed for kids. Dr. Nair was so gentle with my daughter. The whole experience was reassuring during a stressful time.',
    date: 'January 2024',
  },
  {
    id: 4,
    name: 'Rahul Desai',
    rating: 4,
    text: 'Smooth OPD experience. The digital appointment system worked flawlessly. Waiting time was minimal and the consultation was thorough and unhurried.',
    date: 'April 2024',
  },
  {
    id: 5,
    name: 'Fatima Khan',
    rating: 5,
    text: 'MedCare\'s oncology team guided us through an incredibly difficult journey with both medical expertise and human warmth. We are forever grateful.',
    date: 'March 2024',
  },
  {
    id: 6,
    name: 'Deepak Srinivas',
    rating: 5,
    text: 'Emergency services are truly 24/7. Came in at 2 AM and was attended to immediately. The trauma team\'s efficiency was remarkable. Excellent hospital.',
    date: 'May 2024',
  },
]

export const HERO_BG_IMAGES = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&h=1080&fit=crop',
]
