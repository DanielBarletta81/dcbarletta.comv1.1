import Page from '../../components/fault-lines/AuthorPages';
import { campaignMetadata } from '../../components/fault-lines/content';
export const metadata = campaignMetadata('en', 'author', '/books', 'World of Tethys — Fault Lines & Sky City');
export default function AuthorRoute() { return <Page locale="en" page="books" />; }
