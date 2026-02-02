import { constructMetadata } from '@/config/metadata';
import HomeClient from '@/components/home/HomeClient';

export const metadata = constructMetadata({
  title: 'NepGlass | Premium Eyewear in Nepal',
  description: 'Specializing in premium lens solutions, stylish frames, and trendsetting sunglasses designed for style and comfort.',
});

export default function Home() {
  return <HomeClient />;
}
