'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { StarIcon } from '@heroicons/react/24/outline';

export default function ScanPage() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      // Assuming QR code contains the oeuvre ID like "1", "2", etc.
      if (decodedText && /^[1-3]$/.test(decodedText)) {
        // Trigger haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(200);
        }

        router.push(`/oeuvre/${decodedText}`);
      }
    };

    const onScanFailure = (error: string) => {
      console.log(`QR Scan failure: ${error}`);
    };

    scannerRef.current = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-[#FFD700] flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-center">
        Scanner le QR Code
      </h1>
      <p className="text-[#FFD700]/80 text-center mb-8">
        Pointe ta caméra vers un QR code pour découvrir une oeuvre
      </p>

      <div id="qr-reader" className="max-w-md w-full"></div>

      <div className="mt-8 flex items-center space-x-2">
        <StarIcon className="w-6 h-6 text-[#FFD700]" />
        <p className="text-[#FFD700]">Scanne et découvre l'Histoire</p>
      </div>
    </div>
  );
}
