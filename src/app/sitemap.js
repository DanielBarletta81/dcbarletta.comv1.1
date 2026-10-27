import { AUTHOR_URL, localPath } from '../components/fault-lines/content';
export default function sitemap() {
  return ['', '/books', '/portfolio', '/contact', '/map', '/map/wildbound', '/releases/lost-crossing', '/releases/wildbound'].flatMap(path => ['en', 'id'].map(locale => ({
    url: `${AUTHOR_URL}${localPath(locale, path)}`, changeFrequency: 'monthly', priority: path ? 0.7 : 1,
    alternates: { languages: { en: `${AUTHOR_URL}${localPath('en', path)}`, id: `${AUTHOR_URL}${localPath('id', path)}` } },
  })));
}
