import Page from '../../components/fault-lines/AuthorPages';
import { campaignMetadata } from '../../components/fault-lines/content';
export const metadata = campaignMetadata('en', 'author', '/contact', 'Contact — D.C. Barletta');
export default function AuthorRoute() { return <Page locale="en" page="contact" />; }
