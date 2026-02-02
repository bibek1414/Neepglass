import { constructMetadata } from '@/config/metadata';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const metadata = constructMetadata({
  title: 'Vision Insights | NepGlass Blog',
  description: 'Read expert advice on eye health, style tips, and the latest trends in eyewear from NepGlass.',
});

export default function BlogListingPage() {
  return <BlogListingClient />;
}
