import Page from '../../../../components/fault-lines/DiscoveryMapPage';
import { campaignMetadata } from '../../../../components/fault-lines/content';

export const metadata = campaignMetadata('id', 'author', '/map/wildbound', 'World of Tethys — peta taktis Wildbound');

export default function WildboundMapRoute() {
  return <Page locale="id" experience="wildbound" />;
}
