import Page from '../components/fault-lines/Campaign';
import { campaignMetadata } from '../components/fault-lines/content';
export const metadata = campaignMetadata('en', 'author', '');
export default function AuthorRoute() { return <Page locale="en" site="author" />; }
