import Page from '../../../components/fault-lines/ReleasePipelinePage';
import { campaignMetadata } from '../../../components/fault-lines/content';

export const metadata = campaignMetadata('en', 'author', '/releases/lost-crossing', 'The Lost Crossing — Adventures release pipeline');

export default function LostCrossingReleaseRoute() {
  return <Page locale="en" />;
}
