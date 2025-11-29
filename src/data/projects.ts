import type { Project } from '@/types';

export const projectsData: Project[] = [
  // ============================================================================
  // Healthcare & Medical
  // ============================================================================
  {
    id: 'coastal-dermatology-associates',
    name: 'Coastal Dermatology Associates',
    category: 'Healthcare',
    gradient: 'from-teal-500 to-cyan-600',
    icon: '🏥',
    increase: '+385%',
    description: 'Multi-location dermatology practice serving the Pacific Northwest with a focus on medical and cosmetic dermatology services.',
    shortDescription: 'Complete digital transformation for a 5-location medical practice.',
    challenge: 'Coastal Dermatology was operating with a website built in 2009 that wasn\'t mobile-responsive and had no online appointment booking. Patients were calling during business hours only, leading to missed opportunities and frustrated staff. The practice was losing potential cosmetic procedure clients to competitors with modern web presences.',
    solution: 'We built a HIPAA-compliant website with integrated patient portal connectivity, real-time appointment scheduling across all 5 locations, and a comprehensive procedure library with before/after galleries. The new design emphasizes trust signals and physician credentials while maintaining a clean, clinical aesthetic.',
    results: [
      '385% increase in online appointment requests within 90 days',
      'Average call volume reduced by 45%, freeing staff for patient care',
      'Cosmetic consultation requests increased 520%',
      'Page load time reduced from 8.2s to 1.4s',
      'Mobile traffic conversion rate improved from 0.8% to 4.2%',
      'Google My Business profile views increased 290%',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Calendly API', 'HIPAA-Compliant Hosting', 'Google Analytics 4'],
    testimonial: {
      text: 'The team understood exactly what a medical practice needs. Our new website has transformed how we acquire patients—cosmetic consultations are up over 500%, and our staff spends less time on the phone. The ROI was evident within the first month.',
      author: 'Dr. Rebecca Chen',
      role: 'Managing Partner, Coastal Dermatology Associates',
    },
    screenshots: ['/portfolio/coastal-derm-hero.jpg', '/portfolio/coastal-derm-services.jpg', '/portfolio/coastal-derm-booking.jpg'],
    beforeImage: '/portfolio/coastal-derm-before.jpg',
    afterImage: '/portfolio/coastal-derm-after.jpg',
    url: 'https://coastaldermatology.example.com',
  },

  // ============================================================================
  // Legal Services
  // ============================================================================
  {
    id: 'morrison-blackwell-law',
    name: 'Morrison & Blackwell LLP',
    category: 'Legal Services',
    gradient: 'from-slate-600 to-slate-800',
    icon: '⚖️',
    increase: '+290%',
    description: 'Established personal injury law firm with 30+ years of experience serving clients across three states.',
    shortDescription: 'Authority-building redesign for a prestigious personal injury firm.',
    challenge: 'Despite their stellar 30-year track record and $500M+ in settlements, Morrison & Blackwell\'s website looked like it was designed by a first-year law student in 2005. They were losing high-value cases to younger firms with slick websites, even though their actual results were superior.',
    solution: 'We created a case results showcase highlighting their $500M+ in recovered settlements, integrated video testimonials from past clients, and built an interactive case evaluation tool. The design conveys authority and trust while remaining approachable—critical for personal injury clients often in vulnerable situations.',
    results: [
      '290% increase in qualified case inquiries',
      'Average case value of inquiries increased by $45,000',
      'Time-on-site increased from 48 seconds to 4.2 minutes',
      'Video testimonial completion rate of 78%',
      'Organic search traffic grew 180% in 6 months',
      'Featured snippet rankings for 12 high-value keywords',
    ],
    technologies: ['Next.js', 'Framer Motion', 'Contentful CMS', 'Wistia Video', 'Intercom Live Chat', 'CallRail Integration'],
    testimonial: {
      text: 'We were skeptical about investing in a new website when ours was "working fine." Within 60 days of launch, we signed three cases totaling over $2M in expected recovery. The website paid for itself many times over.',
      author: 'David Morrison',
      role: 'Senior Partner, Morrison & Blackwell LLP',
    },
    screenshots: ['/portfolio/morrison-hero.jpg', '/portfolio/morrison-results.jpg', '/portfolio/morrison-intake.jpg'],
    beforeImage: '/portfolio/morrison-before.jpg',
    afterImage: '/portfolio/morrison-after.jpg',
    url: 'https://morrisonblackwell.example.com',
  },

  // ============================================================================
  // E-Commerce / Retail
  // ============================================================================
  {
    id: 'heritage-craft-coffee',
    name: 'Heritage Craft Coffee Roasters',
    category: 'E-Commerce',
    gradient: 'from-amber-600 to-orange-700',
    icon: '☕',
    increase: '+420%',
    description: 'Third-wave specialty coffee roaster with a focus on single-origin beans and sustainable sourcing partnerships.',
    shortDescription: 'E-commerce platform for a premium specialty coffee brand.',
    challenge: 'Heritage Craft was selling their award-winning coffee through a basic Shopify template that didn\'t reflect their artisanal brand or tell the story of their direct-trade relationships with farmers. Their subscription program was losing 40% of customers within 3 months due to a clunky management experience.',
    solution: 'We built a custom e-commerce experience featuring immersive origin stories for each bean, a sophisticated subscription management portal, and an interactive flavor profile explorer. The checkout was streamlined from 6 steps to 2, with intelligent upselling based on taste preferences.',
    results: [
      '420% increase in online revenue year-over-year',
      'Subscription retention improved from 60% to 89% at 3 months',
      'Average order value increased from $32 to $58',
      'Cart abandonment reduced from 78% to 31%',
      'Email capture rate increased 340% with exit-intent offers',
      'Wholesale inquiry submissions increased 650%',
    ],
    technologies: ['Shopify Plus', 'Custom Liquid Theme', 'Recharge Subscriptions', 'Klaviyo', 'Yotpo Reviews', 'Route Shipping Protection'],
    testimonial: {
      text: 'Our old site felt like we were selling commodity coffee. The new platform tells our story—where the beans come from, who grows them, and why it matters. Customers connect with our mission now, not just our product. And our subscription churn dropped dramatically.',
      author: 'Marcus & Elena Fernandez',
      role: 'Co-Founders, Heritage Craft Coffee',
    },
    screenshots: ['/portfolio/heritage-coffee-hero.jpg', '/portfolio/heritage-coffee-pdp.jpg', '/portfolio/heritage-coffee-subscription.jpg'],
    beforeImage: '/portfolio/heritage-coffee-before.jpg',
    afterImage: '/portfolio/heritage-coffee-after.jpg',
    url: 'https://heritagecraftcoffee.example.com',
  },

  // ============================================================================
  // Home Services
  // ============================================================================
  {
    id: 'summit-hvac-solutions',
    name: 'Summit HVAC Solutions',
    category: 'Home Services',
    gradient: 'from-blue-500 to-sky-600',
    icon: '❄️',
    increase: '+465%',
    description: 'Family-owned heating, cooling, and indoor air quality company serving the Denver metro area for 25 years.',
    shortDescription: 'Lead generation machine for a regional HVAC contractor.',
    challenge: 'Summit was the best-kept secret in Denver HVAC. Despite 25 years of 5-star service, they were invisible online. Their ancient website ranked nowhere, had no way to book service calls, and the phone number was actually wrong on half the pages. Meanwhile, newer competitors with inferior service were dominating local search.',
    solution: 'We built a service-area optimized website with instant online booking, real-time technician availability, emergency service priority scheduling, and financing pre-qualification. The design emphasizes trust signals like licensing, insurance, and their 25-year track record.',
    results: [
      '465% increase in organic leads within 6 months',
      'Emergency service calls online increased from 0 to 120/month',
      'Average ticket value for web leads: $890 vs $520 from calls',
      'Google Local Pack rankings for 45 service-area keywords',
      'Online booking now represents 65% of all appointments',
      'Cost per lead reduced from $85 to $23',
    ],
    technologies: ['Next.js', 'ServiceTitan Integration', 'Google Business Profile API', 'Wisetack Financing', 'Podium Reviews', 'CallRail'],
    testimonial: {
      text: 'For 25 years we relied on word of mouth, but the market changed. Within 3 months of launching the new site, we were getting more online leads than phone calls. And they\'re better leads—people who\'ve already read about us and trust us before they even call.',
      author: 'Tom & Linda Nakamura',
      role: 'Owners, Summit HVAC Solutions',
    },
    screenshots: ['/portfolio/summit-hvac-hero.jpg', '/portfolio/summit-hvac-booking.jpg', '/portfolio/summit-hvac-services.jpg'],
    beforeImage: '/portfolio/summit-hvac-before.jpg',
    afterImage: '/portfolio/summit-hvac-after.jpg',
    url: 'https://summithvac.example.com',
  },

  // ============================================================================
  // Restaurant / Hospitality
  // ============================================================================
  {
    id: 'terroir-wine-bar',
    name: 'Terroir Wine Bar & Kitchen',
    category: 'Restaurant',
    gradient: 'from-rose-600 to-pink-800',
    icon: '🍷',
    increase: '+280%',
    description: 'Upscale wine bar and small plates restaurant featuring 200+ wines by the glass and seasonal farm-to-table cuisine.',
    shortDescription: 'Digital presence for a sophisticated wine and dining destination.',
    challenge: 'Terroir was a neighborhood gem with James Beard-nominated cuisine, but their website was a single-page template with a PDF menu. They couldn\'t take reservations online, had no way to promote their wine events, and their private dining inquiry process was a nightmare of back-and-forth emails.',
    solution: 'We created an immersive dining website with real-time reservation integration, a searchable wine list with sommelier notes, event ticketing for tastings, and a streamlined private event inquiry system with automated follow-ups.',
    results: [
      '280% increase in online reservations',
      'Private dining inquiries increased 520%',
      'Wine club memberships grew 340% with new sign-up flow',
      'Event ticket sales: $45,000 in first 3 months',
      'Email list grew from 800 to 4,200 subscribers',
      'Average check increased 15% from wine pairing suggestions',
    ],
    technologies: ['Next.js', 'OpenTable API', 'Tock Reservations', 'Square POS Integration', 'Mailchimp', 'Instagram Feed API'],
    testimonial: {
      text: 'Our website now reflects what we actually are—a serious wine destination with exceptional food. Private dining went from 2-3 inquiries a month to 15+, and we\'re selling out wine events in hours instead of struggling to fill seats.',
      author: 'Chef Michael Antonelli',
      role: 'Executive Chef & Partner, Terroir',
    },
    screenshots: ['/portfolio/terroir-hero.jpg', '/portfolio/terroir-wine.jpg', '/portfolio/terroir-events.jpg'],
    beforeImage: '/portfolio/terroir-before.jpg',
    afterImage: '/portfolio/terroir-after.jpg',
    url: 'https://terroirwinebar.example.com',
  },

  // ============================================================================
  // Real Estate
  // ============================================================================
  {
    id: 'blackstone-realty-group',
    name: 'Blackstone Realty Group',
    category: 'Real Estate',
    gradient: 'from-emerald-500 to-green-700',
    icon: '🏠',
    increase: '+340%',
    description: 'Boutique luxury real estate brokerage specializing in waterfront and estate properties in South Florida.',
    shortDescription: 'Luxury property showcase for an elite real estate team.',
    challenge: 'Blackstone agents were losing $10M+ listings to competitors because their website looked like a generic template. High-net-worth clients expect a digital experience that matches the properties being sold. Their IDX integration was slow, mobile experience was broken, and there was no way to showcase their market expertise.',
    solution: 'We built a cinematic property showcase with 4K video tours, neighborhood guides with market data, a VIP client portal for off-market listings, and agent profiles that position them as market experts. The design screams luxury without sacrificing speed.',
    results: [
      '340% increase in seller lead inquiries',
      'Average listing price of web leads: $3.2M vs $1.8M from referrals',
      'Property page engagement time: 6.4 minutes average',
      'Video tour completion rate: 72%',
      'Exclusive listing sign-ups increased 890%',
      'Agent recruitment inquiries increased 240%',
    ],
    technologies: ['Next.js', 'MLS RESO API', 'Matterport 3D Integration', 'Luxury Presence IDX', 'HubSpot CRM', 'Cloudinary Video'],
    testimonial: {
      text: 'When you\'re asking someone to trust you with a $15 million sale, your website matters. We\'ve won three listings in the past month specifically because sellers said our online presence gave them confidence. That\'s over $40 million in inventory.',
      author: 'Victoria Blackstone',
      role: 'Broker/Owner, Blackstone Realty Group',
    },
    screenshots: ['/portfolio/blackstone-hero.jpg', '/portfolio/blackstone-listing.jpg', '/portfolio/blackstone-agent.jpg'],
    beforeImage: '/portfolio/blackstone-before.jpg',
    afterImage: '/portfolio/blackstone-after.jpg',
    url: 'https://blackstonerealty.example.com',
  },

  // ============================================================================
  // Fitness & Wellness
  // ============================================================================
  {
    id: 'momentum-performance-lab',
    name: 'Momentum Performance Lab',
    category: 'Fitness',
    gradient: 'from-violet-500 to-purple-700',
    icon: '🏋️',
    increase: '+395%',
    description: 'Elite training facility combining sports science, physical therapy, and personalized coaching for athletes and executives.',
    shortDescription: 'Membership platform for a premium performance training facility.',
    challenge: 'Momentum was using a generic gym website template that made them look like a budget fitness center. Their $300/month memberships required in-person sales because the website couldn\'t communicate their differentiated value. Class booking was done via email, and they had no way to showcase their elite coaching staff\'s credentials.',
    solution: 'We built a performance-focused platform with detailed coach profiles, assessment scheduling, on-demand video library access, progress tracking dashboards, and a streamlined membership signup that communicates value before price.',
    results: [
      '395% increase in membership inquiries',
      'Online membership signups: 45% of new members (was 0%)',
      'Average member lifetime value increased 28%',
      'Class booking time reduced from 24 hours to instant',
      'Corporate wellness RFPs increased 600%',
      'On-demand content engagement: 3.2 hours/member/month',
    ],
    technologies: ['Next.js', 'MindBody API', 'Stripe Subscriptions', 'Vimeo OTT', 'TrainerPulse Integration', 'Intercom'],
    testimonial: {
      text: 'Our old site made us look like any other gym. Now prospects understand immediately why we charge what we do. We\'re attracting the right clients—executives and serious athletes who value results over price. The corporate wellness inquiries alone have been game-changing.',
      author: 'Dr. Amanda Torres',
      role: 'Founder & Performance Director, Momentum',
    },
    screenshots: ['/portfolio/momentum-hero.jpg', '/portfolio/momentum-coaching.jpg', '/portfolio/momentum-dashboard.jpg'],
    beforeImage: '/portfolio/momentum-before.jpg',
    afterImage: '/portfolio/momentum-after.jpg',
    url: 'https://momentumperformancelab.example.com',
  },

  // ============================================================================
  // Education / Coaching
  // ============================================================================
  {
    id: 'catalyst-leadership-institute',
    name: 'Catalyst Leadership Institute',
    category: 'Education',
    gradient: 'from-yellow-500 to-amber-600',
    icon: '🎓',
    increase: '+510%',
    description: 'Executive coaching and leadership development firm offering customized programs for Fortune 1000 companies.',
    shortDescription: 'Thought leadership platform for an executive coaching firm.',
    challenge: 'Catalyst had trained executives at Google, Microsoft, and Tesla, but their website was an embarrassing WordPress theme from 2012. They were competing for six-figure corporate contracts with a site that looked like a life coach\'s hobby project. Case studies were in downloadable Word documents.',
    solution: 'We created a premium B2B platform with video case studies, an executive assessment tool, program comparison features, and a sophisticated lead nurturing system. The design positions them alongside McKinsey and Deloitte, where they belong.',
    results: [
      '510% increase in enterprise RFP submissions',
      'Average program value of web leads: $340,000',
      'Assessment tool generated 1,200 executive profiles',
      'Speaking engagement requests increased 380%',
      'LinkedIn referral traffic up 720%',
      'Time to proposal request reduced from 3+ calls to 1',
    ],
    technologies: ['Next.js', 'Salesforce Integration', 'Typeform Assessments', 'Wistia Video', 'Contentful CMS', 'Drift Chatbot'],
    testimonial: {
      text: 'We were the best-kept secret in executive development. Now when a CHRO lands on our site, they see a firm that matches their company\'s caliber. We\'ve closed three Fortune 500 contracts directly attributed to the new website.',
      author: 'Dr. Robert Kim',
      role: 'Founder & CEO, Catalyst Leadership Institute',
    },
    screenshots: ['/portfolio/catalyst-hero.jpg', '/portfolio/catalyst-programs.jpg', '/portfolio/catalyst-assessment.jpg'],
    beforeImage: '/portfolio/catalyst-before.jpg',
    afterImage: '/portfolio/catalyst-after.jpg',
    url: 'https://catalystleadership.example.com',
  },

  // ============================================================================
  // Manufacturing / Industrial
  // ============================================================================
  {
    id: 'precision-dynamics-manufacturing',
    name: 'Precision Dynamics Manufacturing',
    category: 'Manufacturing',
    gradient: 'from-zinc-500 to-neutral-700',
    icon: '⚙️',
    increase: '+275%',
    description: 'ISO-certified precision machining company producing aerospace, medical device, and defense components.',
    shortDescription: 'B2B lead generation for a precision manufacturing company.',
    challenge: 'Precision Dynamics was losing contracts to overseas competitors because their website didn\'t communicate their advanced capabilities. Engineers couldn\'t find tolerance specifications, certifications were buried, and there was no way to request quotes without calling during business hours. Meanwhile, their facility was state-of-the-art.',
    solution: 'We built a capabilities-focused industrial website with detailed machine specifications, interactive tolerance calculators, certification verification, and an intelligent RFQ system that qualifies leads before routing to sales.',
    results: [
      '275% increase in qualified RFQ submissions',
      'Average quote value increased from $45K to $120K',
      'International inquiry rate: 0% to 15%',
      'Time to first response reduced from 48 hours to 4 hours',
      'Engineering specification downloads: 2,400/month',
      'Certification verification requests: 180/month',
    ],
    technologies: ['Next.js', 'Epicor ERP Integration', 'DocuSign for NDAs', 'CAD File Viewer', 'HubSpot CRM', 'Cloudinary DAM'],
    testimonial: {
      text: 'Our old website was literally losing us business. An engineer at Northrop Grumman told us they almost didn\'t reach out because our site made us look like a garage shop. Now the website sells our capabilities better than our sales team.',
      author: 'Michael Reeves',
      role: 'VP of Business Development, Precision Dynamics',
    },
    screenshots: ['/portfolio/precision-hero.jpg', '/portfolio/precision-capabilities.jpg', '/portfolio/precision-rfq.jpg'],
    beforeImage: '/portfolio/precision-before.jpg',
    afterImage: '/portfolio/precision-after.jpg',
    url: 'https://precisiondynamics.example.com',
  },

  // ============================================================================
  // Nonprofit
  // ============================================================================
  {
    id: 'harbor-hope-foundation',
    name: 'Harbor Hope Foundation',
    category: 'Nonprofit',
    gradient: 'from-sky-400 to-blue-600',
    icon: '💙',
    increase: '+620%',
    description: 'Youth mentorship and education nonprofit providing after-school programs and scholarships to underserved communities.',
    shortDescription: 'Donation platform for a youth education nonprofit.',
    challenge: 'Harbor Hope was doing incredible work but their donation page converted at 0.8%. Major donors were writing checks instead of donating online because the experience felt unsafe. They couldn\'t communicate impact effectively, and recurring donations were almost non-existent.',
    solution: 'We built an emotionally compelling platform with real student success stories, transparent impact metrics, multiple donation tiers with tangible outcomes, and a streamlined recurring giving program. Corporate sponsorship packages are now self-service.',
    results: [
      '620% increase in online donations',
      'Recurring donor rate: 5% to 34%',
      'Average donation increased from $45 to $125',
      'Corporate sponsorship inquiries up 450%',
      'Volunteer applications increased 380%',
      'Email open rates improved from 12% to 38%',
    ],
    technologies: ['Next.js', 'Stripe Donations', 'Bloomerang CRM', 'Impact Dashboard', 'Mailchimp Integration', 'Volunteer Management System'],
    testimonial: {
      text: 'Every dollar we spent on the new website has come back tenfold. Donors can finally see exactly where their money goes. Our year-end campaign raised more in one month than the previous site raised in two years.',
      author: 'Maria Santos',
      role: 'Executive Director, Harbor Hope Foundation',
    },
    screenshots: ['/portfolio/harbor-hope-hero.jpg', '/portfolio/harbor-hope-impact.jpg', '/portfolio/harbor-hope-donate.jpg'],
    beforeImage: '/portfolio/harbor-hope-before.jpg',
    afterImage: '/portfolio/harbor-hope-after.jpg',
    url: 'https://harborhope.example.com',
  },

  // ============================================================================
  // SaaS / Technology
  // ============================================================================
  {
    id: 'clearview-analytics',
    name: 'ClearView Analytics',
    category: 'SaaS',
    gradient: 'from-cyan-400 to-blue-600',
    icon: '📈',
    increase: '+445%',
    description: 'Business intelligence platform providing real-time analytics and reporting for e-commerce brands.',
    shortDescription: 'Product marketing site for a B2B analytics platform.',
    challenge: 'ClearView had a superior product but a website that looked like a developer\'s side project. Their competitor with an inferior product was winning deals because their marketing site was slick. Free trial signups were low, and enterprise demos were almost non-existent.',
    solution: 'We created a product-led growth website with interactive demos, transparent pricing, self-service trial signup, and integration documentation. The design communicates enterprise-ready while the UX supports a PLG motion.',
    results: [
      '445% increase in free trial signups',
      'Trial-to-paid conversion improved from 8% to 22%',
      'Enterprise demo requests up 380%',
      'Time-to-first-value reduced from 3 days to 20 minutes',
      'Documentation page views: 45,000/month',
      'G2 profile traffic increased 290%',
    ],
    technologies: ['Next.js', 'Framer Motion', 'Stripe Billing', 'Segment', 'Intercom', 'ReadMe Documentation'],
    testimonial: {
      text: 'We were losing to competitors we knew we were better than. The new website lets our product speak for itself. Enterprise buyers now come to demos already sold on our capabilities. Our pipeline has never been healthier.',
      author: 'Sarah Chen',
      role: 'Co-Founder & CEO, ClearView Analytics',
    },
    screenshots: ['/portfolio/clearview-hero.jpg', '/portfolio/clearview-features.jpg', '/portfolio/clearview-pricing.jpg'],
    beforeImage: '/portfolio/clearview-before.jpg',
    afterImage: '/portfolio/clearview-after.jpg',
    url: 'https://clearviewanalytics.example.com',
  },
];

// ============================================================================
// Industry Categories for Filtering
// ============================================================================
export const projectCategories = [
  { id: 'all', label: 'All Industries' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'legal-services', label: 'Legal Services' },
  { id: 'e-commerce', label: 'E-Commerce' },
  { id: 'b2b-services', label: 'B2B Services' },
  { id: 'home-services', label: 'Home Services' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'education', label: 'Education' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'nonprofit', label: 'Nonprofit' },
  { id: 'saas', label: 'SaaS' },
];

// ============================================================================
// Featured Projects (for homepage/highlights)
// ============================================================================
export const featuredProjects = projectsData.slice(0, 6);

// ============================================================================
// Project Stats Summary
// ============================================================================
export const portfolioStats = {
  totalProjects: '2,500+',
  averageIncrease: '340%',
  clientSatisfaction: '4.9/5',
  averageDelivery: '14 Days',
  totalRevenue: '$50M+',
  industries: '25+',
};
