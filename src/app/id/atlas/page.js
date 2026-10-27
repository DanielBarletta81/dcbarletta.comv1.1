import Page from '../../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../../components/fault-lines/content';

export const metadata = campaignMetadata('id', 'author', '/atlas', 'Little Tethys Atlas — fosil, koleksi, badge');

export default function AtlasRoute() {
  return <Page locale="id" experience="adventures" />;
}
