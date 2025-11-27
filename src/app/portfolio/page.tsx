import type { Metadata } from 'next';
import { Star, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { CTA } from '@/components/sections/CTA';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Portfolio - Our Work',
  description:
    'See our website transformation results. Real projects with real results for small businesses.',
  openGraph: {
    title: 'Portfolio | WebsitesForMorons.com',
    description: 'See our website transformation results.',
  },
};

const projects = [
  {
    id: 'sweet-bakery',
    name: "Sweet Dreams Bakery",
    category: 'E-Commerce',
    gradient: 'from-pink-500 to-rose-600',
    icon: '🧁',
    increase: '+200%',
    metric: 'Revenue',
    description: 'Complete e-commerce transformation with online ordering.',
    testimonial: 'Sales exploded after the redesign!',
    author: 'Maria S., Owner',
  },
  {
    id: 'thompson-plumbing',
    name: 'Thompson Plumbing Co.',
    category: 'Service Business',
    gradient: 'from-blue-500 to-cyan-600',
    icon: '🔧',
    increase: '+340%',
    metric: 'Leads',
    description: 'From outdated to lead-generating machine.',
    testimonial: 'The phone hasn\'t stopped ringing!',
    author: 'Mike T., Founder',
  },
  {
    id: 'bloom-flowers',
    name: 'Bloom Flowers',
    category: 'Retail',
    gradient: 'from-green-500 to-emerald-600',
    icon: '🌸',
    increase: '+180%',
    metric: 'Traffic',
    description: 'Beautiful design that matches their beautiful flowers.',
    testimonial: 'Customers love our new online presence.',
    author: 'Sarah C., Marketing Director',
  },
  {
    id: 'wilson-auto',
    name: 'Wilson Auto Repair',
    category: 'Automotive',
    gradient: 'from-orange-500 to-red-600',
    icon: '🚗',
    increase: '+250%',
    metric: 'Bookings',
    description: 'Online booking system that drives appointments.',
    testimonial: 'Best investment for our business.',
    author: 'James W., CEO',
  },
  {
    id: 'casa-restaurant',
    name: 'Casa Mexican Restaurant',
    category: 'Restaurant',
    gradient: 'from-yellow-500 to-orange-600',
    icon: '🌮',
    increase: '+320%',
    metric: 'Online Orders',
    description: 'Integrated ordering with their POS system.',
    testimonial: 'They understood our needs perfectly.',
    author: 'Patricia R., Owner',
  },
  {
    id: 'elite-fitness',
    name: 'Elite Fitness Studio',
    category: 'Fitness',
    gradient: 'from-purple-500 to-indigo-600',
    icon: '💪',
    increase: '+275%',
    metric: 'Memberships',
    description: 'Class scheduling and membership management.',
    testimonial: 'Our online presence matches our in-studio experience.',
    author: 'Robert M., Owner',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            Portfolio
          </Badge>
          <h1 className="text-display-lg sm:text-display-xl font-bold text-white mb-6">
            Real Results for{' '}
            <GradientText>Real Businesses</GradientText>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See how we've transformed outdated websites into modern,
            high-converting digital experiences. These numbers don't lie.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                variant="glass"
                padding="none"
                hover="lift"
                className="overflow-hidden group"
              >
                {/* Header with gradient */}
                <div className={cn(
                  'h-40 flex items-center justify-center',
                  `bg-gradient-to-br ${project.gradient}`
                )}>
                  <span className="text-6xl">{project.icon}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="sm">
                      {project.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-cyan-400 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      {project.increase} {project.metric}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/60 mb-4">
                    {project.description}
                  </p>

                  {/* Testimonial */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-orange-400 fill-orange-400" />
                      ))}
                    </div>
                    <p className="text-sm text-white/70 italic mb-1">
                      "{project.testimonial}"
                    </p>
                    <p className="text-xs text-white/50">
                      — {project.author}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative py-16 bg-gradient-to-r from-cyan-500/10 via-neutral-900 to-orange-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">2,500+</div>
              <div className="text-white/60">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">340%</div>
              <div className="text-white/60">Avg. Traffic Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">4.9/5</div>
              <div className="text-white/60">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient mb-2">14 Days</div>
              <div className="text-white/60">Avg. Delivery Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
