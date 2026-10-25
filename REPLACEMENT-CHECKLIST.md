# THRIVE — replacement and launch checklist

Updated for conversion-2. See PLACEHOLDERS.md for the new PRICE_TEXT, CARD_REQUIRED, FOUNDER_CREDIBILITY_TEXT/VERIFIED, PRIVACY_CLAIMS, REPORT_FEATURE_VERIFIED and REPORT_SAMPLE constants. CHANGES-CONVERSION-2.md records the 12 requested tasks.

The complete page is implemented for visual review. The public preview must retain its Design preview banner, sample labels and noindex until launch has been verified. It does not start subscriptions or collect payments.

All paths below are relative to `outputs/thrive-landing/`.

| Item | Location | Replace / confirm before launch |
|---|---|---|
| Apple App Store URL | `dist/config.js` → `stores.apple` | Verified THRIVE listing on `https://apps.apple.com/`. No unrelated listing. |
| Google Play URL | `dist/config.js` → `stores.google` | Verified THRIVE listing on `https://play.google.com/`. |
| Trial and subscription | `dist/config.js` → `trial` | Confirm `priceAfter` with currency and billing period, `billingStarts`, `paymentRequired`, exact `cancellation` instructions and `entitlementsVerified`. The table and FAQs use these values. Check all 14-day/cancel-before-end copy in `dist/index.html` against approved terms. |
| Product availability | `dist/index.html` feature, steps and FAQ sections; `dist/config.js` → `trial.entitlementsVerified` | Verify symptoms/history, cycle, mood/energy/stress/lifestyle, full meals/nutrition, trends/insights, personalized guidance and reports, Strength Club, home/gym, yoga/Pilates, mindfulness/meditation/relaxation, sleep/stress and educational resources are all genuinely available in the trial. |
| App demonstration film | `dist/config.js` → `videos.app.src`, `.poster`, `.captions` | Authentic screen recording, approved thumbnail and English WebVTT captions. The card and modal use the configured poster. Controls remain click-to-play, with no audio autoplay. |
| Founder film | `dist/config.js` → `videos.founder` | Authentic captioned introduction, poster and video source. Add an approved full transcript in `dist/app.js` → `openVideo`. The current outline is explicitly a placeholder, not a quote. |
| Founder identity | `dist/config.js` → `founder` | Name, genuine portrait path, approved professional experience statement; set `credentialsVerified` only with evidence. The requested 12+ years statement is currently labeled pending, never medical expertise. |
| Sample testimonials (one featured) | `dist/config.js` → `testimonials` | Replace names, initials, context and quotes with authentic permission-based feedback; document permission and set each `verified` flag. Monogram avatar placeholders are intentional. Approved photos can replace `.avatar-placeholder` in `dist/app.js` → testimonial renderer; add meaningful alt text. Never simply remove the sample labels from invented copy. No ratings or user counts were invented. |
| Symptom screen and history | `dist/index.html` → `#symptom-preview` | Replace clearly labeled illustrative sample rows/history with a verified app screenshot or accurate approved UI. Retain illustrative/sample labeling if it is still simulated. |
| Patterns chart | `dist/index.html` → `#patterns-preview`, `.trend-chart`; `dist/app.js` → `reportMarkup` / `downloadSampleReport` | Replace the sample seven-day chart and sample text report with accurate approved product demonstration content. Never imply its sample data are real user results. A report download is not an app trial activation. |
| Existing app screens | `dist/assets/cycle-light.webp`, `today-light.webp`, `today-dark.webp`, `nutrition-light.webp`, `nutrition-dark.webp`, `strength-club.webp` | Team-supplied design screenshots are reused intact with CSS crops. Verify current launch UI, nutrition calculations and terminology. Remove QA text visible in the supplied Strength Club screen in the actual source screenshot. Keep real app content; do not retouch fictional features into screenshots. |
| Hero lifestyle portrait | `dist/assets/hero-woman.webp`; `dist/index.html` → `.hero-woman` | Generated illustrative model, not the founder or a customer. Review for final brand use or replace with approved photography under the same filename. The visible illustrative-image label and alt text identify it. Prompt: `hero-lifestyle-prompt.txt` (built-in ImageGen). |
| Movement lifestyle photograph | `dist/assets/thrive-days.webp`; `dist/styles.css` → `.movement-visual` | Existing illustrative triptych, third frame. Replace with an approved studio/movement image if desired; preserve the responsive crop and image label. |
| Botanical / linen imagery | `dist/assets/hero-background.webp`, `ritual-triptych.webp`; `dist/styles.css` | Existing temporary brand imagery. Review for final brand approval. Preserve restrained matte treatment and soft joins; no generated UI text is used as a page background. |
| Resource library previews | `dist/config.js` → `resources`; `dist/app.js` → resource renderer and modal | Approve and connect actual mindfulness, relaxation, sleep/stress and educational content. Current cards and players explicitly say Sample resource. Add author, duration, media and captions/transcripts as applicable. |
| Privacy and terms | `dist/config.js` → `legal.privacy`, `.terms` | Published HTTPS policies covering app data, subscriptions and marketing analytics as applicable. Until then, buttons open explicit policy placeholders. |
| Support | `dist/config.js` → `legal.supportEmail` | Official monitored address. It becomes a mailto link only when a valid address is supplied. |
| Website analytics | `dist/config.js` → `analytics`; `dist/analytics.js` | Connect `adapter.send(name, properties)`, consent controls and the approved analytics service; enable only after consent integration. Default is disabled, memory-only diagnostics, no SDK/cookies/storage/network. Whitelisted props exclude health logs, identifiers and URLs. |
| Downstream attribution | App/backend attribution service; `dist/analytics.js` comments | Implement verified installs, `trial_started` and `trial_converted_to_paid` from the actual app/backend, with consent and deduplication. They are deliberately rejected by the website facade. Connect approved campaign attribution externally; current preview does not implement campaign/traffic-source attribution or calculate a confirmed trial conversion rate. |
| Measurement review | Analytics dashboard / team process | Review weekly: visitors, primary CTA CTR, store redirects, attributed confirmed trials, cost per trial and trial-to-paid after enough time. No recurring automation is created by this implementation. |
| Launch mode | `dist/config.js` → `previewMode`, `launchVerified`; `dist/index.html` → preview notice, noindex, page/OG descriptions, FAQ trial/store/sample copy, footer; `dist/app.js` → preview/legal wording | Complete the checklist and run preflight before changing to production. Review static placeholder wording, resource labels and sample layouts. Keep demo labels on anything still simulated. Remove noindex only after approval and functional checks. |

## Safe preview behavior

- Every Start My Free Trial button works: it opens store choices while launch links are pending. Native iOS/Android routes only occur with a verified listing and `launchVerified=true`. Desktop always receives both choices.
- Missing store destinations explain that no download/account/trial/payment has begun.
- Video placeholders open complete preview dialogs; the app placeholder includes interactive real screenshots.
- Testimonials remain visible as clearly marked samples in preview mode; unverified testimonials are filtered out of production mode.
- App appearance switches change only the product screenshot, not the website.
- UI selections remain in memory. No health information is collected by this landing page.

## Checks

```sh
node scripts/check-behavior.mjs
python3 scripts/check-static.py
python3 scripts/check-copy.py
node scripts/check-launch.mjs
```

`check-launch.mjs` is expected to fail while launch details are pending. This does not block the clearly labeled design preview. It is a preflight aid, not a substitute for verifying app features, consent, policies, entitlements, captions, real customer permissions, actual store listings and physical-device behavior.
