// data/index.ts

export const HOSPITAL_INFO = {
  name: `Atharv Children's Hospital`,
  tagline: 'Compassionate Care, Advanced Medicine',
  phone: '+91 8019884588',
  email: 'atharvachildrenandpolyclinic@gmail.com',
  address: 'Rotary Nagar, LN Peta, Jadapeta, Peddakota, Andhra Pradesh 532458',
  whatsapp: '',
  coordinates: { lat: 18.629303216224542, lng:  83.9406710667332 },
  googleMapsUrl: 'https://maps.google.com/?q=18.629303216224542,83.9406710667332',
  // emergencyPhone: '1800-MED-CARE',
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
  {
    id: 7,
    icon: '🫁',
    title: 'Oxygen Support',
    description: 'Provision of oxygen therapy for children with breathing difficulties and respiratory conditions.',
  },
  {
    id: 8,
    icon: '💡',
    title: 'Phototherapy',
    description: 'Safe and effective light therapy for treating newborn jaundice under medical supervision.',
  },
]

export const REVIEWS = [
  {
    id: 1,
    name: 'లక్ష్మి దేవి',
    rating: 5,
    text: 'డాక్టర్ గారు చాలా ఓపికగా పిల్లలను చూసుకుంటారు. నా బిడ్డకు జ్వరం ఉన్నప్పుడు వెంటనే చికిత్స చేసి బాగు చేశారు. స్టాఫ్ కూడా చాలా సహాయకరంగా ఉంది.',
    date: 'మార్చి 2024',
  },
  {
    id: 2,
    name: 'రమేష్ కుమార్',
    rating: 5,
    text: 'ఇక్కడి వ్యాక్సినేషన్ సేవలు చాలా మంచి విధంగా నిర్వహిస్తున్నారు. మా బేబీకి ఎలాంటి సమస్య లేకుండా సాఫీగా పూర్తి చేశారు.',
    date: 'ఫిబ్రవరి 2024',
  },
  {
    id: 3,
    name: 'సుజాత',
    rating: 5,
    text: 'నవజాత శిశువుకు జాండిస్ సమస్య ఉండగా ఫోటోథెరపీ చాలా బాగా చేశారు. డాక్టర్స్ చాలా జాగ్రత్తగా చూసుకున్నారు.',
    date: 'జనవరి 2024',
  },
  {
    id: 4,
    name: 'శ్రీను',
    rating: 4,
    text: 'హాస్పిటల్ క్లీన్గా ఉంది. డాక్టర్ గారు సమస్యను పూర్తిగా అర్థం చేసుకుని ట్రీట్మెంట్ ఇచ్చారు. కొంచెం వెయిటింగ్ టైమ్ ఉంది కానీ సేవ బాగుంది.',
    date: 'ఏప్రిల్ 2024',
  },
  {
    id: 5,
    name: 'అనిత',
    rating: 5,
    text: 'పిల్లల హెల్త్ చెకప్ కోసం రెగ్యులర్‌గా వస్తున్నాం. ప్రతి సారి మంచి గైడెన్స్ ఇస్తున్నారు. చాలా సంతృప్తిగా ఉంది.',
    date: 'మార్చి 2024',
  },
  {
    id: 6,
    name: 'మధు',
    rating: 5,
    text: 'ఆక్సిజన్ సపోర్ట్ అవసరం వచ్చినప్పుడు వెంటనే అందించారు. డాక్టర్ గారి స్పందన చాలా వేగంగా ఉంది. మా బిడ్డ ఇప్పుడు బాగుంది.',
    date: 'మే 2024',
  },
  {
    id: 7,
    name: 'కవిత',
    rating: 5,
    text: 'ఫీవర్ & ఇన్ఫెక్షన్ ట్రీట్మెంట్ చాలా బాగా చేశారు. మందులు కూడా ఇక్కడే అందుబాటులో ఉండటం సౌకర్యంగా ఉంది.',
    date: 'జూన్ 2024',
  },
  {
    id: 8,
    name: 'రాజు',
    rating: 4,
    text: 'డయాగ్నస్టిక్ ల్యాబ్ సర్వీసులు త్వరగా రిపోర్ట్స్ ఇస్తాయి. డాక్టర్ వెంటనే ట్రీట్మెంట్ స్టార్ట్ చేశారు.',
    date: 'జూలై 2024',
  },
  {
    id: 9,
    name: 'భారతి',
    rating: 5,
    text: 'చైల్డ్ కన్సల్టేషన్ చాలా సింపుల్‌గా, ఫ్రెండ్లీగా జరిగింది. మా పిల్ల డాక్టర్ గారిని చూసి భయపడలేదు.',
    date: 'ఆగస్టు 2024',
  },
  {
    id: 10,
    name: 'వెంకట్',
    rating: 5,
    text: 'హాస్పిటల్ స్టాఫ్ చాలా కేర్ తీసుకుంటారు. ఎమర్జెన్సీ సమయంలో వెంటనే స్పందించారు. మంచి సేవలు అందిస్తున్నారు.',
    date: 'సెప్టెంబర్ 2024',
  },
]

export const HERO_BG_IMAGES = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&h=1080&fit=crop',
]
