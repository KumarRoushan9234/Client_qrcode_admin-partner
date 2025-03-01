import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRScanner() {
  const [scanResult, setScanResult] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR Code Scanner</h2>
      <div className="w-72 h-72 bg-white p-4 shadow-md">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) setScanResult(result.text);
          }}
        />
      </div>
      {scanResult && <p className="mt-4">Scanned: {scanResult}</p>}
    </div>
  );
}
