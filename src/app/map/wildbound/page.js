import Page from '../../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../../components/fault-lines/content';

export const metadata = campaignMetadata('en', 'author', '/map/wildbound', 'World of Tethys — Wildbound tactical map');

export default function WildboundMapRoute() {
  return <Page locale="en" experience="wildbound" />;
}
