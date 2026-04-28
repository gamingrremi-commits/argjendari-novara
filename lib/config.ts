export const SITE_CONFIG = {
  name: 'NOVARA',
  fullName: 'Argjendari Novara',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://argjendarinovara.al',
  tagline: {
    sq: 'Bizhuteri me dorÃ«, me histori. QÃ« nga 2014, nÃ« DurrÃ«s.',
    en: 'Handcrafted jewelry with a story. Since 2014, in DurrÃ«s.',
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
    landmark_sq: 'PÃ«rballÃ« Lulishtes 1 Maji',
    landmark_en: 'Across from Lulishtja 1 Maji',
    city: 'DurrÃ«s',
    country_sq: 'ShqipÃ«ri',
    country_en: 'Albania',
    coordinates: {
      lat: 41.3182674,
      lng: 19.4484686,
    },
  },
  hours: {
    sq: {
      weekdays: 'E hÃ«nÃ« â€“ E shtunÃ«: 09:00 â€“ 20:00',
      sunday: 'E diel: 10:00 â€“ 18:00',
    },
    en: {
      weekdays: 'Mon â€“ Sat: 09:00 â€“ 20:00',
      sunday: 'Sun: 10:00 â€“ 18:00',
    },
  },
  social: {
    instagram: 'https://instagram.com/argjendarinovara',
    facebook: 'https://facebook.com/argjendarinovara',
  },
} as const;
