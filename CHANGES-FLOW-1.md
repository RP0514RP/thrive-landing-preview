# THRIVE — continuous surface & motion

27 October 2026. Refines editorial warmth while preserving all visible source text and section order exactly.

- A shared subtle SVG paper-grain layer carries through the full page. Linen, food, clothing and photographic texture remain visible.
- Ivory, blush and olive backgrounds now meet through coordinated color transitions, with full-width backgrounds on wide screens. Removed the isolated tracking arch and hard background cuts across the light chapters.
- Stationary photo masks blend the hero, movement, food and connection photographs into their surroundings. Animated images have their own overscan layer; phone frames and text are outside the masks.
- Added an entrance sequence for the headline, copy, trial button, portrait and phone; staggered content reveals; gentle visible-only phone floating; bounded photo, phone and paper depth during scrolling.
- Added moving tab underlines, app-preview crossfades and smooth anchor navigation. No native scroll interception, oversized pinned sections or hidden-until-JavaScript content.
- Scroll updates use one requested animation frame, only for active scenes. CSS phone floating pauses outside view. Reduced-motion preferences and the manual control stop motion; the manual control also disables smooth scrolling and clears offsets.
- Original screenshot crops, mobile trial visibility, store fallbacks, sample labels, verification notices, pricing placeholders and analytics boundary are retained.

## Files

- `dist/flow.css`: surface transitions, photo masks and animation styles.
- `dist/assets/paper-grain.svg`: native SVG paper texture, not a photo placeholder.
- `dist/app.js`: motion controller, scene observer, stagger timing, moving tab indicators and preview transitions.
- `dist/index.html`: photo-layer wrappers, stylesheet and cache-version references; text and chapter order unchanged.

## Verification

Static/ARIA/assets, copy constraints, routing/consent/conversion tests and JavaScript syntax pass. Browser checks cover 320, 390, 768 and 1440px widths, complete hero-phone bounds, moving tabs, app appearances, reduced-motion stop/restore, and no console errors or broken loaded images. See VALIDATION.md.

Review: https://rp0514rp.github.io/thrive-landing-preview/?v=flow-1

Previous source is preserved in `archive/editorial-1-before-flow/`.
