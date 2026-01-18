import { useState } from 'react';
import { Input } from '@/app/components/ui/input';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Set your password here - change this to whatever you want
  const CORRECT_PASSWORD = 'ClaimGrade2026';

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
            Don't have access? <a href="#waitlist" className="underline">Request early access</a>
          </p>
        </div>
      </div>

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

