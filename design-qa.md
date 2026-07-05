# Design QA — TWILIGHTHAVEN landing

- Source visual truth: `../assets/main.png`, `../assets/games.png`, `../assets/about.png`, `../assets/about-slider.png`, `../assets/contacts.png`, `../assets/mobile.png`, `../assets/mobile-menu.png`
- Implementation URL: `http://127.0.0.1:4321/en/`
- Required viewports: `1920×1080` desktop and `360×800` mobile
- Required states: home, games, about/gallery, contacts, mobile menu, language menu, navigation active states
- Implementation captures: `/private/tmp/twilighthaven-qa/desktop-*.png`, `/private/tmp/twilighthaven-qa/mobile-page.png`, `/private/tmp/twilighthaven-qa/mobile-menu.png`
- Side-by-side evidence: `/private/tmp/twilighthaven-qa/compare-*.png` (source on the left, implementation on the right)

## Full-view comparison evidence

The four desktop screens were captured at `1920×1080`. The complete mobile page was captured at a `360 px` viewport and compared with the `360×2982` design export. The mobile menu was captured at `360×800`.

The composition, typography hierarchy, section markers, controls, borders, image crops, orange accent, dark background, desktop screen proportions, and mobile single-column flow match the approved design system. Text wrapping differs where expected because the implementation capture uses the default English locale while several source exports contain Russian copy.

The About gallery intentionally uses the supplied WebP sequence instead of the static logo state: this follows the approved internal-slider requirement and preserves the image order supplied for the project.

## Focused interaction evidence

- Header navigation switched all four desktop Swiper slides and synchronized `aria-current` with `#home`, `#games`, `#about`, and `#contacts`.
- Browser Back restored `#about` from `#contacts`.
- The language dropdown opened in the desktop header.
- The first gallery image loaded successfully at its intrinsic width of `800 px`.
- With focus on the nested gallery, `ArrowRight` advanced it to `02 / 09` while the outer slider remained on `#about`; `ArrowLeft` returned it.
- The mobile menu opened with `aria-expanded="true"` and closed with Escape, restoring `aria-expanded="false"`.
- At a `360 px` viewport the document width remained exactly `360 px`; no horizontal overflow was present.
- No browser console errors or uncaught page errors were recorded.
- Desktop Swiper uses a vertical transform and wheel navigation. A long `games` slide scrolled from `0` to its `18 px` lower boundary before the next wheel gesture moved to `about`.
- Wheel inertia is locked to one slide transition per gesture.
- The desktop body uses `background.webp` at `max(1920px, 100vw)`; mobile stretches `background-mobile.webp` to the full viewport width with scroll attachment.
- The language menu opens immediately at a fixed `168 px` width and closes on outside pointer interaction.
- Twitter keeps a `24×24` icon while its control expands from `56 px` to `149 px`; its label is `Twitter`.
- The About gallery contains nine slides and nine desktop pagination dots; its images use `object-fit: cover`.
- The team metric is `9+` and all three locale texts were updated consistently.
- Open Graph uses the supplied `og.webp`.

## Findings and patches

- [P1] A Swiper lazy preloader remained visible over an already loaded gallery image.
  - Fix: removed the unnecessary preloader element. Native image loading remains in place.
- [P1] Nested-gallery arrow keys could conflict with the outer desktop Swiper.
  - Fix: made the gallery focusable and added scoped `ArrowLeft`/`ArrowRight` handling that stops propagation and changes only the gallery slide.

No actionable P0, P1, or P2 visual or interaction mismatches remain after recapture.

## Quality gates

- `yarn build`: passed; Astro reported 0 errors, 0 warnings, and 0 hints.
- Desktop interaction and screenshot QA: passed.
- Mobile `360 px` layout, menu, and overflow QA: passed.
- Console/page-error check: passed.

## Production inputs still required

- Set the real `SITE_URL`.
- Add the final Steam, trailer, and social URLs.
- Confirm the Object Sans web-embedding license and the factual founding year `2022`.

final result: passed
