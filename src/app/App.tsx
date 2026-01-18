import { useState, useEffect } from 'react';
import { ClaimGradeHomepage } from '@/app/components/ClaimGradeHomepage';
import { PasswordProtection } from '@/app/components/PasswordProtection';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const authenticated = sessionStorage.getItem('claimgrade_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <ClaimGradeHomepage />;
}
