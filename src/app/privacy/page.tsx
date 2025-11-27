import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect and use your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 mesh-gradient" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="glow" size="md" className="mb-6">
            Legal
          </Badge>
          <h1 className="text-display-lg font-bold text-white mb-6">
            Privacy <GradientText>Policy</GradientText>
          </h1>
          <p className="text-white/60">
            Last updated: January 1, 2024
          </p>
        </div>
      </section>

      <section className="relative py-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="text-white/70 mb-6">
              We collect information you provide directly to us, such as when you create an account,
              make a purchase, or contact us for support. This may include your name, email address,
              phone number, and billing information.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-white/70 mb-6">
              We use the information we collect to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and respond
              to your comments and questions.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
            <p className="text-white/70 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy or as required by law.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-white/70 mb-6">
              We take reasonable measures to help protect your personal information from loss, theft,
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies</h2>
            <p className="text-white/70 mb-6">
              We use cookies and similar tracking technologies to track activity on our website and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
            <p className="text-white/70 mb-6">
              You have the right to access, correct, or delete your personal information. You can also
              object to or restrict certain processing of your information.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p className="text-white/70 mb-6">
              If you have any questions about this Privacy Policy, please contact us at
              privacy@websitesformorons.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
