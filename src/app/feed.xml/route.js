import { AUTHOR_URL } from '../../components/fault-lines/content';

export const dynamic = 'force-static';

// Pinterest's RSS auto-publish skips items without an image, so every item
// carries one via media:content, an enclosure, and an <img> in the description.
// pubDates are fixed per item: a feed whose dates change on every build reads
// as all-new content and breaks Pinterest's dedupe.
const ITEMS = [
  {
    path: '/books',
    title: 'Books: World of Tethys, Fault Lines & Sky City',
    description: 'Books in the World of Tethys by D.C. Barletta, including Fault Lines and Sky City.',
    image: { path: '/fault-lines-card.png', type: 'image/png', length: 79545 },
    pubDate: 'Tue, 03 Nov 2026 12:00:00 GMT',
  },
  {
    path: '/portfolio',
    title: 'The craft: D.C. Barletta — design & engineering',
    description: 'Software craft, scientific visualization, 3D worldbuilding, and the World of Tethys.',
    image: { path: '/A_FebImg-Tethys/the-sentry-volcano.jpg', type: 'image/jpeg', length: 809784 },
    pubDate: 'Mon, 02 Nov 2026 12:00:00 GMT',
  },
  {
    path: '/atlas',
    title: 'Little Tethys Atlas: fossils, collections, badges',
    description: 'Little Tethys Atlas with fossils, collections, and badges to discover.',
    image: { path: '/A_FebImg-Tethys/wideearth-map.jpg', type: 'image/jpeg', length: 409607 },
    pubDate: 'Sun, 01 Nov 2026 12:00:00 GMT',
  },
  {
    path: '/releases/lost-crossing',
    title: 'The Lost Crossing: Adventures release pipeline',
    description: 'Release pipeline and patch notes for The Lost Crossing in Tethys Adventures.',
    image: { path: '/roblox-experiences/The Lost Crossing_ Tethys Adventures-1.png', type: 'image/png', length: 1444317 },
    pubDate: 'Sat, 31 Oct 2026 12:00:00 GMT',
  },
  {
    path: '/releases/wildbound',
    title: 'Wildbound: release pipeline',
    description: 'Release pipeline for Wildbound in the World of Tethys.',
    image: { path: '/roblox-experiences/Wildbound_Camp_Thumb.png', type: 'image/png', length: 2171784 },
    pubDate: 'Fri, 30 Oct 2026 12:00:00 GMT',
  },
];

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  })[ch]);
}

export function GET() {
  const items = ITEMS.map((item) => {
    const link = `${AUTHOR_URL}${item.path}`;
    const imageUrl = encodeURI(`${AUTHOR_URL}${item.image.path}`);
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description><![CDATA[<img src="${imageUrl}" alt="${item.title}" /><p>${item.description}</p>]]></description>
      <media:content url="${escapeXml(imageUrl)}" medium="image" type="${item.image.type}" />
      <enclosure url="${escapeXml(imageUrl)}" type="${item.image.type}" length="${item.image.length}" />
      <pubDate>${item.pubDate}</pubDate>
    </item>`;
  }).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>D.C. Barletta</title>
    <link>${escapeXml(AUTHOR_URL)}</link>
    <atom:link href="${escapeXml(`${AUTHOR_URL}/feed.xml`)}" rel="self" type="application/rss+xml" />
    <description>Books, software craft, 3D worldbuilding, and the World of Tethys by D.C. Barletta.</description>
    <language>en</language>
    <lastBuildDate>${ITEMS[0].pubDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
