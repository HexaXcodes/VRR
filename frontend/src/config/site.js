// Existing VRR contact details. Add the verified college map URL when supplied.
export const site = {
  name: 'VRR Career Academy',
  phone: '+919611747003',
  phoneDisplay: '96117 47003',
  alternatePhone: '+919741187003',
  whatsapp: '919611747003',
  email: 'vrr.career.academy@gmail.com',
  address: '2nd Floor, Vinayaka Complex, 11, Kodigehalli – Thindlu Main Road, Near SVVK School, Sahakar Nagar, Bengaluru, Karnataka 560092',
  mapsUrl: 'https://maps.google.com/?q=2nd+Floor,+Vinayaka+Complex,+11,+Kodigehalli+-+Thindlu+Main+Road,+Near+SVVK+School,+Sahakar+Nagar,+Kodigehalli,+Bangalore,+Karnataka+560092',
  collegeMapsUrl: null,
  logo: '/VRR1.jpeg',
  // TODO: Replace this neutral local placeholder with a real, approved VRR classroom image.
  heroImage: '/images/campus-placeholder.svg',
  heroImageAlt: 'Campus photography coming soon',
  resultsImage: null, // Set to '/images/results/2025-results.jpg' after confirming the year and graphic.
}
export const navigation = [
  ['Programs', 'pathways'], ['Academics', 'learning-system'], ['Faculty', 'faculty'],
  ['Results', 'achievements'], ['Campus', 'campus'], ['Admissions', 'admissions'], ['FAQ', 'faq'],
]
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello VRR, I would like to know more about admissions for 2027–28.')}`
