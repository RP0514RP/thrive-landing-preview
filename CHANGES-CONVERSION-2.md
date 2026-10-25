# THRIVE conversion refinement — task-by-task change log

25 October 2026. Existing cream, deep olive, Cormorant/Inter typography, imagery, app frames and dialogs are retained.

1. **Hero:** exact new perimenopause headline and subhead; 14-day trial line retained. The requested trainer/12+ years line appears with an explicit pending-verification label because the prior 10+ year statement was also unverified.
2. **Pain block:** the supplied night-sweats, brain-fog and changing-cycle copy follows the hero, with a short bridge to THRIVE.
3. **Benefits:** three concrete outcomes: see symptoms, spot patterns and build strength. Semantic h2/h3 hierarchy replaces the previous repeated h2 cards.
4. **Appointment report:** dedicated section with the requested headline, clearly labeled example report, sample-report modal with all three fictional entries, text download and trial CTA. The compact mobile preview expands through the secondary action.
5. **Strength Club:** immediately follows the report. Uses the exact new differentiator headline and preserves all three workout tabs plus the screenshot action.
6. **Social proof:** one specific, visibly labeled sample story now follows Strength Club, before tracking/how-it-works. All four sample records were rewritten in config; one is featured to reduce repetition. Trainer credibility line is repeated with the same verification label.
7. **Tracking/nutrition:** shorter tracking copy and a smaller complete screenshot. Nutrition and daily wellbeing share one compact interactive section; mindfulness, rest and personalized-guidance resources remain available in an expandable library.
8. **Privacy:** new lock motif, requested headline and three policy placeholders driven by PRIVACY_CLAIMS. No unverified no-sale, storage, export or deletion guarantee is published. Privacy button opens the existing policy placeholder until a real URL is provided.
9. **Copy/CTAs:** all six primary trial controls say Start My Free Trial. PRICE_TEXT and the CARD_REQUIRED-derived statement appear beside every one and are connected through aria-describedby. Sticky summary uses the supplied 14-day/cancel text. “A little” appears only twice, in the final headline. Redundant cancellation wording was removed from reassurance paragraphs; it remains explicitly next to each CTA and in the legal/FAQ content.
10. **Legibility/touch:** mobile body copy is at least 17px with 1.55+ line height. Secondary colors are darker; the checked text pairs have a minimum 6.51:1 contrast. Tabs have visible resting underlines, selected backgrounds, hover/focus states and 44px+ targets. Reduced-motion behavior is retained.
11. **Order:** hero → pain → benefits → report → Strength Club → sample story → tracking → combined nutrition/wellbeing → steps → video/founder → privacy → FAQ → final offer → footer. Sticky CTA reserves scroll/focus clearance and hides when the final offer, footer or dialogs are visible.
12. **FAQs:** every existing question and the medical disclaimer are retained. Added sharing/sale and doctor-record questions; answers reflect the unverified privacy/report configuration.

## Verification

- 390px first: normal collapsed page height is 9,729px, down from 11,489px (15.3% shorter).
- 320, 390, 768 and 1440px: no document horizontal overflow; headline fits; primary hero CTA stays in the first viewport. CTA bottom: 432/445/516/575px respectively.
- Six primary trial labels and six associated price/card disclosures verified in the rendered DOM.
- Report modal shows all three example rows. Privacy modal, new FAQ answers, sticky trial chooser, mobile navigation, dark Daily check-in and the retained resource library were exercised.
- Sticky bar height at 390px: 159px rounded; 183px of scroll clearance. Focused tab stayed above it. Footer visibly receives no sticky overlay.
- JavaScript syntax, HTML/ARIA/assets, routing/consent/conversion semantics, CTA/order/copy constraints and shared body-color contrast checks pass. Browser error/warning log was empty.
- This is viewport QA, not a physical-device or complete assistive-technology audit. No external analytics, app trial activation or payment integration is connected.

## Remaining values

See PLACEHOLDERS.md for every named constant and existing pending configuration field, and REPLACEMENT-CHECKLIST.md for the full launch checklist.
