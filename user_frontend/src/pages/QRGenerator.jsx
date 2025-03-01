import { useState } from "react";
import QRCode from "qrcode.react";

export default function QRGenerator() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter text"
        className="p-2 border rounded mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="bg-white p-4 shadow-md">
        {text && <QRCode value={text} />}
      </div>
    </div>
  );
}
