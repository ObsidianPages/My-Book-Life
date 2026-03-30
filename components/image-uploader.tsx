'use client';

import { useState } from 'react';
import { uploadImage } from '@/app/actions/uploadImage';

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const result = await uploadImage(file);
    setLoading(false);

    if (result.url) {
      onUpload(result.url);
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {loading && <p className="text-sm text-stone-500">Uploading...</p>}
    </div>
  );
}
