import { Suspense } from 'react';
import CertificatePageContent from './CertificatePageContent';

export default function CertificatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-[#FFD700] flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    }>
      <CertificatePageContent />
    </Suspense>
  );
}
