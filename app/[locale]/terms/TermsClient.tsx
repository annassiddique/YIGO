"use client";

import React from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";

export default function TermsClient() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHero title="TERMS & CONDITIONS" />

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Introduction
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                Welcome to Yangtze International Real Estate Development L.L.C
                (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;,
                &quot;us&quot;). These Terms & Conditions govern your access to
                and use of www.yigogroup.ae (the &quot;Website&quot;). By
                accessing or using the Website, you agree to comply with these
                Terms and all applicable UAE laws and regulations.
              </p>
            </div>

            {/* Company Information */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Company Information
              </h2>
              <div className="space-y-2 text-neutral-700">
                <p>
                  <strong>Legal Name:</strong> Yangtze International Real Estate
                  Development L.L.C
                </p>
                <p>
                  <strong>Trade Name (Arabic):</strong>
                </p>
                <p>
                  <strong>License Number:</strong> 1493438
                </p>
                <p>
                  <strong>Trade License Issued By:</strong> Government of Dubai,
                  Department of Economic Development
                </p>
                <p>
                  <strong>TRN:</strong> 104966402000003
                </p>
                <p>
                  <strong>Address:</strong> 905, Court Tower, Dubai, UAE
                </p>
                <p>
                  <strong>Jurisdiction:</strong> Dubai, United Arab Emirates
                </p>
              </div>
            </div>

            {/* Scope of Use */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Scope of Use
              </h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    The Website is intended to provide general information about
                    our real estate developments.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You must not use the Website for unlawful, fraudulent,
                    defamatory, or harmful purposes.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You agree not to attempt to gain unauthorised access to the
                    Website, its servers, or associated networks.
                  </span>
                </li>
              </ul>
            </div>

            {/* Intellectual Property Rights */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Intellectual Property Rights
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                All Website content, including text, graphics, images, videos,
                and logos, is the property of Yangtze International Real Estate
                Development L.L.C and protected by UAE copyright and trademark
                laws. You may not reproduce, distribute, or modify any material
                without prior written consent.
              </p>
            </div>

            {/* Project Information and Accuracy */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Project Information and Accuracy
              </h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Project details, visuals, and plans displayed on this
                    Website are for illustration purposes only and are subject
                    to change without notice.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    All real estate project sales will be conducted in
                    accordance with applicable Dubai Land Department
                    regulations, and final terms will be as per the signed Sale
                    and Purchase Agreement (SPA).
                  </span>
                </li>
              </ul>
            </div>

            {/* No Online Payments */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                No Online Payments
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                This Website does not facilitate or accept online payments. All
                transactions are processed offline and subject to separate
                contractual documentation.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Third-Party Links
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                The Website may contain links to third-party websites. We are
                not responsible for their content, security, or privacy
                practices.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Limitation of Liability
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                To the maximum extent permitted under UAE law, we are not liable
                for any loss, damage, or expense arising from your use or
                inability to use the Website.
              </p>
            </div>

            {/* Governing Law & Dispute Resolution */}
            <div className="mb-10">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Governing Law & Dispute Resolution
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                These Terms are governed by the laws of the Emirate of Dubai and
                the applicable laws of the UAE. Any dispute shall be subject to
                the exclusive jurisdiction of the Dubai Courts.
              </p>
            </div>

            {/* Contact */}
            <div className="mb-16">
              <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                Contact
              </h2>
              <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                Email:{" "}
                <a
                  href="mailto:info@yigogroup.com"
                  className="text-neutral-900 hover:underline"
                >
                  info@yigogroup.com
                </a>
              </p>
            </div>

            {/* Privacy Policy Section */}
            <div className="border-t border-neutral-200 pt-16">
              <h1 className="font-heading text-5xl lg:text-6xl font-light mb-10 text-neutral-900">
                PRIVACY POLICY
              </h1>

              {/* Privacy Introduction */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Introduction
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We are committed to protecting your privacy in line with the
                  UAE Personal Data Protection Law (PDPL). This Privacy Policy
                  explains how we collect, store, use, and share your data when
                  you use our Website.
                </p>
              </div>

              {/* Data We Collect */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Data We Collect
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We may collect:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Name, email address, and phone number when you submit an
                      inquiry
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Browser and device information (via cookies and analytics
                      tools)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>IP address for security and analytics purposes</span>
                  </li>
                </ul>
              </div>

              {/* How We Use Your Data */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  How We Use Your Data
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We may use your personal data to:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Respond to inquiries and provide requested information
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Share your contact details with authorised brokers for
                      follow-up
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Send marketing communications about our projects (with
                      opt-out option)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Improve Website functionality and user experience
                    </span>
                  </li>
                </ul>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Cookies and Tracking
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We use cookies, Google Analytics, and similar tools to enhance
                  the Website. You can disable cookies in your browser settings,
                  but this may affect your browsing experience.
                </p>
              </div>

              {/* Data Sharing */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Data Sharing
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We may share data with:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      Authorised real estate brokers and marketing agents
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>IT service providers and cloud hosting services</span>
                  </li>
                </ul>
                <p className="font-body text-base text-neutral-700 mt-4 leading-relaxed">
                  We do not sell your personal data to third parties.
                </p>
              </div>

              {/* Data Storage and Security */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Data Storage and Security
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  Your data is stored in secure UAE-based servers and approved
                  cloud providers. We take reasonable measures to protect data
                  from loss, misuse, and unauthorised access.
                </p>
              </div>

              {/* Your Rights */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Your Rights
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  Under UAE PDPL, you can request to:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Correct or delete your data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Withdraw consent for marketing communications</span>
                  </li>
                </ul>
              </div>

              {/* Changes to This Policy */}
              <div className="mb-10">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Changes to This Policy
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  We may update this Privacy Policy periodically. The revised
                  policy will be posted on this page with a new &quot;Last
                  Updated&quot; date.
                </p>
              </div>

              {/* Contact Us */}
              <div className="mb-16">
                <h2 className="font-heading text-3xl font-light mb-6 text-neutral-900">
                  Contact Us
                </h2>
                <p className="font-body text-base text-neutral-700 mb-4 leading-relaxed">
                  Email:{" "}
                  <a
                    href="mailto:info@yigogroup.com"
                    className="text-neutral-900 hover:underline"
                  >
                    info@yigogroup.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
