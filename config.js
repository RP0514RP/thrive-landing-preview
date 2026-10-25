/* THRIVE launch configuration. All unfinished integrations live here.
 * TODO: Complete REPLACEMENT-CHECKLIST.md before setting launchVerified=true.
 * Keep previewMode=true while sample stories, illustrative screens or unverified claims remain.
 */
window.THRIVE_CONFIG = {
  previewMode: true,
  launchVerified: false,
  stores: {
    apple: null, // TODO: REPLACE WITH THRIVE'S VERIFIED apps.apple.com URL
    google: null // TODO: REPLACE WITH THRIVE'S VERIFIED play.google.com URL
  },
  trial: {
    days: 14,
    priceAfter: null, // TODO: CONFIRM PRICE AND CURRENCY
    billingStarts: null, // TODO: CONFIRM WHEN BILLING STARTS
    paymentRequired: null, // TODO: CONFIRM PAYMENT REQUIREMENT
    cancellation: null, // TODO: CONFIRM EXACT CANCELLATION INSTRUCTIONS
    entitlementsVerified: false
  },
  legal: {
    privacy: null, // TODO: REPLACE WITH PUBLISHED PRIVACY POLICY
    terms: null, // TODO: REPLACE WITH PUBLISHED TERMS
    supportEmail: null // TODO: REPLACE WITH OFFICIAL SUPPORT ADDRESS
  },
  founder: {
    name: null, // TODO: REPLACE WITH FOUNDER'S APPROVED NAME
    photo: null, // TODO: REPLACE WITH AUTHENTIC FOUNDER PORTRAIT
    credentials: '10+ years of professional training experience',
    credentialsVerified: false // TODO: VERIFY THE SUPPLIED EXPERIENCE STATEMENT
  },
  videos: {
    app: { title: 'A little tour of THRIVE', src: null, captions: null, poster: null },
    founder: { title: 'The story behind THRIVE', src: null, captions: null, poster: null }
    // TODO: REPLACE src/poster/captions WITH AUTHENTIC VIDEO, THUMBNAIL & WEBVTT CAPTIONS
  },
  analytics: {
    enabled: false,
    consentGranted: false,
    adapter: null // TODO: CONNECT CONSENT-AWARE ANALYTICS; SEE analytics.js
  },
  // TODO: REPLACE WITH REAL TESTIMONIALS, APPROVED PHOTOS AND DOCUMENTED PERMISSION.
  // Sample labels are mandatory until each record is genuine and verified.
  testimonials: [
    { name: 'Sample member 01', initials: '01', context: 'Example: everyday tracking', quote: 'I like being able to put my symptoms and the rest of my day in one place. It makes looking back feel much simpler.', verified: false },
    { name: 'Sample member 02', initials: '02', context: 'Example: movement', quote: 'Some days I want a strength session. Other days, a little stretching. Having both in the same space feels practical.', verified: false },
    { name: 'Sample member 03', initials: '03', context: 'Example: daily wellbeing', quote: 'The small check-ins are what appeal to me. A moment to notice how I feel, without trying to build a perfect routine.', verified: false },
    { name: 'Sample member 04', initials: '04', context: 'Example: seeing the bigger picture', quote: 'I would love to bring a clearer record to conversations about my wellbeing, rather than trying to remember everything.', verified: false }
  ],
  resources: [
    { category: 'Mindfulness', title: 'A moment to pause', duration: '5-minute practice', description: 'An example of the guided breathing and relaxation content planned for your library.' },
    { category: 'Sleep & stress', title: 'Make room to unwind', duration: 'Evening routine', description: 'A preview of the sleep and stress resources that sit alongside your daily check-ins.' },
    { category: 'Learn', title: 'Your body, with context', duration: 'Wellbeing reading', description: 'An example of the educational articles and practical wellbeing guidance in THRIVE.' }
  ]
};
