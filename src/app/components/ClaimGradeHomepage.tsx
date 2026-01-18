import { ArrowRight, Upload, CheckSquare, BarChart3 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import sheepDoctorImg from '@/assets/sheep-doctor.png';
import sheepStethoscopeImg from '@/assets/sheep-stethoscope.png';

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
    <div className="min-h-screen bg-[#FBF7F4]" style={{ fontFamily: 'Inter' }}>
      {/* Header */}
      <header 
        className="py-6 sticky top-0 z-50"
        style={{ backgroundColor: '#0B4F8C' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl text-white tracking-wide"
            style={{ 
              fontFamily: 'Impact, sans-serif',
              fontWeight: '400',
              letterSpacing: '1px'
            }}
          >
            ClaimGrade
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-6">
            <button
              className="uppercase text-white transition-opacity hover:opacity-80"
              style={{ 
                fontFamily: 'Impact, sans-serif',
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
                backgroundColor: '#F8BBD0',
                color: '#0B4F8C',
                fontFamily: 'Impact, sans-serif',
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
        style={{ backgroundColor: '#0B4F8C' }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          
          <h1 
            className="text-7xl uppercase mb-8 leading-none"
            style={{ 
              fontFamily: 'Impact, sans-serif',
              fontWeight: '900',
              letterSpacing: '-1px'
            }}
          >
            <div className="text-white">STOP LOSING</div>
            <div className="inline-block relative mt-2">
              <div 
                className="absolute inset-0 -inset-x-4 -inset-y-2"
                style={{ backgroundColor: '#F8BBD0', zIndex: -1 }}
              />
              <span style={{ color: '#8B1A47' }}>SLEEP OVER</span>
            </div>
            <br />
            <div className="inline-block relative mt-2">
              <div 
                className="absolute inset-0 -inset-x-4 -inset-y-2"
                style={{ backgroundColor: '#F8BBD0', zIndex: -1 }}
              />
              <span style={{ color: '#8B1A47' }}>REIMBURSEMENT</span>
            </div>
          </h1>

          <p className="text-white mx-auto mb-8 text-lg" style={{ maxWidth: '605px' }}>
            A tool purpose-built to help you review clinical documentation behind every reimbursement code – it's like having an expert looking over your shoulder.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full uppercase transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: '#F8BBD0',
                color: '#0B4F8C',
                fontFamily: 'Impact, sans-serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              See how it works
            </a>
            <a
              href="#waitlist"
              className="px-8 py-4 rounded-full uppercase bg-white transition-opacity hover:opacity-90"
              style={{ 
                color: '#0B4F8C',
                fontFamily: 'Impact, sans-serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              Sign up for waitlist
            </a>
          </div>
        </div>

        {/* Hand Illustrations */}
        <div className="absolute left-8 bottom-[20%] opacity-90">
          <img src={sheepStethoscopeImg} alt="Sheep with stethoscope character" className="w-32 h-auto translate-x-full scale-[1.36]" />
        </div>

        <div className="absolute right-8 top-24 opacity-90">
          <img src={sheepDoctorImg} alt="Doctor sheep character" className="w-32 h-auto -translate-x-full scale-[1.36]" />
        </div>
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
          {/* Headline with Sheep */}
          <div className="flex items-center justify-center gap-8 mb-16">
            <h2 
              className="text-7xl uppercase leading-none"
              style={{ 
                fontFamily: 'Impact, sans-serif',
                fontWeight: '900',
                letterSpacing: '-1px'
              }}
            >
              <div style={{ color: '#0B4F8C' }}>THREE SIMPLE</div>
              <div className="inline-block relative mt-2">
                <div 
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#F8BBD0', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#8B1A47' }}>STEPS TO SUCCESS</span>
              </div>
            </h2>
            <img 
              src="/media/sheep3.png" 
              alt="Sheep doctor holding number 3" 
              className="h-64 w-auto flex-shrink-0 scale-[1.2]"
            />
          </div>

          {/* Vertical Stack of Steps */}
          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid md:grid-cols-5 gap-12 items-center">
              {/* Left - Text (2 columns) */}
              <div className="md:col-span-2">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold mb-6"
                  style={{ backgroundColor: '#F8BBD0', color: '#8B1A47' }}
                >
                  01
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Impact, sans-serif',
                    fontWeight: '700',
                    color: '#0B4F8C',
                  }}
                >
                  UPLOAD DOCUMENT
                </h3>
                <p className="text-lg" style={{ color: '#5A6F7F' }}>
                  Drop your clinical notes PDF into ClaimGrade. Our system securely processes your documentation in seconds.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step1-upload.gif"
                  onError={(e) => { e.currentTarget.src = sheepDoctorImg; }}
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
                  style={{ backgroundColor: '#F8BBD0', color: '#8B1A47' }}
                >
                  02
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Impact, sans-serif',
                    fontWeight: '700',
                    color: '#0B4F8C',
                  }}
                >
                  SELECT CODES FOR ANALYSIS
                </h3>
                <p className="text-lg" style={{ color: '#5A6F7F' }}>
                  Choose the insurance codes you plan to use for billing. We'll analyze your documentation against each code's requirements.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step2-codes.gif"
                  onError={(e) => { e.currentTarget.src = sheepDoctorImg; }}
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
                  style={{ backgroundColor: '#F8BBD0', color: '#8B1A47' }}
                >
                  03
                </div>
                <h3
                  className="text-4xl uppercase mb-4"
                  style={{
                    fontFamily: 'Impact, sans-serif',
                    fontWeight: '700',
                    color: '#0B4F8C',
                  }}
                >
                  REVIEW RESULTS
                </h3>
                <p className="text-lg" style={{ color: '#5A6F7F' }}>
                  Get instant, detailed feedback showing what's documented correctly and what's missing. Know exactly how to fix it.
                </p>
              </div>
              
              {/* Right - GIF (3 columns) */}
              <div className="md:col-span-3 rounded-2xl overflow-hidden border-2 border-gray-200 bg-white shadow-lg">
                <img
                  src="/media/step3-results.gif"
                  onError={(e) => { e.currentTarget.src = sheepDoctorImg; }}
                  alt="Review your documentation grading results"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Breakdown Section */}
      <section className="py-20" style={{ backgroundColor: '#0B4F8C' }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Title with Sheep */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <h2 
              className="text-7xl uppercase leading-none"
              style={{ 
                fontFamily: 'Impact, sans-serif',
                fontWeight: '900',
                letterSpacing: '-1px'
              }}
            >
              <div className="text-white">CRYSTAL CLEAR</div>
              <div className="inline-block relative mt-2">
                <div 
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#F8BBD0', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#8B1A47' }}>ANALYSIS &</span>
              </div>
              <br />
              <div className="inline-block relative mt-2">
                <div 
                  className="absolute inset-0 -inset-x-4 -inset-y-2"
                  style={{ backgroundColor: '#F8BBD0', zIndex: 0 }}
                />
                <span className="relative z-10" style={{ color: '#8B1A47' }}>FEEDBACK</span>
              </div>
            </h2>
            <img 
              src="/media/sheep4.png" 
              alt="Sheep presenting analysis" 
              className="h-64 w-auto flex-shrink-0 scale-[1.38]"
            />
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
      <section id="waitlist" className="py-20" style={{ backgroundColor: '#F8BBD0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Header & Copy */}
            <div className="text-center">
              <h2 
                className="text-7xl uppercase leading-none mb-6"
                style={{ 
                  fontFamily: 'Impact, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-1px'
                }}
              >
                <div style={{ color: '#0B4F8C' }}>JOIN THE</div>
                <div className="inline-block relative mt-2">
                  <div 
                    className="absolute inset-0 -inset-x-4 -inset-y-2"
                    style={{ backgroundColor: '#0B4F8C', zIndex: 0 }}
                  />
                  <span className="relative z-10 text-white">WAITLIST</span>
                </div>
              </h2>
              
              <p className="text-lg leading-relaxed" style={{ color: '#0B4F8C' }}>
                ClaimGrade is currently in beta, and we're selectively partnering with a limited number of facilities across the country to fine-tune our analysis and ensure maximum accuracy. Request early access to be among the first to experience documentation review that actually works.
              </p>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              {formStatus === 'success' ? (
                <div className="p-8 text-center">
                  <img 
                    src="/media/sheep-success.png" 
                    alt="Success sheep" 
                    className="h-48 w-auto mx-auto mb-6"
                  />
                  <h3 
                    className="text-2xl uppercase mb-2"
                    style={{ 
                      fontFamily: 'Impact, sans-serif',
                      fontWeight: '700',
                      color: '#0B4F8C'
                    }}
                  >
                    You're on the list!
                  </h3>
                  <p style={{ color: '#0B4F8C' }}>
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
                      backgroundColor: '#0B4F8C',
                      color: 'white',
                      fontFamily: 'Impact, sans-serif',
                      fontWeight: '700',
                      letterSpacing: '1px'
                    }}
                  >
                    {formStatus === 'submitting' ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                  <p className="text-xs text-center" style={{ color: '#5A6F7F' }}>
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
      <footer className="py-12" style={{ backgroundColor: '#0B4F8C' }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            © 2026 ClaimGrade. Grade it like you mean it.
          </p>
        </div>
      </footer>
    </div>
  );
}