import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Quote,
  Zap,
  Users,
  Award,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectMockup } from '@/components/portfolio/ProjectMockup';
import { CTA } from '@/components/sections/CTA';
import { projectsData, portfolioStats, projectCategories } from '@/data/projects';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Portfolio - Case Studies & Client Results',
  description:
    'Explore our portfolio of website transformations. Real case studies with measurable results across healthcare, legal, e-commerce, and more.',
  openGraph: {
    title: 'Portfolio | WebsitesForMorons.com',
    description: 'Real website transformations with real results. See our work across 25+ industries.',
  },
};

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="glow" size="md" className="mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>2,500+ Successful Transformations</span>
            </Badge>
            <h1 className="text-display-lg sm:text-display-xl lg:text-display-2xl font-bold text-white mb-6">
              Real Results for{' '}
              <GradientText>Real Businesses</GradientText>
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Every project tells a story of transformation. From outdated websites
              that were costing businesses money, to high-converting digital
              experiences that drive measurable growth.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gradient mb-1">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  {portfolioStats.averageIncrease}
                </div>
                <div className="text-sm text-white/50">Avg. Performance Increase</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gradient mb-1">
                  <Users className="w-6 h-6 text-cyan-400" />
                  {portfolioStats.totalProjects}
                </div>
                <div className="text-sm text-white/50">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gradient mb-1">
                  <Star className="w-6 h-6 text-orange-400 fill-orange-400" />
                  {portfolioStats.clientSatisfaction}
                </div>
                <div className="text-sm text-white/50">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold text-gradient mb-1">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  {portfolioStats.averageDelivery}
                </div>
                <div className="text-sm text-white/50">Avg. Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="sticky top-20 z-30 py-4 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {projectCategories.slice(0, 8).map((category) => (
              <button
                key={category.id}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  category.id === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {projectsData.map((project, index) => (
              <article
                key={project.id}
                className={cn(
                  'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
                  index % 2 === 1 && 'lg:[direction:rtl]'
                )}
              >
                {/* Project Card Visual */}
                <div className={cn('relative', index % 2 === 1 && 'lg:[direction:ltr]')}>
                  <div className="relative group">
                    {/* Glow effect */}
                    <div className={cn(
                      'absolute -inset-4 rounded-3xl blur-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-60',
                      `bg-gradient-to-br ${project.gradient}`
                    )} />

                    {/* Project Image - No Browser Chrome */}
                    <Card variant="glass" padding="none" className="relative overflow-hidden">
                      {/* Project preview */}
                      <div className="aspect-[16/10] relative overflow-hidden bg-neutral-950">
                        <ProjectMockup
                          projectId={project.id}
                          projectName={project.name}
                          increase={project.increase}
                          gradient={project.gradient}
                          icon={project.icon}
                        />
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Project Details */}
                <div className={cn('space-y-6', index % 2 === 1 && 'lg:[direction:ltr]')}>
                  <div>
                    <Badge variant="secondary" size="sm" className="mb-4">
                      {project.category}
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                      {project.name}
                    </h2>
                    <p className="text-lg text-white/60">
                      {project.description}
                    </p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                      <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                        The Challenge
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {project.challenge.length > 200
                          ? project.challenge.substring(0, 200) + '...'
                          : project.challenge}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                      <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                        Our Solution
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {project.solution.length > 200
                          ? project.solution.substring(0, 200) + '...'
                          : project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Results */}
                  <div>
                    <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                      Key Results
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {project.results.slice(0, 4).map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-white/5 text-white/50 rounded-full border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-3 py-1 text-xs font-medium text-white/30">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Testimonial */}
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10">
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-cyan-500/20" />
                    <blockquote className="relative z-10">
                      <p className="text-white/80 italic mb-4 pl-6">
                        "{project.testimonial.text.length > 200
                          ? project.testimonial.text.substring(0, 200) + '...'
                          : project.testimonial.text}"
                      </p>
                      <footer className="flex items-center gap-3 pl-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                          {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {project.testimonial.author}
                          </div>
                          <div className="text-xs text-white/50">
                            {project.testimonial.role}
                          </div>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                          ))}
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Stats Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-neutral-900 to-orange-500/10" />
        <div className="absolute inset-0 mesh-gradient opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Numbers Don't Lie
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Across every industry and every project size, we deliver measurable
              results that transform businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.totalProjects}</div>
              <div className="text-sm text-white/60">Projects Completed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.averageIncrease}</div>
              <div className="text-sm text-white/60">Avg. Traffic Increase</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.clientSatisfaction}</div>
              <div className="text-sm text-white/60">Client Rating</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.averageDelivery}</div>
              <div className="text-sm text-white/60">Avg. Delivery</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.totalRevenue}</div>
              <div className="text-sm text-white/60">Client Revenue Generated</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-gradient mb-2">{portfolioStats.industries}</div>
              <div className="text-sm text-white/60">Industries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Industries"
            title="Expertise Across Every Sector"
            titleGradient="Every Sector"
            description="From healthcare to hospitality, legal to e-commerce—we've transformed websites in every major industry."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: '🏥', name: 'Healthcare & Medical', count: '150+' },
              { icon: '⚖️', name: 'Legal Services', count: '200+' },
              { icon: '🛒', name: 'E-Commerce & Retail', count: '400+' },
              { icon: '🏠', name: 'Real Estate', count: '180+' },
              { icon: '🍽️', name: 'Restaurant & Hospitality', count: '250+' },
              { icon: '🔧', name: 'Home Services', count: '300+' },
              { icon: '💼', name: 'Professional Services', count: '220+' },
              { icon: '🏋️', name: 'Fitness & Wellness', count: '120+' },
              { icon: '🎓', name: 'Education & Coaching', count: '90+' },
              { icon: '⚙️', name: 'Manufacturing', count: '75+' },
              { icon: '💙', name: 'Nonprofit', count: '100+' },
              { icon: '💻', name: 'SaaS & Technology', count: '85+' },
            ].map((industry) => (
              <Card
                key={industry.name}
                variant="glass"
                padding="md"
                hover="lift"
                className="text-center"
              >
                <span className="text-4xl mb-3 block">{industry.icon}</span>
                <h3 className="text-sm font-semibold text-white mb-1">{industry.name}</h3>
                <p className="text-xs text-cyan-400">{industry.count} projects</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Transform */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="glow" size="md" className="mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>Your Turn</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Be Our Next{' '}
            <GradientText>Success Story?</GradientText>
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Every project in this portfolio started with a business just like yours—
            frustrated with their website and ready for change. Let's talk about
            your transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="xl"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              asChild
            >
              <Link href="/contact">Get Your Free Consultation</Link>
            </Button>
            <Button
              variant="secondary"
              size="xl"
              asChild
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
