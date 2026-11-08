# Maps that look right — diagnosis and best practices

Written after auditing every map across the Tethys/portfolio repos and building
the Microsat Atlas coastal visualizer. Short version: **every map bug found was
a coordinate-contract bug, not a rendering bug.**

## What was actually wrong here

### 1. The frame lied about the image (the big one)
The discovery map images are **1024×768 (4:3)**, but the frames were styled
`aspect-ratio: 16/9` (atlas) and `21/9` (wildbound) with `background-size: cover`.
`cover` scales the image until it fills the frame and **crops the rest** — in the
21/9 frame that silently threw away ~43% of the map's height. Consequences:

- The two modes showed *different crops of the same world*, so nothing lined up.
- Pins were saved as **percent of the frame**, but the frame ≠ the image, so a
  pin's percent landed on different terrain in each mode and could shift between
  screen sizes. Saved pins drifted.

**Fix applied:** one frame whose `aspect-ratio` equals the image's intrinsic
ratio (4/3), and `background-size: 100% 100%`. Because the ratios match, that's
a distortion-free, crop-free, exact 1:1 mapping — *frame percent IS image
percent*, on every device, in every mode. That's the whole unification.

### 2. Stretched fog circles
The fog-of-war SVG used `viewBox="0 0 100 100"` with
`preserveAspectRatio="none"` on a non-square element: a 100×100 coordinate
space smeared across a 4:3 box turns every circle into an ellipse.
**Fix applied:** viewBox `0 0 133.333 100` — same 4:3 ratio as the element —
so `preserveAspectRatio="none"` becomes a no-op and circles stay round.

### 3. Random mask ids (fixed earlier)
The fog mask id came from `Math.random()` in a client component → different id
on server vs client → hydration mismatch, mask briefly pointing at nothing.
Use React's `useId()`.

## The contract: five rules for any image-based (fictional-world) map

1. **The image's intrinsic aspect ratio is law.** Set the container's
   `aspect-ratio` to exactly `imageWidth / imageHeight` and render with
   `background-size: 100% 100%` (or a plain `<img>`/`<image>` filling it).
   Never `cover`, never `center` crops, for anything that carries coordinates.
2. **Store coordinates in image space, as percentages (0–100).** Convert at the
   edges: `(clientX - rect.left) / rect.width * 100` on input, `left: x%` on
   output. Then markers survive resizing, mode switches, and future re-exports
   of the art at higher resolution.
3. **Overlays share the same space.** Give every SVG overlay a viewBox with the
   image's aspect (e.g. `0 0 133.333 100` for 4:3) so percent coordinates map
   straight in and circles stay circles.
4. **One map component, themed — never two map implementations.** Atlas and
   Wildbound should differ in config (image, pins, palette, fog opacity), not
   in geometry code. Every divergence in geometry code becomes a drift bug.
5. **Cap the frame, don't crop the art.** If 4:3 is too tall at full width,
   constrain with `max-width` and center it — resize the window, never the world.

## Best practices for real-geography maps (from Microsat Atlas)

- **You rarely need a map library.** Leaflet/Mapbox earn their weight for tile
  panning, z15 street detail, or 10⁵+ markers. For a fixed regional extent,
  a clipped + simplified GeoJSON rendered as SVG paths is ~11 KB, zero
  dependencies, zero tile requests, and styles exactly like the rest of your UI.
- **Pick the cheapest correct projection.** At regional scale, equirectangular
  with the x-axis scaled by `cos(midLatitude)` is visually indistinguishable
  from Mercator and is one line of math. Fit-to-data with padding beats fixed
  extents.
- **Simplify geometry offline, not at runtime** (Douglas-Peucker at build time;
  commit the output). And mind the classic trap we hit: **closed GeoJSON rings
  start and end on the same point**, which makes the simplification baseline
  degenerate and can silently delete whole polygons — split rings at their
  midpoint first.
- **Stroke-only coastlines on dark surfaces** sidestep polygon-clipping
  artifacts at the bounding box and look like instrument drawings.
- **Always draw the scientific chrome:** graticule with labeled degrees, a
  scale bar, and a legend. They cost ~30 lines and are what makes a map read
  as a measurement instead of an illustration.
- **Performance:** SVG circles are fine to a few thousand markers; past that,
  switch the dot layer to `<canvas>` and keep SVG for chrome. Never animate
  `background-position` or filters on large map layers — transform/opacity only.
- **Accessibility:** `role="img"` with a sentence-long `aria-label`, a table
  view of every plotted value, and color-blind-validated categorical palettes
  (≤3 hues on scatter/maps — all-pairs rules are stricter than charts).

## Quick reference — symptoms → cause

| Symptom | Cause |
|---|---|
| Pins drift between pages/devices | Marker % measured against a cropping frame (`cover`) |
| Circles render as ovals | viewBox aspect ≠ element aspect with `preserveAspectRatio="none"` |
| Map blurry on wide screens | Upscaled raster; cap frame width or export 2× art |
| Fog/mask flashes broken on load | Random ids in SSR components; use `useId()` |
| Whole landmasses missing after simplify | Closed-ring Douglas-Peucker baseline bug |
| Janky scroll over map | Blend modes / filters on fixed full-screen layers |
