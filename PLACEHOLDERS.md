# THRIVE — values still requiring confirmation

Every named content constant is at the top of `dist/config.js`. Replace values there, not repeated rendered text. The page stays an explicitly labeled preview until launch is verified.

| Constant | Current value | Action |
|---|---|---|
| `PRICE_TEXT` | `Then [price] after your trial. Cancel anytime before it ends.` | Insert the approved price, currency and billing period. Also fill `trial.priceAfter` for the subscription summary. |
| `CARD_REQUIRED` | `null` | Set `true` or `false` after confirmation. Null deliberately renders “Card requirement: to be confirmed.” It also drives `trial.paymentRequired`. |
| `FOUNDER_CREDIBILITY_TEXT` | `Created by a trainer with 12+ years of experience.` | Confirm or correct the requested statement. The previous 10+ year value was unverified too. |
| `FOUNDER_CREDIBILITY_VERIFIED` | `false` | Set true only once the statement is substantiated. It drives both marketing and founder verification flags. |
| `PRIVACY_CLAIMS` | Three bracketed statements; every `verified` is false | Supply approved storage/location/retention, sharing/sale and export/deletion copy. Verify each against the published Privacy policy. No no-sale promise has been inferred. The sharing/sale FAQ uses the same value. |
| `REPORT_FEATURE_VERIFIED` | `false` | Confirm actual export availability, format and trial entitlement. The report-sharing FAQ and feature status reflect this flag. |
| `REPORT_SAMPLE` | Three explicitly fictional example rows and dates | Review/replace with an approved synthetic example. Keep example-data labels; never insert a real person's health records into this public demo. |

## Existing pending THRIVE_CONFIG fields

These remain centralized in `dist/config.js`:

- `stores.apple`, `stores.google`: real verified THRIVE marketplace listings.
- `trial.priceAfter`, `trial.billingStarts`, `trial.cancellation`, `trial.entitlementsVerified`: approved subscription details and actual full-feature trial availability. `paymentRequired` comes from CARD_REQUIRED.
- `legal.privacy`, `legal.terms`, `legal.supportEmail`: published policies and monitored support address.
- `founder.name`, `founder.photo`: approved identity and authentic portrait. Experience copy/verification come from the constants above.
- `videos.app.src/poster/captions` and `videos.founder.src/poster/captions`: authentic videos, poster images and WebVTT captions; add the approved full founder transcript in `dist/app.js` when available.
- `testimonials`: real permission-based names, quotes, context and verification flags. Four clearly labeled samples remain in config; one is featured on the page. Avatar circles are placeholders. Never remove a sample label from fictional copy to make it appear genuine.
- `resources`: approved real library content, authors and media connections. Existing cards remain clearly labeled sample resources.
- `analytics.enabled`, `analytics.consentGranted`, `analytics.adapter`: connect approved consent controls and the service adapter. Current behavior is disabled, in-memory diagnostics only. Actual installs/trial-starts/paid conversions require app/backend attribution; store clicks never count as those events.
- `previewMode`, `launchVerified`: keep true/false respectively until the launch checklist, actual app entitlements, privacy/terms, store links and proof have been checked.

## Identifiable placeholder components/assets

- `dist/index.html`: `#symptom-preview`, `#patterns-preview`, app/founder video placeholders, inline legal/FAQ preview wording and labels.
- `dist/app.js`: report markup/example text export; sample-resource dialogs; founder transcript outline; store/policy fallback dialogs. Labels remain explicit for all simulated content.
- `dist/assets/hero-woman.webp`: labeled generated illustrative model, not the founder or a customer.
- `dist/assets/thrive-days.webp`: existing illustrative movement photography.
- `dist/assets/cycle-light.webp`, `today-light.webp`, `today-dark.webp`, `nutrition-light.webp`, `nutrition-dark.webp`, `strength-club.webp`: supplied design screens; verify against current shipping UI, including the visible QA text in the supplied Strength Club screen.
- `dist/assets/hero-background.webp`, `ritual-triptych.webp`: existing botanical/linen imagery to approve for launch.

Preserve the non-medical-service disclaimer and all necessary trial/legal disclosures. See REPLACEMENT-CHECKLIST.md for the complete release preparation steps.
