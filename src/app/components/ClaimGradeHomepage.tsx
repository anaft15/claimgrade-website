import { ArrowRight, Upload, CheckSquare, BarChart3 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import shieldLogo from '@/assets/shield-logo.png';

import React, { useState } from 'react';

export function ClaimGradeHomepage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    practiceName: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const portalId = '244902496';
    const formId = '1ff0d028-4711-4101-a88b-68bee47292a2';

    const payload = {
      fields: [
        { name: 'firstname', value: formData.firstName },
        { name: 'lastname', value: formData.lastName },
        { name: 'email', value: formData.email },
        { name: 'company', value: formData.practiceName }
      ],
      context: {
        pageUri: window.location.href,
        pageName: 'ClaimGrade Waitlist'
      }
    };

    try {
      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {
        setFormStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', practiceName: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <header 
        className="py-6 sticky top-0 z-50"
        style={{ backgroundColor: '#041e42' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={shieldLogo}
              alt="ClaimGrade"
              className="h-10 w-auto"
            />
            <span
              className="text-2xl tracking-wide"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '700',
                letterSpacing: '0.5px',
                color: '#f8f7eb'
              }}
            >
              ClaimGrade
            </span>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-6">
            <button
              className="uppercase text-white transition-opacity hover:opacity-80"
              style={{ 
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              Login
            </button>
            <a
              href="#waitlist"
              className="px-6 py-3 rounded-full uppercase transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: '#f8f7eb',
                color: '#041e42',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              Sign Up For Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-20 pb-56 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #041e42 0%, #0a2a52 40%, #061f3d 100%)' }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px'
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(248,247,235,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Accent glow behind headline */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(248,247,235,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">

          <h1
            className="text-7xl uppercase mb-8 leading-none hero-headline"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: '900',
              letterSpacing: '-1px'
            }}
          >
            <div className="text-white hero-line-1">AUTONOMOUSLY REVIEW</div>
            <div className="inline-block relative mt-2 hero-line-2">
              <div
                className="absolute inset-0 -inset-x-4 -inset-y-2"
                style={{ backgroundColor: '#f8f7eb', zIndex: -1 }}
              />
              <span style={{ color: '#041e42' }}>CHART NOTES</span>
            </div>
          </h1>

          <p className="text-white/80 mx-auto mb-10 text-lg hero-subtext" style={{ maxWidth: '605px' }}>
            A tool purpose-built to review clinical documentation for policy compliance and accuracy – it's like having an expert looking over your shoulder.
          </p>

          <div className="flex gap-4 justify-center hero-ctas">
            <a
              href="#how-it-works"
              className="group px-8 py-4 rounded-full uppercase transition-all duration-300 hover:shadow-lg hover:shadow-[#f8f7eb]/10 hover:scale-[1.02]"
              style={{
                backgroundColor: '#f8f7eb',
                color: '#041e42',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              See how it works
            </a>
            <a
              href="#waitlist"
              className="px-8 py-4 rounded-full uppercase transition-all duration-300 hover:scale-[1.02]"
              style={{
                color: '#f8f7eb',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '700',
                letterSpacing: '1px',
                border: '1px solid rgba(248,247,235,0.3)',
                background: 'rgba(248,247,235,0.05)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Sign up for waitlist
            </a>
          </div>
        </div>

        {/* Subtle edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)'
          }}
        />
      </section>

      {/* Floating Product Preview - Realistic Screenshot */}
      <section className="relative -mt-40 mb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Browser Chrome */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>

            {/* GIF Content */}
            <img 
              src="/media/hero-demo.gif" 
              alt="ClaimGrade product demo"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 mb-16">
            <h2
              className="text-7xl uppercase leading-none"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '900',
                letterSpacing: '-1px'
              }}
            >
              <div style={{ color: '#041e42' }}>THREE SIMPLE</div>
              <div className="inline-block relative mt-2">
                <div
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#f8f7eb', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#041e42' }}>STEPS TO VALIDATE</span>
              </div>
              <br />
              <div className="inline-block relative mt-2">
                <div
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#f8f7eb', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#041e42' }}>CHART NOTES</span>
              </div>
            </h2>
          </div>

          {/* Vertical Stack of Steps */}
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Left - Text (2 columns) */}
              <div className="md:col-span-2">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold mb-6"
                  style={{ backgroundColor: '#f8f7eb', color: '#041e42' }}
                >
                  01
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: '700',
                    color: '#041e42',
                  }}
                >
                  UPLOAD CHART NOTE
                </h3>
                <p className="text-lg" style={{ color: '#4a5568' }}>
                  Drop your clinical notes PDF into ClaimGrade. Our system securely processes your documentation in seconds.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step1-upload.gif"

                  alt="Upload your clinical documentation"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Left - Text (2 columns) */}
              <div className="md:col-span-2">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold mb-6"
                  style={{ backgroundColor: '#f8f7eb', color: '#041e42' }}
                >
                  02
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: '700',
                    color: '#041e42',
                  }}
                >
                  SELECT CODES FOR ANALYSIS
                </h3>
                <p className="text-lg" style={{ color: '#4a5568' }}>
                  Choose the insurance codes you plan to use for billing. We'll analyze your documentation against each code's requirements.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step2-codes.gif"

                  alt="Select insurance codes for analysis"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Left - Text (2 columns) */}
              <div className="md:col-span-2">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold mb-6"
                  style={{ backgroundColor: '#f8f7eb', color: '#041e42' }}
                >
                  03
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontWeight: '700',
                    color: '#041e42',
                  }}
                >
                  REVIEW RESULTS
                </h3>
                <p className="text-lg" style={{ color: '#4a5568' }}>
                  Get instant, detailed feedback showing what's documented correctly and what's missing. Know exactly how to fix it.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step3-results.gif"

                  alt="Review your documentation grading results"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Breakdown Section */}
      <section className="py-20" style={{ backgroundColor: '#041e42' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 mb-8">
            <h2
              className="text-7xl uppercase leading-none"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: '900',
                letterSpacing: '-1px'
              }}
            >
              <div className="text-white">CRYSTAL CLEAR</div>
              <div className="inline-block relative mt-2">
                <div
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#f8f7eb', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#041e42' }}>ANALYSIS &</span>
              </div>
              <br />
              <div className="inline-block relative mt-2">
                <div
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#f8f7eb', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#041e42' }}>FEEDBACK</span>
              </div>
            </h2>
          </div>

          <p className="text-center text-white text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Every insurance code comes with specific documentation requirements—miss just one, and you risk denial or audit. ClaimGrade meticulously cross-references your clinical notes against each criterion, pinpointing exactly where your documentation is strong and where it needs reinforcement. Know your weak points before the insurance company does, and submit with confidence every time.
          </p>

          {/* Code Analysis Screenshot Preview */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Browser Chrome */}
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded-lg px-4 py-1 text-xs text-gray-500 border border-gray-200">
                    claimgrade.app/analysis
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <img 
                src="/media/codescreenshot.png" 
                alt="ClaimGrade code analysis interface showing detailed documentation feedback"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="py-20" style={{ backgroundColor: '#f8f7eb' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Header & Copy */}
            <div className="text-center">
              <h2 
                className="text-7xl uppercase leading-none mb-6"
                style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontWeight: '900',
                  letterSpacing: '-1px'
                }}
              >
                <div style={{ color: '#041e42' }}>JOIN THE</div>
                <div className="inline-block relative mt-2">
                  <div 
                    className="absolute inset-0 -inset-x-4 -inset-y-2"
                    style={{ backgroundColor: '#041e42', zIndex: 0 }}
                  />
                  <span className="relative z-10 text-white">WAITLIST</span>
                </div>
              </h2>
              
              <p className="text-lg leading-relaxed" style={{ color: '#041e42' }}>
                ClaimGrade is currently in beta, and we're selectively partnering with a limited number of facilities across the country to fine-tune our analysis and ensure maximum accuracy. Request early access to be among the first to experience documentation review that actually works.
              </p>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {formStatus === 'success' ? (
                <div className="p-8 text-center">
                  <h3 
                    className="text-2xl uppercase mb-2"
                    style={{ 
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: '700',
                      color: '#041e42'
                    }}
                  >
                    You're on the list!
                  </h3>
                  <p style={{ color: '#041e42' }}>
                    Our team has received your information and will be in touch.
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <Input 
                      placeholder="First Name" 
                      className="rounded-full p-6 border border-gray-200 bg-gray-50"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    <Input 
                      placeholder="Last Name" 
                      className="rounded-full p-6 border border-gray-200 bg-gray-50"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                  <Input 
                    type="email"
                    placeholder="Email Address" 
                    className="rounded-full p-6 border border-gray-200 bg-gray-50"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input 
                    placeholder="Company Name" 
                    className="rounded-full p-6 border border-gray-200 bg-gray-50"
                    value={formData.practiceName}
                    onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                  />
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full rounded-full py-4 uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ 
                      backgroundColor: '#041e42',
                      color: 'white',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: '700',
                      letterSpacing: '1px'
                    }}
                  >
                    {formStatus === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                  <p className="text-xs text-center" style={{ color: '#4a5568' }}>
                    By submitting this form, you agree to receive updates and communications from ClaimGrade regarding early access and our official launch.
                  </p>
                  {formStatus === 'error' && (
                    <p className="text-center text-red-600 text-sm">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#041e42' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2026 ClaimGrade. Grade it like you mean it.
          </p>
        </div>
      </footer>

      {/* Hero entrance animations */}
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-line-1 {
          animation: fadeSlideUp 0.8s ease-out both;
          animation-delay: 0.1s;
        }

        .hero-line-2 {
          animation: fadeSlideUp 0.8s ease-out both;
          animation-delay: 0.3s;
        }

        .hero-subtext {
          animation: fadeSlideUp 0.8s ease-out both;
          animation-delay: 0.55s;
        }

        .hero-ctas {
          animation: fadeSlideUp 0.8s ease-out both;
          animation-delay: 0.75s;
        }
      `}</style>
    </div>
  );
}