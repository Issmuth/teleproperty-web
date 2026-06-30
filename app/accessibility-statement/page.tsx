'use client';

import { useTheme } from '@/lib/theme/theme-provider';
import { CheckCircle, ExternalLink } from 'lucide-react';

export default function AccessibilityStatementPage() {
  const { colors } = useTheme();

  return (
    <div className="flex-1" style={{ backgroundColor: colors.background }}>
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 lg:py-12 pb-32">
        <h1 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: colors.text }}>
          Accessibility Statement
        </h1>
        
        <p className="text-base lg:text-lg mb-8" style={{ color: colors.textMuted }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="space-y-8">
          {/* Commitment Section */}
          <section aria-labelledby="commitment">
            <h2 id="commitment" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Our Commitment
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              TeleProperty is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>
          </section>

          {/* Standards Section */}
          <section aria-labelledby="standards">
            <h2 id="standards" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Conformance Status
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
              developers to improve accessibility for people with disabilities. It defines three levels 
              of conformance: Level A, Level AA, and Level AAA.
            </p>
            <div 
              className="flex items-start gap-3 p-4 rounded-xl border mb-4"
              style={{ backgroundColor: colors.surfaceAccent, borderColor: colors.activeBorder }}
            >
              <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-black text-base mb-2" style={{ color: colors.text }}>
                  WCAG 2.1 Level AA Compliant
                </p>
                <p className="text-sm" style={{ color: colors.text }}>
                  TeleProperty is fully conformant with WCAG 2.1 Level AA standards. This means our 
                  website meets all Level A and Level AA success criteria.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features">
            <h2 id="features" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Accessibility Features
            </h2>
            <div className="grid gap-4 mb-4">
              {[
                {
                  title: 'Keyboard Navigation',
                  description: 'Full keyboard access to all features without requiring a mouse',
                },
                {
                  title: 'Screen Reader Support',
                  description: 'Compatible with NVDA, JAWS, VoiceOver, and other screen readers',
                },
                {
                  title: 'Skip Links',
                  description: 'Quick navigation to main content areas',
                },
                {
                  title: 'ARIA Landmarks',
                  description: 'Proper semantic structure for easy navigation',
                },
                {
                  title: 'Form Labels',
                  description: 'All form inputs have clear, descriptive labels',
                },
                {
                  title: 'Color Contrast',
                  description: 'Text meets WCAG AA contrast ratio requirements (4.5:1 minimum)',
                },
                {
                  title: 'Focus Indicators',
                  description: 'Visible focus indicators on all interactive elements',
                },
                {
                  title: 'Alt Text',
                  description: 'Descriptive alternative text for all images',
                },
                {
                  title: 'Responsive Design',
                  description: 'Works on all devices and screen sizes',
                },
                {
                  title: 'Reduced Motion',
                  description: 'Respects prefers-reduced-motion system settings',
                },
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl border"
                  style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                >
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: colors.text }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textMuted }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testing Section */}
          <section aria-labelledby="testing">
            <h2 id="testing" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Testing & Evaluation
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              TeleProperty has been tested using the following methods:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'Automated testing with axe DevTools',
                'Manual keyboard navigation testing',
                'Screen reader testing (NVDA, VoiceOver)',
                'Color contrast analysis',
                'Mobile device testing',
                'Browser compatibility testing',
              ].map((method, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: colors.text }}
                >
                  <span className="text-green-600 font-bold" aria-hidden="true">•</span>
                  {method}
                </li>
              ))}
            </ul>
          </section>

          {/* Known Issues Section */}
          <section aria-labelledby="known-issues">
            <h2 id="known-issues" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Known Limitations
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              We are aware of the following limitations and are actively working to address them:
            </p>
            <ul className="space-y-2 mb-4">
              <li 
                className="flex items-start gap-2 text-sm"
                style={{ color: colors.text }}
              >
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Some third-party map integrations may have limited accessibility features
              </li>
              <li 
                className="flex items-start gap-2 text-sm"
                style={{ color: colors.text }}
              >
                <span className="text-amber-600 font-bold" aria-hidden="true">•</span>
                Image galleries may require additional keyboard shortcuts for optimal navigation
              </li>
            </ul>
          </section>

          {/* Feedback Section */}
          <section aria-labelledby="feedback">
            <h2 id="feedback" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Feedback & Contact
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              We welcome your feedback on the accessibility of TeleProperty. Please let us know if you 
              encounter accessibility barriers:
            </p>
            <div 
              className="p-4 rounded-xl border"
              style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            >
              <p className="font-bold text-sm mb-2" style={{ color: colors.text }}>
                Contact Information:
              </p>
              <ul className="space-y-1">
                <li className="text-sm" style={{ color: colors.text }}>
                  <span className="font-semibold">Email:</span> accessibility@teleproperty.et
                </li>
                <li className="text-sm" style={{ color: colors.text }}>
                  <span className="font-semibold">Phone:</span> +251-XXX-XXXX
                </li>
              </ul>
            </div>
            <p className="text-sm mt-4" style={{ color: colors.textMuted }}>
              We try to respond to accessibility feedback within 2 business days.
            </p>
          </section>

          {/* Technical Specs Section */}
          <section aria-labelledby="technical">
            <h2 id="technical" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Technical Specifications
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              Accessibility of TeleProperty relies on the following technologies:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                'HTML5',
                'CSS3',
                'JavaScript',
                'WAI-ARIA',
                'React / Next.js',
              ].map((tech, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: colors.text }}
                >
                  <span className="text-green-600 font-bold" aria-hidden="true">•</span>
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          {/* Resources Section */}
          <section aria-labelledby="resources">
            <h2 id="resources" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Additional Resources
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: 'Keyboard Shortcuts Guide',
                  link: '/keyboard-shortcuts',
                  internal: true,
                },
                {
                  title: 'WCAG 2.1 Guidelines',
                  link: 'https://www.w3.org/WAI/WCAG21/quickref/',
                  internal: false,
                },
                {
                  title: 'WebAIM Resources',
                  link: 'https://webaim.org/',
                  internal: false,
                },
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  target={resource.internal ? '_self' : '_blank'}
                  rel={resource.internal ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-2 text-sm font-semibold hover:underline"
                  style={{ color: colors.activeText }}
                >
                  {resource.title}
                  {!resource.internal && (
                    <ExternalLink size={14} aria-label="(opens in new window)" />
                  )}
                </a>
              ))}
            </div>
          </section>

          {/* Formal Complaints Section */}
          <section aria-labelledby="complaints">
            <h2 id="complaints" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Formal Complaints
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              If you are not satisfied with our response to your accessibility concern, you may file a 
              formal complaint with the appropriate regulatory authority in your jurisdiction.
            </p>
          </section>

          {/* Assessment Section */}
          <section aria-labelledby="assessment">
            <h2 id="assessment" className="text-xl lg:text-2xl font-black mb-4" style={{ color: colors.text }}>
              Assessment Approach
            </h2>
            <p className="text-base mb-4" style={{ color: colors.text }}>
              TeleProperty assessed the accessibility of this website by the following approaches:
            </p>
            <ul className="space-y-2">
              <li className="text-sm" style={{ color: colors.text }}>
                <span className="font-semibold">Self-evaluation:</span> Internal accessibility team review
              </li>
              <li className="text-sm" style={{ color: colors.text }}>
                <span className="font-semibold">Automated tools:</span> axe DevTools, Lighthouse
              </li>
              <li className="text-sm" style={{ color: colors.text }}>
                <span className="font-semibold">Manual testing:</span> Keyboard navigation and screen reader testing
              </li>
            </ul>
          </section>

          {/* Date Section */}
          <section 
            className="p-4 rounded-xl border text-center"
            style={{ backgroundColor: colors.surfaceMuted, borderColor: colors.border }}
          >
            <p className="text-xs font-semibold" style={{ color: colors.textMuted }}>
              This statement was created on {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })} and is reviewed quarterly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
