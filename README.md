D.C. Barletta — Author Website
An author platform at the intersection of fiction, scientific thinking, software, and interactive worldbuilding.

Author website · World of Tethys · GitHub repository
Repository scope: This repository contains a Next.js implementation of the D.C. Barletta author site, with an English/Indonesian Fault Lines campaign experience, book information, an author portfolio overview, and links into the wider World of Tethys ecosystem. This README documents the code currently visible on the seo-driven default branch; it does not independently certify the production deployment.

Why this project exists
A conventional author website introduces books and an author. This project also explores how a digital experience can connect speculative fiction to the scientific ideas and creative disciplines behind it.

My background in molecular biology, fisheries research, fieldwork, and software development influences how I create worlds. The website is designed to give readers a direct path to the books while introducing the broader work—interactive environments, ecological storytelling, software, and visual media—without requiring them to navigate a single sprawling platform.

The author site and the world-exploration site have deliberately separate roles:
- dcbarletta.com: author identity, books, portfolio overview, contact, and publishing/campaign communication.
- worldoftethys.com: deeper universe exploration and related interactive experiences.
Current implementation
The repository includes:
- English and Bahasa Indonesia routes for author and campaign content, with language-specific copy and navigation.
- Book discovery pages for Sky City (Book I) and Fault Lines (Book II, presented in the source as in preparation), including external reading links and release updates.
- Author portfolio and contact routes, bringing software, 3D worldbuilding, and physical craftsmanship into the same professional narrative.
- Campaign and release routes for connected World of Tethys/Roblox experiences.
- A discovery atlas route and map redirects, connecting the author-facing site to interactive world content.
- Motion controls, including a pause option and support for the user's reduced-motion preference.
- Search and sharing metadata, including route metadata and a sitemap with English/Indonesian alternate-language entries.
- Production-host-restricted analytics initialization for dcbarletta.com and www.dcbarletta.com.
Representative routes
Route	Purpose
/ and /id	English and Indonesian author landing pages
/books and /id/books	Book information and reader pathways
/portfolio and /id/portfolio	Author's work across software, worldbuilding, and physical craft
/contact and /id/contact	Publishing, media, and collaboration inquiries
/atlas and /id/atlas	Discovery-map entry points
/releases/lost-crossing and /releases/wildbound	Connected experience/release information


The map and release sections are part of a broader creative ecosystem, not substitutes for the site's central author and portfolio role.
Engineering approach
Separation of responsibilities
The site uses Next.js App Router, React, and JavaScript. Route entry files in src/app/ map to shared campaign/page components under src/components/fault-lines/.

Content is organized in src/components/fault-lines/content.js, which holds bilingual copy, official external information links, and URL helpers. This keeps much of the presentation text separate from the route wrappers and page composition.
Localization and discoverability
The site serves English and Indonesian content through distinct routes. It generates sitemap URLs with language alternates and uses route-specific page metadata. These are implemented discoverability features; they are not evidence by themselves of search rankings, indexing success, or translation quality.
Inclusive interaction
The campaign shell includes a skip-to-content link, navigation labels, a language switcher, and a pause control for atmospheric motion. It respects the prefers-reduced-motion media query.

These are useful design measures, but this repository README does not claim a completed WCAG audit, assistive-technology acceptance test, or device test matrix.
Responsible communication
Where the story references real places and volcanic events, the source explicitly distinguishes fictional atmospheric animation from live hazard monitoring and links readers to official Indonesian information sources.

That boundary matters: an illustrative experience should never be mistaken for real-time public-safety information.
Repository structure
src/
  app/
    page.js              # English landing route
    id/                  # Indonesian-language routes
    books/               # Book information
    portfolio/           # Professional/creative work
    contact/             # Contact page
    atlas/               # Discovery-map entry
    releases/            # Related experience release pages
    layout.js            # Root layout and metadata
    sitemap.js           # Sitemap and language alternates
  components/
    fault-lines/         # Campaign pages, shared shell, content, styling
    AuthorAnalytics.js   # Host-restricted analytics loader
  middleware.js          # Atlas-subdomain routing
public/
  A_FebImg-Tethys/       # Referenced visual assets
  fonts/                 # Local typefaces
  roblox-experiences/    # Related experience imagery
Run locally
The seo-driven branch declares Next.js 14.2.5 and React 18.2.0.
git clone https://github.com/DanielBarletta81/dcbarletta.comv1.1.git
cd dcbarletta.comv1.1
npm ci
npm run dev
Open http://localhost:3000.

To produce a production build:
npm run build
npm start
The commands above are documented from the package scripts. Build success and production parity were not independently verified while preparing this README. The repository's lint script uses next lint; verify that command against the installed Next.js version before treating it as a passing quality gate.
What this project demonstrates
- Full-stack-adjacent web architecture: modular Next.js routing, component composition, shared content structures, metadata, and deployment-oriented design.
- Public-facing science communication judgment: avoiding confusion between speculative worldbuilding and authoritative environmental information.
- Multilingual audience design: distinct English and Indonesian routes and corresponding discovery metadata.
- Content and product separation: an author/publishing experience distinct from a larger universe-exploration platform.
- Progressive information architecture: accessible entry points into books, author background, and deeper interactive content.
Current limitations and next improvements
- Portfolio depth: the current /portfolio route introduces the disciplines and work but does not yet provide the planned evidence-rich professional timeline and project case studies.
- Visual documentation: add real screenshots of the English/Indonesian landing pages, book page, and mobile navigation; do not substitute concept art for application screenshots.
- Verification: add reproducible lint/build checks, responsive browser tests, keyboard testing, and accessibility checks.
- Localization review: have Indonesian-language copy and local resource links reviewed by a fluent reader.
- Asset management: the repository currently includes large image assets, including duplicated top-level map/texture filenames; consider an asset audit and optimized delivery strategy in a separate, reviewed change.
- Release claims: check book and game-release status against the live product before changing any marketing copy.
- Analytics and privacy: document consent/privacy handling and verify analytics behavior on the deployed host.
Related work
- World of Tethys platform — the broader interactive universe platform.
- Tethys Discovery — environmental learning experiences.
- NOAA Signals Lab — observed scientific data, validation, and evidence transparency.
- Microsat Atlas — interactive visualization of population-genetics concepts.
Author
D.C. Barletta / Daniel Barletta — writer, scientific researcher, and software developer.

My projects connect the practices of field observation, biological analysis, structural problem-solving, narrative worldbuilding, and interactive software. The common goal is to make complex worlds—real or imagined—easier to explore and understand.
Status: Active author-site implementation. This document describes the repository, not a completed deployment or accessibility certification.
