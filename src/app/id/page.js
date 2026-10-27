import Page from '../../components/fault-lines/Campaign';
import { campaignMetadata } from '../../components/fault-lines/content';
export const metadata = campaignMetadata('id', 'author', '');
export default function AuthorRoute() { return <Page locale="id" site="author" />; }
