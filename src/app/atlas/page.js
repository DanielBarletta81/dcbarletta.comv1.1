import Page from '../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../components/fault-lines/content';

export const metadata = campaignMetadata('en', 'author', '/atlas', 'Little Tethys Atlas — fossils, collections, badges');

export default function AtlasRoute() {
  return <Page locale="en" experience="adventures" />;
}
