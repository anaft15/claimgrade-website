import { useState } from 'react';
import { Input } from '@/app/components/ui/input';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  
  // Waitlist form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    practiceName: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Set your password here - change this to whatever you want
  const CORRECT_PASSWORD = 'ClaimGrade2026';

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
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
        pageName: 'ClaimGrade Waitlist (Password Page)'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      // Store in sessionStorage so they stay logged in during session
      sessionStorage.setItem('claimgrade_authenticated', 'true');
      onAuthenticated();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0B4F8C' }}
    >
      <div className="max-w-md w-full mx-auto px-6">
        {/* Sheep Image */}
        <div className="text-center mb-8">
          <img 
            src="/media/sheep-success.png" 
            alt="ClaimGrade sheep" 
            className="h-72 w-auto mx-auto mb-6"
          />
        </div>

        {/* Card */}
        <div 
          className={`bg-white rounded-2xl p-8 shadow-2xl ${isShaking ? 'animate-shake' : ''}`}
        >
          <h1 
            className="text-4xl uppercase text-center mb-2"
            style={{ 
              fontFamily: 'Impact, sans-serif',
              fontWeight: '700',
              color: '#0B4F8C'
            }}
          >
            Coming Soon
          </h1>
          
          <p className="text-center mb-6" style={{ color: '#5A6F7F' }}>
            ClaimGrade is currently in private beta. Enter the access code to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter access code"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`rounded-full p-6 border-2 text-center ${
                  error ? 'border-red-500' : 'border-gray-200'
                }`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">
                  Incorrect access code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-4 uppercase transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: '#F8BBD0',
                color: '#0B4F8C',
                fontFamily: 'Impact, sans-serif',
                fontWeight: '700',
                letterSpacing: '1px'
              }}
            >
              Access Site
            </button>
          </form>

          <p className="text-xs text-center mt-6" style={{ color: '#5A6F7F' }}>
            Don't have access? <button onClick={() => setShowWaitlistModal(true)} className="underline">Request early access</button>
          </p>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowWaitlistModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="text-3xl uppercase"
                style={{ 
                  fontFamily: 'Impact, sans-serif',
                  fontWeight: '700',
                  color: '#0B4F8C'
                }}
              >
                Request Early Access
              </h2>
              <button 
                onClick={() => setShowWaitlistModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {formStatus === 'success' ? (
              <div className="text-center py-8">
                <img 
                  src="/media/sheep-success.png" 
                  alt="Success" 
                  className="h-32 w-auto mx-auto mb-4"
                />
                <h3 
                  className="text-xl uppercase mb-2"
                  style={{ 
                    fontFamily: 'Impact, sans-serif',
                    fontWeight: '700',
                    color: '#0B4F8C'
                  }}
                >
                  You're on the list!
                </h3>
                <p style={{ color: '#5A6F7F' }}>
                  Our team has received your information and will be in touch.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm mb-6" style={{ color: '#5A6F7F' }}>
                  Join our private beta and be among the first to experience ClaimGrade.
                </p>

                <form className="space-y-4" onSubmit={handleWaitlistSubmit}>
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
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}

