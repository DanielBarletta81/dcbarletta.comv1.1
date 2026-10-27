import Page from '../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../components/fault-lines/content';

export const metadata = campaignMetadata('en', 'author', '/map', 'World of Tethys — discovery map');

export default function DiscoveryMapRoute() {
  return <Page locale="en" />;
}
