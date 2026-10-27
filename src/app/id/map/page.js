import Page from '../../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../../components/fault-lines/content';

export const metadata = campaignMetadata('id', 'author', '/map', 'World of Tethys — peta penemuan');

export default function DiscoveryMapRoute() {
  return <Page locale="id" />;
}
