import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { GradientText } from '@/components/ui/GradientText';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using WebsitesForMorons.com services.',
};

export default function TermsPage() {
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
            Terms of <GradientText>Service</GradientText>
          </h1>
          <p className="text-white/60">
            Last updated: January 1, 2024
          </p>
        </div>
      </section>

      <section className="relative py-16 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-white/70 mb-6">
              By accessing or using our services, you agree to be bound by these Terms of Service.
              If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. Services Description</h2>
            <p className="text-white/70 mb-6">
              WebsitesForMorons.com provides web design, development, and related digital services.
              We reserve the right to modify, suspend, or discontinue any part of our services at
              any time without prior notice.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">3. Client Responsibilities</h2>
            <p className="text-white/70 mb-6">
              Clients are responsible for providing accurate information, timely feedback, and all
              content (text, images, logos) needed for their project. Delays in providing materials
              may affect project timelines.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Terms</h2>
            <p className="text-white/70 mb-6">
              A 50% deposit is required before work begins. The remaining balance is due upon project
              completion, before the final handover. We accept major credit cards, PayPal, and bank
              transfers. All prices are in USD unless otherwise specified.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="text-white/70 mb-6">
              Upon full payment, clients receive full ownership of the custom design and code created
              for their project. We retain the right to showcase completed work in our portfolio unless
              otherwise agreed in writing.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Revisions and Changes</h2>
            <p className="text-white/70 mb-6">
              Our packages include a specified number of revision rounds. Additional revisions beyond
              the included amount will be billed at our hourly rate. Major scope changes may require
              a new project agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Project Timeline</h2>
            <p className="text-white/70 mb-6">
              Estimated timelines are provided at project start. We strive to meet all deadlines but
              are not liable for delays caused by client feedback delays, third-party services, or
              circumstances beyond our control.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-white/70 mb-6">
              WebsitesForMorons.com shall not be liable for any indirect, incidental, special, or
              consequential damages resulting from the use or inability to use our services. Our
              total liability shall not exceed the amount paid for the specific service in question.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">9. Warranties and Disclaimers</h2>
            <p className="text-white/70 mb-6">
              We provide a 30-day warranty on all completed work for bug fixes related to our code.
              We do not guarantee specific business results such as traffic increases or conversion
              rates, as these depend on many factors outside our control.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">10. Cancellation and Refunds</h2>
            <p className="text-white/70 mb-6">
              Clients may cancel at any time. Refunds are prorated based on work completed. The
              initial deposit is non-refundable once work has begun. Completed work up to the
              cancellation date remains the property of the client upon payment.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p className="text-white/70 mb-6">
              These terms shall be governed by and construed in accordance with the laws of the
              State of California, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p className="text-white/70 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting to our website. Your continued use of our services after
              changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
            <p className="text-white/70 mb-6">
              For questions about these Terms of Service, please contact us at
              legal@websitesformorons.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
