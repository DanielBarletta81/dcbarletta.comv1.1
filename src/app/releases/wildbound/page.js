import Page from '../../../components/fault-lines/WildboundPipelinePage';
import { campaignMetadata } from '../../../components/fault-lines/content';

export const metadata = campaignMetadata('en', 'author', '/releases/wildbound', 'Wildbound — release pipeline');

export default function WildboundReleaseRoute() {
  return <Page locale="en" />;
}
