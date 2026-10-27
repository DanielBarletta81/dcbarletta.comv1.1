import Page from '../../../../components/fault-lines/ReleasePipelinePage';
import { campaignMetadata } from '../../../../components/fault-lines/content';

export const metadata = campaignMetadata('id', 'author', '/releases/lost-crossing', 'The Lost Crossing — pipeline rilis Adventures');

export default function LostCrossingReleaseRoute() {
  return <Page locale="id" />;
}
