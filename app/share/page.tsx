import { Suspense } from 'react';
import SharePageContent from './SharePageContent';

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-[#FFD700] flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    }>
      <SharePageContent />
    </Suspense>
  );
}
