/* THRIVE launch configuration. All unfinished integrations live here.
 * TODO: Complete REPLACEMENT-CHECKLIST.md before setting launchVerified=true.
 * Keep previewMode=true while sample stories, illustrative screens or unverified claims remain.
 */
// TODO: CONFIRM these statements before launch. Null means unknown, never 'no card'.
const PRICE_TEXT = 'Then [price] after your trial. Cancel anytime before it ends.';
const CARD_REQUIRED = null;
const FOUNDER_CREDIBILITY_TEXT = 'Created by a trainer with 12+ years of experience.';
const FOUNDER_CREDIBILITY_VERIFIED = false;
const PRIVACY_CLAIMS = [
  { title:'What is stored', text:'[Confirm stored data, storage location and retention.]', verified:false },
  { title:'Sharing & sale', text:'[Confirm whether data is shared or sold, and with whom.]', verified:false },
  { title:'Export & deletion', text:'[Confirm export and deletion controls.]', verified:false }
];
const REPORT_FEATURE_VERIFIED = false;
const REPORT_SAMPLE = {
  period:'12–25 October · Example dates',
  rows:[
    {date:'12 Oct',symptom:'Night sweats',sleep:'Interrupted',cycle:'Day 18'},
    {date:'16 Oct',symptom:'Brain fog',sleep:'Restless',cycle:'Day 22'},
    {date:'21 Oct',symptom:'Headache',sleep:'Rested',cycle:'Day 27'}
  ]
};
window.THRIVE_CONFIG = {
  copy: {priceText:PRICE_TEXT,cardRequired:CARD_REQUIRED,credibilityText:FOUNDER_CREDIBILITY_TEXT,credibilityVerified:FOUNDER_CREDIBILITY_VERIFIED},
  privacyClaims: PRIVACY_CLAIMS,
  report: {verified:REPORT_FEATURE_VERIFIED,sample:REPORT_SAMPLE},
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
    paymentRequired: CARD_REQUIRED, // Driven by CARD_REQUIRED above
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
    credentials: FOUNDER_CREDIBILITY_TEXT,
    credentialsVerified: FOUNDER_CREDIBILITY_VERIFIED // Conflicting earlier 10+ year placeholder remains unverified.
  },
  videos: {
    app: { title: 'Your guide to THRIVE', src: null, captions: null, poster: null },
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
    { name: 'Sample member 01', initials: '01', context: 'Example story: sleep and cycle notes', quote: 'I noticed restless nights coming up at the same point in my cycle notes. I could ask about dates, not rely on memory.', verified: false },
    { name: 'Sample member 02', initials: '02', context: 'Example story: choosing a workout', quote: 'I could choose a home strength session on a busy day, then find a Pilates session for the weekend. I did not have to search across different apps.', verified: false },
    { name: 'Sample member 03', initials: '03', context: 'Example story: recording symptoms', quote: 'Writing down when the night sweats happened meant I could look at dates and notes later, rather than relying on how I felt that morning.', verified: false },
    { name: 'Sample member 04', initials: '04', context: 'Example story: preparing for a conversation', quote: 'Having my symptom notes together would help me explain what had been happening at an appointment. I would not need to start from memory.', verified: false }
  ],
  resources: [
    { category: 'Mindfulness', title: 'A moment to pause', duration: '5-minute practice', description: 'An example of the guided breathing and relaxation content planned for your library.' },
    { category: 'Sleep & stress', title: 'Make room to unwind', duration: 'Evening routine', description: 'A preview of the sleep and stress resources that sit alongside your daily check-ins.' },
    { category: 'Learn', title: 'Your body, with context', duration: 'Wellbeing reading', description: 'An example of the educational articles and practical wellbeing guidance in THRIVE.' }
  ]
};
