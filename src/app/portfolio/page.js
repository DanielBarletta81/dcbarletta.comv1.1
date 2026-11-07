import CareerStory from '../../components/career/CareerStory';
export const metadata = {
  title: 'My path | Daniel Barletta — Science, Software & Stories',
  description: 'From Rhode Island fisheries and molecular biology to carpentry, software, and storytelling. Explore the experiences and skills behind Daniel Barletta’s work.',
  alternates: { canonical: 'https://dcbarletta.com/portfolio' },
  openGraph: { title: 'Nothing I learned went to waste. — Daniel Barletta', description: 'A winding career, and the connections that make it useful today.', url: 'https://dcbarletta.com/portfolio', type: 'website' },
};
export default function PortfolioPage() { return <CareerStory />; }
