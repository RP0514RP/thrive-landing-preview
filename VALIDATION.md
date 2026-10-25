# THRIVE conversion preview — validation

25 October 2026. Tested the complete static implementation in the in-app browser. These are viewport checks, not physical iPhone/Android device tests.

- 320×740, 390×844, 600×900, 768×1024, 1024×768 and 1440×1000: document width equals viewport width, headline fits its container, and hero trial CTA is fully inside the initial viewport. CTA bottom positions: 433, 443, 489, 556, 588 and 658 pixels respectively.
- Inspected mobile hero, complete desktop composition and video layouts. Original supplied screenshots are correctly cropped. No broken loaded images or browser console errors/warnings were observed.
- Exercised hero trial CTA, desktop store-choice modal and missing Google Play link fallback; no navigation to invalid destinations, no trial/payment creation.
- Exercised cycle/symptom/pattern tabs and keyboard tab navigation; daily check-in with dark appearance; screenshot enlargement and Escape dismissal; app walkthrough chapters; founder placeholder outline; resource placeholder modal; mobile navigation; trial-inclusions FAQ; reduced motion and back-to-top.
- Native dialogs manage focus and Escape. Explicit focus outlines, skip navigation, tab roles, selection states and keyboard tab controls are implemented. This is not a formal assistive-technology audit.
- `node scripts/check-behavior.mjs` passes device/marketplace routing, store host/credential/protocol validation, consent behavior, property allowlisting and rejection of website-created install/trial/paid events.
- `python3 scripts/check-static.py` passes unique IDs, HTML/ARIA references, local assets, image alt attributes and explicit button types.
- `node --check` passes app.js, config.js, routing.js and analytics.js.
- `node scripts/check-launch.mjs` intentionally reports pending production prerequisites. The labeled visual-review preview is complete; store listings, trial terms, authentic proof/media, policies and actual entitlements are not connected or verified.

Review captures:
- `../thrive-conversion-mobile.png`
- `../thrive-conversion-mobile-full.png`
- `../thrive-conversion-desktop-full.png`

The hero portrait is a labeled generated illustrative model (built-in ImageGen), not a founder/customer. Its prompt is preserved in `hero-lifestyle-prompt.txt`. Movement photography was encoded as WebP, reducing the served asset from 2.4 MB PNG to 181 KB. The hero portrait is 111 KB. Fonts and media are self-hosted; no tracking service or external JavaScript library is loaded.
