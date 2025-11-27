import type { Testimonial } from '@/types';

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    text: "Our website looked like it was from 1999. WebsitesForMorons completely transformed it into something we're proud to show off. Sales increased 200% in the first month!",
    author: 'Maria Santos',
    role: 'Owner',
    company: "Sweet Dreams Bakery",
    rating: 5,
  },
  {
    id: '2',
    text: "I was skeptical at first - the name made me laugh. But these guys are seriously talented. They took our outdated plumbing website and turned it into a lead-generating machine.",
    author: 'Mike Thompson',
    role: 'Founder',
    company: "Thompson Plumbing Co.",
    rating: 5,
  },
  {
    id: '3',
    text: "Fast, professional, and they actually listened to what we needed. Our new site loads in under 2 seconds and we've seen a 340% increase in organic traffic.",
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: "Bloom Flowers",
    rating: 5,
  },
  {
    id: '4',
    text: "Best investment we've made for our business. The ROI was visible within weeks. Our customers keep complimenting how professional our new site looks.",
    author: 'James Wilson',
    role: 'CEO',
    company: "Wilson Auto Repair",
    rating: 5,
  },
  {
    id: '5',
    text: "They understood that we're not tech people. The whole process was painless, and the result exceeded our expectations. Highly recommend for any small business!",
    author: 'Patricia Rodriguez',
    role: 'Owner',
    company: "Casa Mexican Restaurant",
    rating: 5,
  },
  {
    id: '6',
    text: "Our e-commerce conversions were stuck at 1.2%. After the redesign, we're at 4.8%. That's real money. Thank you, WebsitesForMorons!",
    author: 'David Kim',
    role: 'Founder',
    company: "KimChi Kitchen",
    rating: 5,
  },
  {
    id: '7',
    text: "I've worked with many agencies before. These folks are different - they actually deliver on their promises. No BS, just results.",
    author: 'Jennifer Adams',
    role: 'Director of Operations',
    company: "Adams Legal Services",
    rating: 5,
  },
  {
    id: '8',
    text: "From a site that embarrassed us to one that impresses clients. The transformation was incredible. Now our online presence matches our in-store experience.",
    author: 'Robert Martinez',
    role: 'Owner',
    company: "Elite Fitness Studio",
    rating: 5,
  },
];

export const featuredTestimonials = testimonialsData.slice(0, 3);

export default testimonialsData;
