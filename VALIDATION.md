# THRIVE conversion-2 — validation

25 October 2026. Tested the static site in the in-app browser. This is viewport QA, not a physical-device or full assistive-technology audit.

| Viewport | Page width | Headline contained | Hero CTA bottom | All trial labels/disclosures |
|---|---:|---|---:|---|
| 390×844 (first) | 390 | Yes | 445px | Pass |
| 320×740 | 320 | Yes | 432px | Pass |
| 768×1024 | 768 | Yes | 516px | Pass |
| 1440×1000 | 1440 | Yes | 575px | Pass |

- At 390px, normal collapsed page height is 9,729px versus 11,489px previously: 15.3% shorter. Text zoom/reflow and expanded previews can increase page height normally.
- Rendered body-paragraph/list audit at 390px found no body copy under 17px, excluding intentional metadata such as sample labels, dates, eyebrows and captions. Body line heights are 1.55 or higher.
- All six primary trial controls have the exact Start My Free Trial label and an aria-describedby reference to their own visible price/card disclosure.
- Report preview clearly labels example data. The full report modal shows all three fictional rows, with non-clinical disclaimers and a sample text export.
- Exercised sticky trial chooser, Privacy footer modal, both new FAQs, FAQ-to-report action, mobile menu/navigation, dark Daily check-in and all three resources within the expandable library. Existing screenshot dialogs, keyboard tabs and reduced motion are retained.
- Mobile sticky bar is 159px high (rounded) with 183px scroll/focus clearance. A focused tab remained above it. It hides on the final offer, footer and dialogs; the footer was visibly unobscured.
- No broken loaded images or browser console errors/warnings were observed.
- JS syntax checks pass. check-static.py passes IDs/ARIA/local assets/alt/button types. check-behavior.mjs passes marketplace routing, unknown/true/false card states, unverified placeholder defaults, consent/property filtering and conversion semantics. check-copy.py passes exact section order, CTA labels, copy limits, preserved disclaimers and shared body/secondary/tab/button color pairs (minimum 6.51:1).
- check-launch.mjs intentionally reports pending launch facts, policy confirmations and connections. This remains a labeled review preview, not an active subscription launch.

Review captures in the parent outputs directory:
- thrive-conversion-2-mobile.png
- thrive-conversion-2-mobile-full.png
- thrive-conversion-2-desktop.png
- thrive-conversion-2-desktop-full.png

No new images were generated for this revision. Existing photography, supplied app screens, fonts and natural textures were preserved.
