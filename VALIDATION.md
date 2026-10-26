# THRIVE editorial warmth — validation

26 October 2026. Browser viewport QA in the in-app browser using the HTTP preview. This is not a physical-device or full screen-reader audit.

| Viewport | Page width | Headline contained | Hero CTA bottom |
|---|---:|---|---:|
| 320×740 | 320 | Yes | 436px |
| 390×844 | 390 | Yes | 467px |
| 768×1024 | 768 | Yes | 509px |
| 1440×1000 | 1440 | Yes | 562px |

- No horizontal overflow at all four widths. The normal 390px page is 11,047px tall. No empty sections were found.
- Mobile body copy is 17px with 1.55+ line height. Intentional captions, preview labels, legal metadata and report-table details use smaller text.
- Verified mobile navigation, Strength Club tabs, Cycle/Symptoms/Patterns tabs, Nutrition/Daily check-in, both app appearances, trial chooser, interactive app-video preview and three-row report dialog.
- The mobile sticky bar is approximately 114px tall and retains matching scroll/focus clearance. It hides over dialogs, the final offer and footer.
- Every primary trial action retains its visible centralized price/card disclosure and aria-describedby reference.
- All four new photographic assets loaded successfully. No broken loaded images, console warnings or errors were observed.
- check-static.py passes IDs, ARIA references, local assets, alt text and button types.
- check-copy.py passes section order, six exact CTA labels, copy limits, required disclaimers and body-token color contrast (minimum 6.51:1). This is not a complete image-overlay contrast audit.
- check-behavior.mjs passes routing, consent, sensitive-property filtering and conversion semantics. JS behavior files are unchanged by the visual redesign.
- Production preflight remains intentionally pending: listings, billing, policies, founder information, genuine reviews, final media and trial entitlements need verification.

Screenshots in the parent outputs folder: thrive-editorial-mobile.png, thrive-editorial-mobile-full.png, thrive-editorial-desktop.png, thrive-editorial-desktop-full.png.

The previous implementation is archived at archive/conversion-2-before-editorial/.

## Continuous surface & motion — 27 October 2026

- All visible source text and chapter IDs/order compare exactly with archive/editorial-1-before-flow/index.html.
- 320/390/768/1440px: no horizontal overflow; headline contained; entire rotated hero phone remains inside the art region. Stable CTA bottoms remain 436/467/509/562px respectively.
- Normal mobile page height is 11,048px. No pinned-scroll regions or animation-reserved gaps were introduced.
- Verified moving tab indicator coordinates and active floating animation, plus nonzero scroll-driven photo/device offsets.
- Manual Reduce motion clears scene offsets, disables CSS floating and smooth scrolling; Restore motion enables the controller again. System preference is also respected by the source; not independently toggled at OS level.
- Mobile menu, Home/gym and Yoga/Pilates tabs, Cycle/Symptoms/Patterns, Nutrition/Daily check-in and both app appearances work. No browser console warnings/errors or broken loaded images observed.
- The independently masked photo layers prevent scaling/parallax from exposing rectangular background seams or clipping foreground phone frames.
- JavaScript syntax, static references/assets/ARIA, copy/CTA/disclaimer checks and routing/consent/conversion tests pass. Existing pending launch details are unchanged.
- This remains viewport QA rather than a physical-device, full screen-reader or performance benchmark.

Latest review URL: https://rp0514rp.github.io/thrive-landing-preview/?v=flow-1
