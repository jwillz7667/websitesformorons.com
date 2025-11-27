import type { Metadata } from 'next';
import { Award, Users, Target, Heart, Linkedin, Twitter, Github } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about WebsitesForMorons.com - making the web less ugly since 2004. Meet our team and discover our mission.',
  openGraph: {
    title: 'About Us | WebsitesForMorons.com',
    description: 'Making the web less ugly since 2004.',
  },
};

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: '20+ years in web design. Former agency owner. Passionate about helping small businesses succeed online.',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sarah Miller',
    role: 'Creative Director',
    bio: 'Former Google UX designer. Multiple design award winner. Obsessed with creating beautiful, functional experiences.',
    socials: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack expert and open source contributor. Makes complex things simple.',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Emily Davis',
    role: 'Project Manager',
    bio: 'PMP certified with 500+ projects delivered. Keeps everything running smoothly.',
    socials: { linkedin: '#' },
  },
];

const values = [
  {
    icon: Target,
    title: 'Results-Focused',
    description:
      "We don't just make pretty websites. We create digital experiences that drive real business results.",
  },
  {
    icon: Heart,
    title: 'Small Business Advocates',
    description:
      "We believe every small business deserves a great website. That's why we've dedicated our careers to serving this market.",
  },
  {
    icon: Users,
    title: 'Human-Centered',
    description:
      "Technology should serve people, not the other way around. We design for humans first.",
  },
  {
    icon: Award,
    title: 'Excellence Always',
    description:
      "We're not satisfied with 'good enough'. Every project gets our best work.",
  },
];

const milestones = [
  { year: '2004', title: 'Founded', description: 'Started in a garage with a dream' },
  { year: '2008', title: '100 Clients', description: 'Helped 100 small businesses go online' },
  { year: '2012', title: 'First Award', description: 'Webby Award for Best Small Agency' },
  { year: '2016', title: '1000 Projects', description: 'Milestone: 1,000 websites launched' },
  { year: '2020', title: 'Remote First', description: 'Embraced remote work globally' },
  { year: '2024', title: '2500+ Sites', description: 'And counting...' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="glow" size="md" className="mb-6">
              About Us
            </Badge>
            <h1 className="text-display-lg sm:text-display-xl font-bold text-white mb-6">
              Making the Web{' '}
              <GradientText>Less Ugly</GradientText>{' '}
              Since 2004
            </h1>
            <p className="text-xl text-white/60 mb-8">
              We're a team of designers, developers, and digital strategists who
              believe every small business deserves a website they can be proud of.
              No more embarrassing legacy sites. No more lost customers.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold text-gradient">
                  <AnimatedCounter end={20} suffix="+" />
                </div>
                <div className="text-white/50">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient">
                  <AnimatedCounter end={2500} suffix="+" />
                </div>
                <div className="text-white/50">Websites Transformed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gradient">
                  <AnimatedCounter end={47} />
                </div>
                <div className="text-white/50">Design Awards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-24 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-white/60">
                <p>
                  It all started in 2004 when our founder, Alex, was helping his
                  uncle's plumbing business get online. The "web designer" they'd
                  hired delivered something that looked like it was built in 1995.
                </p>
                <p>
                  Alex thought, "There has to be a better way." He spent the next
                  month rebuilding the site himself. The result? His uncle's calls
                  tripled. That's when WebsitesForMorons was born.
                </p>
                <p>
                  The name? It's a reminder that great web design shouldn't require
                  a PhD in technology. We make it simple, and we never talk down to
                  our clients. (Well, except in our name. But that's just for fun.)
                </p>
                <p>
                  Twenty years later, we've helped over 2,500 small businesses
                  escape their outdated websites and embrace the modern web. And
                  we're just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card variant="glass" padding="none" className="aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-orange-500/20" />
                {/* Placeholder for team photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 dot-pattern opacity-30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Values"
            title="What We Stand For"
            titleGradient="Stand For"
            description="These aren't just words on a wall. They guide every decision we make."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} variant="glass" padding="lg" hover="glow">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-orange-500/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Journey"
            title="20 Years of Making Impact"
            titleGradient="Impact"
            description="Key milestones in our journey to help small businesses succeed online."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-cyan-500 font-mono text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-white/60">{milestone.description}</p>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 shadow-glow shadow-cyan-500/50" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Our Team"
            title="Meet the Morons"
            titleGradient="Morons"
            description="Just kidding. We're actually pretty smart. Here's the team that makes it all happen."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} variant="glass" padding="lg" hover="lift" className="text-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center text-3xl font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <div className="text-cyan-400 text-sm mb-4">{member.role}</div>
                <p className="text-white/60 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-white/40 hover:text-cyan-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="text-white/40 hover:text-cyan-400 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} className="text-white/40 hover:text-cyan-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />
    </>
  );
}
