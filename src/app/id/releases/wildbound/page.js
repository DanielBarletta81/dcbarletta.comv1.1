import Page from '../../../../components/fault-lines/WildboundPipelinePage';
import { campaignMetadata } from '../../../../components/fault-lines/content';

export const metadata = campaignMetadata('id', 'author', '/releases/wildbound', 'Wildbound — pipeline rilis');

export default function WildboundReleaseRoute() {
  return <Page locale="id" />;
}
