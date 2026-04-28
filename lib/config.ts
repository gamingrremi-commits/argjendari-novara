export const SITE_CONFIG = {
  name: 'NOVARA',
  fullName: 'Argjendari Novara',
  tagline: {
    sq: 'Bizhuteri me dorë, me histori. Që nga 2014, në Durrës.',
    en: 'Handcrafted jewelry with a story. Since 2014, in Durrës.',
  },
  founded: 2014,
  contact: {
    email: 'info@argjendarinovara.al',
    phone: '+355 67 719 3759',
    phoneRaw: '355677193759',
    whatsapp: '355677193759',
  },
  address: {
    street: 'Sheshi Demokracia',
    landmark_sq: 'Përballë Lulishtes 1 Maji',
    landmark_en: 'Across from Lulishtja 1 Maji',
    city: 'Durrës',
    country_sq: 'Shqipëri',
    country_en: 'Albania',
    coordinates: {
      lat: 41.3182674,
      lng: 19.4484686,
    },
  },
  hours: {
    sq: {
      weekdays: 'E hënë – E shtunë: 09:00 – 20:00',
      sunday: 'E diel: 10:00 – 18:00',
    },
    en: {
      weekdays: 'Mon – Sat: 09:00 – 20:00',
      sunday: 'Sun: 10:00 – 18:00',
    },
  },
  social: {
    instagram: 'https://instagram.com/argjendarinovara',
    facebook: 'https://facebook.com/argjendarinovara',
  },
} as const;

export const NAV_LINKS = {
  sq: [
    { href: '/koleksione', label: 'Koleksione' },
    { href: '/atelier', label: 'Atelier' },
    { href: '/sherbime', label: 'Shërbime' },
    { href: '/#location', label: 'Dyqani' },
    { href: '/#contact', label: 'Kontakt' },
  ],
  en: [
    { href: '/koleksione', label: 'Collections' },
    { href: '/atelier', label: 'Atelier' },
    { href: '/sherbime', label: 'Services' },
    { href: '/#location', label: 'Boutique' },
    { href: '/#contact', label: 'Contact' },
  ],
} as const;
