import Page from '../../components/fault-lines/AuthorPages';
import { campaignMetadata } from '../../components/fault-lines/content';
export const metadata = campaignMetadata('en', 'author', '/portfolio', 'The craft — D.C. Barletta');
export default function AuthorRoute() { return <Page locale="en" page="portfolio" />; }
